import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import { OPENAI_API_KEY } from "@env";

import { Audio } from "expo-av";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import * as FileSystem from "expo-file-system";
import FormData from "form-data";
// import RNFS from "react-native-fs";
// import { FFmpegKit } from "ffmpeg-kit-react-native";

import { Spacer } from "../../../components/global_components/optimized.spacer.component";
import { Recent_clips_Tile } from "../../../components/tiles/recent_clips.tile";
import { post_a_message_Request } from "../voice_recents/voice_recent.requests";
import { deleteRecentTextClipRequest } from "../voice_recents/voice_recent.requests";
import { posting_new_text_clip_request } from "./voice_recent.requests";

import { GlobalContext } from "../global/global.context";
import { TextClipsContext } from "../home/text_clips.context";

export const VoiceRecentClipsContext = createContext();

export const VoiceRecentClipsContextProvider = ({ children }) => {
  const { operation } = useContext(TextClipsContext);
  const {
    globalLanguage,
    userToDB,
    gettingUserDataOnDifferentOperations,
    setDeletedStatus,
  } = useContext(GlobalContext);
  const { user_id } = userToDB || {}; // Ensure userToDB is not undefined or null
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [response, setResponse] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [recording, setRecording] = useState(null);
  const [textClip_data_to_upload, setTextClip_data_to_upload] = useState({
    user_id: "",
    operation_name: operation,
    status_name: "",
    new_message: {},
  });

  useEffect(() => {
    if (user_id) {
      setTextClip_data_to_upload((prevState) => ({
        ...prevState,
        user_id: user_id,
      }));
    }

    return () => {
      setDeletedStatus(false);
    };
  }, [user_id]);

  const text_clip_data_initialState = {
    user_id: user_id,
    operation_name: "food_delivery",
    status_name: "",
    new_message: {},
  };

  // console.log(
  //   "TEXT CLIP DATA TO UPLOAD INITIAL STATE AT CONTEXT:",
  //   textClip_data_to_upload
  // );
  const resetState = () => {
    setTextClip_data_to_upload(text_clip_data_initialState);
  };

  const recordingRef = useRef(null);

  const startRecording = async () => {
    try {
      setRecordingStatus("listening");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording:", err);
      setRecordingStatus("idle");
    }
  };

  const transcribeDirectToOpenAI = async (fileUri, mime, OPENAI_API_KEY) => {
    console.log("OPENAI KEY EXISTS:", !!OPENAI_API_KEY);
    console.log("OPENAI KEY START:", OPENAI_API_KEY?.slice(0, 7));
    console.log("OPENAI KEY END:", OPENAI_API_KEY?.slice(-4));

    const form = new FormData();
    form.append("file", {
      uri: fileUri,
      name: mime === "audio/mpeg" ? "audio.mp3" : "audio.m4a",
      type: mime,
    });
    form.append("model", "whisper-1");
    form.append("response_format", "json");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    console.log("OPENAI KEY EXISTS:", !!OPENAI_API_KEY);
    console.log("OPENAI KEY START:", OPENAI_API_KEY?.slice(0, 7));

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        form,
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            // No need for form.getHeaders() in Expo
          },
          signal: controller.signal, // Axios supports AbortController
        }
      );
      console.log(
        "RESPONSE FROM OPENAI TRANSCRIPTION:",
        JSON.stringify(res.data, null, 2)
      );
      // Access the transcription text directly from res.data
      const transcriptionText = res.data.text;

      return transcriptionText;
    } finally {
      clearTimeout(timeout);
    }
  };

  const translateAndSummarizeWithGPT = async (
    transcriptionText,
    OPENAI_API_KEY
  ) => {
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
    // const handleChatCompletion = async () => {

    try {
      const chatResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Log the full response for debugging
      console.log("Full Response:", JSON.stringify(chatResponse.data, null, 2));

      // Extract and log the message content
      if (
        chatResponse.data.choices &&
        chatResponse.data.choices[0] &&
        chatResponse.data.choices[0].message &&
        chatResponse.data.choices[0].message.content
      ) {
        const assistantMessage = chatResponse.data.choices[0].message.content;
        console.log("Assistant Message:", assistantMessage);

        const finalResult = JSON.parse(assistantMessage);

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
        console.log(
          "FINAL RESULT:",
          JSON.stringify(recent_message_to_add, null, 2)
        );
        return recent_message_to_add;
      } else {
        console.error("Malformed response or missing content.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      return null;
    }
  };

  const startTranscription = async () => {
    try {
      setRecordingStatus("transcribing");
      //   setRecordingStatus("idle");

      await recordingRef.current.stopAndUnloadAsync();
      const fileUri = recordingRef.current.getURI();

      //Optional: display file URI for debugging
      console.log("Recording URI:", fileUri);

      // Determine MIME type based on file extension
      const fileExtension = fileUri.split(".").pop(); // Get the file extension
      const mime = fileExtension === "mp3" ? "audio/mpeg" : "audio/mp4";
      // Send to your Firebase function

      // const audioBase64 = await FileSystem.readAsStringAsync(fileUri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      // const audioBuffer = Buffer.from(audioBase64, "base64");

      // ****************** REQUEST TO DIRECTLY TO OPEN AI API ******************
      console.log("USER ID BEFORE  TRANSCRIPTION REQUEST:", user_id);
      const transcribedTextByOpenAI = await transcribeDirectToOpenAI(
        fileUri,
        mime,
        OPENAI_API_KEY
      );
      console.log("TRANSCRIBED TEXT BY OPEN AI:", transcribedTextByOpenAI);
      const response_from_chatGPT = await translateAndSummarizeWithGPT(
        transcribedTextByOpenAI,
        OPENAI_API_KEY
      );
      console.log(
        " RESPONSE FROM CHAT GPT:",
        JSON.stringify(response_from_chatGPT, null, 2)
      );
      if (response_from_chatGPT) {
        setResponse(response_from_chatGPT);
        setRecordingStatus("idle");
        // loadUserData(user_id);
        const response = await post_a_message_Request(
          user_id,
          response_from_chatGPT
        );
        gettingUserDataOnDifferentOperations(user_id);
      }
    } catch (err) {
      console.log("OPENAI ERROR STATUS:", err.response?.status);
      console.log(
        "OPENAI ERROR DATA:",
        JSON.stringify(err.response?.data, null, 2)
      );
      console.error("Transcription failed:", err.message);
      setRecordingStatus("idle");
      console.error("Transcription failed:", err.message);
      setRecordingStatus("idle");
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        setRecordingStatus("idle");
      }
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${month}/${day}/${year}`;
  };

  const renderRecentClipsTile = ({ item }) => {
    const { createdAt } = item;
    const date_formatted = formattedDate(createdAt);
    return (
      <Spacer position="bottom" size="medium">
        <Recent_clips_Tile
          item={item}
          globalLanguage={globalLanguage}
          date_formatted={date_formatted}
        />
      </Spacer>
    );
  };

  const posting_new_text_clip_to_upload = async (new_text_clip) => {
    console.log("NEW TEXT CLIP TO UPLOAD AT CONTEXT:", new_text_clip);
    setIsLoading(true);
    try {
      const response = await posting_new_text_clip_request(new_text_clip);
      console.log("RESPONSE AT POSTING NEW TEXT CLIP TO UPLOAD:", response);

      if (response.status === 404) {
        //loadUserData(user_id);
        gettingUserDataOnDifferentOperations(user_id);
        console.log("No matching record found to delete.");
      }
      if (response.status === 500) {
        console.log("An error occurred while deleting the recent message.");
      }
      if (response.status === 201) {
        console.log("Text Clip added successfully.");
        //loadUserData(user_id);
        gettingUserDataOnDifferentOperations(user_id);
        return response.status;
      }
    } catch (error) {
      console.error("Error posting new text clip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VoiceRecentClipsContext.Provider
      value={{
        globalLanguage,
        isLoading,
        setIsLoading,
        renderRecentClipsTile,
        response,
        startRecording,
        recordingStatus,
        setRecordingStatus,
        recordingRef,
        startTranscription,
        setResponse,
        stopRecording,
        // delete_one_recent_clip,
        // deletedStatus,
        // setDeletedStatus,
        setTextClip_data_to_upload,
        textClip_data_to_upload,
        resetState,
        posting_new_text_clip_to_upload,
      }}
    >
      {children}
    </VoiceRecentClipsContext.Provider>
  );
};
