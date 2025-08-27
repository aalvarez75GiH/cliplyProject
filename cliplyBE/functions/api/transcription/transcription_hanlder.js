/* eslint-disable */

const fs = require("fs");
const path = require("path");
const os = require("os");
const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios");
const FormData = require("form-data");

async function transcribeAudio(file, contentType) {
  if (!file || !["audio/m4a", "audio/mpeg"].includes(contentType)) {
    throw new Error("Audio file (MP4 or MP3) is required");
  }

  const inputExtension = contentType.includes("mpeg") ? "mp3" : "m4a";
  const inputFilePath = path.join(os.tmpdir(), `input-audio.${inputExtension}`);
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

  // Transcribe with Whisper
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

  return whisperResponse.data.text;
}

module.exports = { transcribeAudio };
