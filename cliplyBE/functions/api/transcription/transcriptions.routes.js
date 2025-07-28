/* eslint-disable */
const app = require("express")();

const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
require("dotenv").config({ path: "../../../functions/.env" });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/postTranscription", async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method not allowed");
    }

    const file = req.rawBody;
    const contentType = req.get("content-type");

    if (!file || !contentType.includes("audio/")) {
      return res.status(400).send("Audio file required");
    }

    // Save file to temp path
    const tempFilePath = path.join(os.tmpdir(), "temp-audio.mp3");
    fs.writeFileSync(tempFilePath, file);

    // 1. Transcribe with Whisper
    const form = new FormData();
    form.append("file", fs.createReadStream(tempFilePath));
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

    const transcriptionText = whisperResponse.data.text;

    // 2. Translate and summarize with Chat API
    const prompt = `
    Transcription: ${transcriptionText}
    
    Provide:
    1. Transcription in Spanish
    2. Transcription in English
    3. A summary (<35 characters) in Spanish
    4. A summary (<35 characters) in English
    
    Return JSON like:
    {
      "transcription_es": "...",
      "transcription_en": "...",
      "summary_es": "...",
      "summary_en": "..."
    }
    `;

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a translator and summarizer assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const jsonOutput = chatResponse.data.choices[0].message.content;

    // Try to parse JSON result
    let finalResult;
    try {
      finalResult = JSON.parse(jsonOutput);
    } catch (err) {
      return res.status(500).send("Failed to parse GPT response");
    }

    return res.status(200).json({
      transcription: finalResult,
      original_text: transcriptionText,
    });
  } catch (error) {
    console.error("Error:", error);
    // const errorMessage =
    //   error.response?.data?.message || "Internal server error";
    return res.status(500).send(error.message || "Internal server error");
  }

  // const transaction = receivingAndPreparingTransactionInfoFromRequest(req);
  // console.log("TRANSACTION CREATED WITH TIME STAMP:", transaction);

  // try {
  //   const transaction_created = await transactionsController.createTransaction(
  //     transaction
  //   );
  //   await updatingMostRecentTransactionToFalse(transaction_created);
  //   console.log(
  //     " TRANSACTION COMING FROM CONTROLLER AT PTWCDV:",
  //     transaction_created
  //   );
  //   res.status(201).json(transaction_created);
  // } catch (error) {
  //   res.status(500).json({
  //     status: "Failed",
  //     msg: error.message,
  //   });
  // }
});

module.exports = app;
