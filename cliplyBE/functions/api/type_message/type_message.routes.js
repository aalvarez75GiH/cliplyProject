/* eslint-disable */

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

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

    // return res.status(200).json({
    //   original_text: textToOperate,
    //   translation: {
    //     en: finalResult.translation_en,
    //     es: finalResult.translation_es,
    //   },
    //   summary: {
    //     en: finalResult.summary_en,
    //     es: finalResult.summary_es,
    //   },
    // });
    // return res.status(200).json({
    //   original_message: textToOperate,
    //   message_en: finalResult.translation_en,
    //   message_es: finalResult.translation_es,
    //   summary_en: finalResult.summary_en,
    //   summary_es: finalResult.summary_es,
    //   language_detected: finalResult.language_detected || "unknown",
    // });

    return res.status(200).json({
      original_message: textToOperate,
      message_en: finalResult.translation_en,
      message_es: finalResult.translation_es,
      summary_en: finalResult.summary_en,
      summary_es: finalResult.summary_es,
      language_detected: finalResult.language_detected || "unknown",
      used: 0,
      message_id: uuidv4(),
      type: "created_by_user",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send(error.message || "Internal server error");
  }
});

module.exports = app;
