/* eslint-disable */
const express = require("express");
const app = express();
const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require("uuid");
const { user } = require("firebase-functions/v1/auth");
const { getUserDataByUserID } = require("../../api/users/users.controllers");

ffmpeg.setFfmpegPath(ffmpegPath);

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);
app.use(express.raw({ type: ["audio/mp4", "audio/mpeg"], limit: "10mb" }));

const transcription_of_audio_handler = async (req) => {
  try {
    const file = req.rawBody;
    const contentType = req.get("content-type").toLowerCase().trim() || "";

    if (!file || !["audio/m4a", "audio/mpeg"].includes(contentType)) {
      return res.status(400).send("Audio file (MP4 or MP3) is required");
    }

    const inputExtension = contentType.includes("mpeg") ? "mp3" : "m4a";
    const inputFilePath = path.join(
      os.tmpdir(),
      `input-audio.${inputExtension}`
    );
    const m4aFilePath = path.join(os.tmpdir(), "converted-audio.m4a");

    // Write incoming audio to input file
    fs.writeFileSync(inputFilePath, file);

    // Convert if input is MP3
    if (inputExtension === "mp3") {
      await new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
          .audioCodec("aac") // Explicitly specify the AAC codec
          .toFormat("ipod") // Use 'ipod' format for M4A compatibility
          .on("end", resolve)
          .on("error", reject)
          .save(m4aFilePath);
      });
    }

    const audioPathForWhisper =
      inputExtension === "mp3" ? m4aFilePath : inputFilePath;

    // 1. Transcribe with Whisper
    const form = new FormData();
    form.append("file", fs.createReadStream(audioPathForWhisper));
    form.append("model", "whisper-1");
    form.append("response_format", "json");

    const whisperResponse = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders(),
        },
      }
    );
    const transcriptionTextToSend = whisperResponse.data.text;
    return transcriptionTextToSend;
  } catch (error) {
    console.error("Error in transcriptionOfAudioHandler:", error);
    return res.status(500).send("Failed to do voice transcription  response");
  }
};

const translation_and_summary_of_audio_handler = async (transcriptionText) => {
  const prompt = `
Transcription: ${transcriptionText}

Provide:
1. Transcription in Spanish
2. Transcription in English
3. A summary (<35 characters) in Spanish
4. A summary (<35 characters) in English
5. Detected language of the transcriptionText

Return JSON like:
{
  "transcription_es": "...",
  "transcription_en": "...",
  "summary_es": "...",
  "summary_en": "...",
  "language_detected": "ES" // or "EN"
}
`;

  const chatResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a translator and summarizer assistant.",
      },
      { role: "user", content: prompt },
    ],
  });

  let finalResult;
  try {
    finalResult = JSON.parse(chatResponse.data.choices[0].message.content);
    return finalResult;
  } catch (err) {
    console.error("Parsing GPT response failed:", err);
    return res.status(500).send("Failed to parse GPT response");
  }
};

const gettingUserData = async (user_id) => {
  console.log("USER ID AT HANDLER:", user_id);
  const userData = await getUserDataByUserID(user_id);
  return userData;
};

module.exports = {
  transcription_of_audio_handler,
  translation_and_summary_of_audio_handler,
  gettingUserData,
};
