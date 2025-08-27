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
const {
  getUserDataByUserID,
} = require("../../api/users_data/users_data.controllers");

ffmpeg.setFfmpegPath(ffmpegPath);

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);
app.use(express.raw({ type: ["audio/mp4", "audio/mpeg"], limit: "10mb" }));

const transcription_of_audio_handler = async (file) => {
  try {
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

  Pre-task: You are receiving a transcription text from an audio file.
Your task is to:

1. Translate it into Spanish and English.

2. Summarize it in both languages (max 35 characters).

3. Detect the language of the original transcription.

4. Evaluate whether it is “specific” according to the checklist below.

 Checklist for “specific” evaluation (Rule #3):


- Mentions a specific person, name, family, friend, or loved one?
- Mentions a company, brand, service, product, or place?
- Mentions a specific event, meeting, time, or schedule?
- Is it a friendly/personal conversation with an emotional/affectionate tone?
(Words like: “love you”, “miss you”, “can’t wait to see you”, “so proud of you”,
“congratulations”, “happy birthday”, “happy anniversary”, “Dude”, “my friend”, etc.)

Instructions for the “specific” key:

- First, evaluate the transcription against each checklist item.
- If any item is YES, then "specific": "specific".
- If all items are NO, then "specific": "".
- You must never omit the specific key.

Rules:
1. Ignore filler words like “uh”, “ah”, “like”, “you know”, etc.
2. Use casual grammar but keep a respectful tone.

Output JSON format:

{
  "transcription_es": "...",
  "transcription_en": "...",
  "summary_es": "...",
  "summary_en": "...",
  "language_detected": "ES" or "EN",
  "specific": "specific" or ""
}
  Example:

Input: "Hi this is your driver, I will drop you off at Wells Fargo at 2 p.m."

Output:

{
  "transcription_es": "Hola, soy tu conductor, te dejaré en Wells Fargo a las 2 p.m.",
  "transcription_en": "Hi, this is your driver, I will drop you off at Wells Fargo at 2 p.m.",
  "summary_es": "Entrega en Wells Fargo",
  "summary_en": "Drop-off at Wells Fargo",
  "language_detected": "EN",
  "specific": "specific"
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
