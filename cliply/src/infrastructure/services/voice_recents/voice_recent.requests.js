import axios from "axios";
import { environment } from "../../../util/env";

export const post_a_voice_message_Request = async (audioBuffer, user_id) => {
  const { transcriptionEndPoint, usersDataEndPoint } = environment;

  //const { categoryListEndPoint } = environment;
  return await axios
    .post(
      `${transcriptionEndPoint}/postTranscription_to_whisper?user_id=${user_id}`,
      audioBuffer,
      {
        headers: {
          "Content-Type": "audio/m4a", // OR "audio/m4a" — both usually work for M4A
        },
      }
    )
    .then((response) => {
      console.log("RESPONSE AT REQUEST:", response.data);
      return response;
    })
    .catch((error) => {
      return error;
    });
};
// export const post_a_message_Request = async (user_id, new_message) => {
//   const { transcriptionEndPoint } = environment;

//   //const { categoryListEndPoint } = environment;
//   return await axios
//     .post(
//       `${transcriptionEndPoint}/postTranscription?user_id=${user_id}`,
//       new_message
//     )
//     .then((response) => {
//       console.log("RESPONSE AT REQUEST:", response.data);
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
export const post_a_message_Request = async (user_id, new_message) => {
  const { transcriptionEndPoint } = environment;
  console.log("NEW MESSAGE AT REQUEST:", new_message);
  console.log("USER ID AT REQUEST:", user_id);

  return await axios
    .post(
      `${transcriptionEndPoint}/postTranscription?user_id=${user_id}`,
      { new_message } // Wrap new_message in an object
    )
    .then((response) => {
      console.log("RESPONSE AT REQUEST:", response.data);
      return response;
    })
    .catch((error) => {
      console.error("ERROR AT REQUEST:", error);
      return error;
    });
};
export const posting_new_text_clip_request = async (new_text_clip_data) => {
  const { usersDataEndPoint } = environment;
  return await axios
    .post(`${usersDataEndPoint}/postNewMessageAtUserData`, new_text_clip_data)
    .then((response) => {
      console.log("RESPONSE AT REQUEST:", response.data);
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteRecentTextClipRequest = async (requestBody) => {
  const { usersDataEndPoint } = environment;
  return await axios
    .delete(`${usersDataEndPoint}/deleteOneRecentMessageByUserID`, {
      data: requestBody,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
