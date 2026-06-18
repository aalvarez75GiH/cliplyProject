/* eslint-disable */

const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require("openai");

// ffmpeg.setFfmpegPath(ffmpegPath);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
      temperature: 0.2,
    });

    const content = chatResponse.choices[0].message.content;

    console.log("GPT RAW RESPONSE:", content);

    const finalResult = JSON.parse(content);
    return finalResult;
  } catch (err) {
    console.error("translation_and_summary_of_audio_handler error:", err);
    throw err;
  }
};

module.exports = {
  translation_and_summary_of_audio_handler,
};
