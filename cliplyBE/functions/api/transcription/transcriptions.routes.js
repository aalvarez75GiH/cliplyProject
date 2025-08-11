/* eslint-disable */

const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const {
  transcription_of_audio_handler,
  translation_and_summary_of_audio_handler,
  gettingUserData,
} = require("./transcriptions.handlers");
const usersControllers = require("../users/users.controllers");
const { user } = require("firebase-functions/v1/auth");

app.post("/postTranscription_to_whisper", async (req, res) => {
  const user_id = req.query.user_id;
  // console.log("USER ID AT WHISPER END POINT:", user_id);
  try {
    // 1. Transcribe audio from audio file
    const transcriptionText = await transcription_of_audio_handler(req);

    // 2. Translate & summarize with GPT
    const finalResult = await translation_and_summary_of_audio_handler(
      transcriptionText
    );

    // 3. Save the message and its translations/summaries to the user's recent messages collection
    const userData = await gettingUserData(user_id);
    console.log(
      "USER DATA AT WHISPER END POINT:",
      JSON.stringify(userData, null, 2)
    );
    const recent_message_to_add = {
      original_message: transcriptionText,
      message_en: finalResult.transcription_en,
      message_es: finalResult.transcription_es,
      summary_en: finalResult.summary_en,
      summary_es: finalResult.summary_es,
      language_detected: finalResult.language_detected || "unknown",
      used: 0,
      message_id: uuidv4(),
    };

    console.log(
      "RECENT MESSAGE TO ADD:",
      JSON.stringify(recent_message_to_add, null, 2)
    );

    const updated_recent_messages_array = [
      recent_message_to_add,
      ...userData[0].recent_messages,
    ];

    console.log(
      "UPDATED RECENT MESSAGES ARRAY:",
      JSON.stringify(updated_recent_messages_array, null, 2)
    );

    // Prepare the update object
    const updateData = {
      recent_messages: updated_recent_messages_array,
    };
    const response = await usersControllers.updateUserData(user_id, updateData);
    console.log("RESPONSE:", JSON.stringify(response, null, 2));
    // ******************* HERE WE WORK WITH STORING MESSAGE IN THE USER RECENT MESSAGES COLELCTION

    // 4. Return the result in JSON format with the following keys:
    return res.status(200).json({
      original_message: transcriptionText,
      message_en: finalResult.transcription_en,
      message_es: finalResult.transcription_es,
      summary_en: finalResult.summary_en,
      summary_es: finalResult.summary_es,
      language_detected: finalResult.language_detected || "unknown",
      used: 0,
      message_id: uuidv4(),
      type: "whisper",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message || "Internal server error");
  }
});

app.post("/postTypeMessage", async (req, res) => {
  const textToOperate = req.query.text_to_operate;
  try {
    const prompt = `
Text received from user: ${textToOperate}
 instructions: You are receiving a text from user.
 What you have to do is:
1. Detect language of the text received
2. Translate to Spanish if text is in english or to English if text is in Spanish
3. Summarize the text (<35 characters) in both languages
4. Return the result in JSON format with the following keys:
5. Detected language of the textToOperate

Return JSON like:
{
  "translation_es": "...",
  "translation_en": "...",
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

    console.log(
      "Chat response:",
      JSON.stringify(chatResponse.data.choices[0].message.content, null, 2)
    );

    let finalResult;
    try {
      finalResult = JSON.parse(chatResponse.data.choices[0].message.content);
    } catch (err) {
      console.error("Parsing GPT response failed:", err);
      return res.status(500).send("Failed to parse GPT response");
    }
    console.log("Final result response:", JSON.stringify(finalResult, null, 2));

    return res.status(200).json({
      original_message: textToOperate,
      message_en: finalResult.translation_en,
      message_es: finalResult.translation_es,
      summary_en: finalResult.summary_en,
      summary_es: finalResult.summary_es,
      language_detected: finalResult.language_detected || "unknown",
      used: 0,
      message_id: uuidv4(),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message || "Internal server error");
  }
});

module.exports = app;
