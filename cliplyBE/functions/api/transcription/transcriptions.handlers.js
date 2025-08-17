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

  Pre-task: You are receiving a transcription text that is coming from an audio file.  
Your task is to translate it into Spanish and English, summarize it in both languages, and detect the language of the original transcription.

Rules to follow:
1. Remember that a lot of non-American users have English as a second language, so sometimes the transcriptions may have grammar mistakes or unusual phrasings, but the meaning is still understandable. Take that into account when translating and summarizing. Use casual grammar but keep a respectful tone.

2. Eliminate all the uhms, ahhs, you knows, likes, yeahs, and other filler words.

3. Detect when the transcriptionText is **specific** to certain situations.  
   You must set the "specific" key to "specific" if the text includes **ANY** of the following:
   - Mentions of specific people, names, family, friends, or loved ones  
   - Mentions of departments in a company, specific events, or specific locations  
   - Friendly or personal conversations  
   - Mentions of specific products, brands, services, companies, or places  
   If NONE of the above apply, set "specific" to "".  
   You must always return the "specific" key with either "specific" or "".

Examples for rule 3:
- Input: "Hi baby, I am going to Kroger to buy some groceries."  
  → "specific": "specific" (because it mentions a loved one and a brand/place)  

- Input: "The meeting starts at 9am."  
  → "specific": "specific" (because it mentions a specific event/time)  

- Input: "I like eating fruit."  
  → "specific": "" (general, no brand, no personal/family/friend, no event)

This is what you are going to provide:
1. Transcription in Spanish  
2. Transcription in English  
3. A summary (<35 characters) in Spanish  
4. A summary (<35 characters) in English  
5. Detected language of the transcriptionText  
6. The "specific" key as explained above  

Return JSON like:
{
  "transcription_es": "...",
  "transcription_en": "...",
  "summary_es": "...",
  "summary_en": "...",
  "language_detected": "ES" or "EN",
  "specific": "specific" or ""
}

  `;
  //   const prompt = `
  // Transcription: ${transcriptionText}

  // Provide:
  // 1. Transcription in Spanish
  // 2. Transcription in English
  // 3. A summary (<35 characters) in Spanish
  // 4. A summary (<35 characters) in English
  // 5. Detected language of the transcriptionText

  // Return JSON like:
  // {
  //   "transcription_es": "...",
  //   "transcription_en": "...",
  //   "summary_es": "...",
  //   "summary_en": "...",
  //   "language_detected": "ES" // or "EN"
  // }
  // `;

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
