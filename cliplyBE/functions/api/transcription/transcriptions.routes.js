/* eslint-disable */

const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const {
  translation_and_summary_of_audio_handler,
} = require("./translation_and_prompt.handlers");
const { transcribeAudio } = require("./transcription_hanlder");
const { getUserDataByUserID } = require("../users_data/users_data.controllers");
const users_dataControllers = require("../users_data/users_data.controllers");

ffmpeg.setFfmpegPath(ffmpegPath);

app.use(express.raw({ type: ["audio/mp4", "audio/mpeg"], limit: "10mb" }));

app.post("/postTranscription_to_whisper", async (req, res) => {
  const user_id = req.query.user_id;
  const file = req.rawBody;
  try {
    // 1. Transcribe audio from audio file
    // const transcriptionText = await transcription_of_audio_handler(file);

    const contentType = req.get("content-type").toLowerCase().trim() || "";

    const transcriptionText = await transcribeAudio(file, contentType);

    // 2. Translate & summarize with GPT
    const finalResult = await translation_and_summary_of_audio_handler(
      transcriptionText
    );
    console.log(
      "FINAL RESULT FROM HANDLER:",
      JSON.stringify(finalResult, null, 2)
    );
    const recent_message_to_add = {
      original_message: transcriptionText,
      body: {
        en: finalResult.transcription_en,
        es: finalResult.transcription_es,
      },
      summary: {
        en: finalResult.summary_en,
        es: finalResult.summary_es,
      },
      language_detected: finalResult.language_detected || "unknown",
      specific: finalResult.specific,
      usedCount: 0,
      message_id: uuidv4(),
      created_by: "user",
      createdAt: new Date().toISOString(),
    };

    // 3. Save the message and its translations/summaries to the user's recent messages collection
    const userData = await getUserDataByUserID(user_id);

    const updated_recent_messages_array = [
      recent_message_to_add,
      ...userData.recent_messages,
    ];

    // Prepare the update object
    const updateData = {
      recent_messages: updated_recent_messages_array,
    };
    await users_dataControllers.updateUserData(user_id, updateData);
    // console.log("RESPONSE:", JSON.stringify(response, null, 2));
    // ******************* HERE WE WORK WITH STORING MESSAGE IN THE USER RECENT MESSAGES COLELCTION

    // 4. Return the result in JSON format with the following keys:
    return res.status(200).json(recent_message_to_add);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message || "Internal server error");
  }
});

module.exports = app;
