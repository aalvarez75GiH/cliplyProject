/* eslint-disable */

require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const os = require("os");

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

app.post("/postTranscription", async (req, res) => {
  const user_id = req.query.user_id;
  const recent_message_to_add = req.body.new_message;
  console.log("NEW MESSAGE TO ADD:", recent_message_to_add);
  try {
    //1. Save the message and its translations/summaries to the user's recent messages collection
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
