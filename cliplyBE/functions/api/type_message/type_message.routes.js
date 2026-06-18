/* eslint-disable */

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const { getUserDataByUserID } = require("../users_data/users_data.controllers");
const users_dataControllers = require("../users_data/users_data.controllers");

app.post("/postTypeMessage", async (req, res) => {
  const textToOperate = req.query.text_to_operate;
  const user_id = req.query.user_id;
  try {
    const prompt = `
Text received from user: ${textToOperate}
 instructions: You are receiving a text from user.
 What you have to do with that text: ${textToOperate} is:
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

    const chatResponse = await openai.chat.completions.create({
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
      JSON.stringify(chatResponse.choices[0].message.content, null, 2)
    );

    let finalResult;
    try {
      finalResult = JSON.parse(chatResponse.choices[0].message.content);
      // **************************************************************************
      // 3. Save the message and its translations/summaries to the user's recent messages collection
      const userData = await getUserDataByUserID(user_id);

      const recent_message_to_add = {
        original_message: textToOperate,
        body: {
          en: finalResult.translation_en,
          es: finalResult.translation_es,
        },
        summary: {
          en: finalResult.summary_en,
          es: finalResult.summary_es,
        },
        language_detected: finalResult.language_detected || "unknown",
        specific: "",
        usedCount: 0,
        message_id: uuidv4(),
        created_by: "user",
        createdAt: new Date().toISOString(),
      };

      console.log(
        "RECENT MESSAGE TO ADD:",
        JSON.stringify(recent_message_to_add, null, 2)
      );

      const updated_recent_messages_array = [
        recent_message_to_add,
        ...userData.recent_messages,
      ];

      // Prepare the update object
      const updateData = {
        recent_messages: updated_recent_messages_array,
      };
      await users_dataControllers.updateUserData(user_id, updateData);
      // ************************************************************************
    } catch (err) {
      console.error("Parsing GPT response failed:", err);
      return res.status(500).send("Failed to parse GPT response");
    }
    console.log("Final result response:", JSON.stringify(finalResult, null, 2));

    return res.status(200).json({
      original_message: textToOperate,
      body: {
        en: finalResult.translation_en,
        es: finalResult.translation_es,
      },
      summary: {
        en: finalResult.summary_en,
        es: finalResult.summary_es,
      },
      language_detected: finalResult.language_detected || "unknown",
      specific: "",
      usedCount: 0,
      message_id: uuidv4(),
      created_by: "user",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message || "Internal server error");
  }
});

module.exports = app;
