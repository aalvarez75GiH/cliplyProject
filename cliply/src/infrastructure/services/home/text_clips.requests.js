import { useContext } from "react";
import axios from "axios";
import { environment } from "../../../util/env";

export const post_a_voice_message_Request = async (audioBuffer, user_id) => {
  const { transcriptionEndPoint } = environment;

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
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const get_User_Data_Request = async (user_id) => {
  const { usersDataEndPoint } = environment;
  return await axios
    .get(`${usersDataEndPoint}/userDataByUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const update_Text_Clips_Used_Count_Request = async (
  usedCountDataForUpdate
) => {
  console.log("DATA FOR UPDATING USED COUNT:", usedCountDataForUpdate);
  const { usersDataEndPoint } = environment;
  return await axios
    .put(
      `${usersDataEndPoint}/updateStoredMessageUsedCount`,
      usedCountDataForUpdate
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
