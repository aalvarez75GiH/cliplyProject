import axios from "axios";
import { environment } from "../../../util/env";

export const get_user_by_uid_and_user_data_Request = async (uid) => {
  const { usersEndPoint } = environment;
  return await axios
    .get(`${usersEndPoint}/userByUId?uid=${uid}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const post_user_Request = async (user_to_create_at_firebase) => {
  const { usersEndPoint } = environment;

  return await axios
    .post(`${usersEndPoint}`, user_to_create_at_firebase, {
      headers: {
        "Content-Type": "application/json", // Assuming the data is JSON
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const sendingEncryptedPINRequest = async (encryptedPin, idToken) => {
  const { usersEndPoint } = environment;

  return await axios
    .post(
      `${usersEndPoint}/credentials`,
      { encryptedPin }, // <-- send JSON, not raw string
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const resettingPINRequest = async (encryptedPin, email) => {
  const { usersEndPoint } = environment;
  console.log("RESETTING PIN REQUEST TRIGGERED WITH:", encryptedPin, email);

  // Validate usersEndPoint
  if (!usersEndPoint) {
    throw new Error("usersEndPoint is not defined in the environment.");
  }

  const data_for_request = {
    encrypted_pin: encryptedPin,
    email: email,
  };

  try {
    const response = await axios.post(
      `${usersEndPoint}/reset-pin`,
      data_for_request
    );
    return response.data; // Return only the data field
  } catch (error) {
    // Throw the error to let the caller handle it
    throw error;
  }
};

export const put_preference_language_Request = async (
  user_id,
  language_chosen
) => {
  console.log(
    "PUT PREFERENCE LANGUAGE REQUEST TRIGGERED WITH:",
    user_id,
    language_chosen
  );
  const { usersEndPoint } = environment;
  return await axios
    .put(
      `${usersEndPoint}/updatePreferenceLanguage?user_id=${user_id}&preference_language=${language_chosen}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const put_new_pin_Request = async (user_id, encrypted_pin) => {
  console.log("PUT NEW PIN REQUEST TRIGGERED WITH:", user_id, encrypted_pin);
  const { usersEndPoint } = environment;
  return await axios
    .put(`${usersEndPoint}/updatePINNumberOnDemand?user_id=${user_id}`, {
      encrypted_pin: encrypted_pin,
    })
    .then((response) => {
      console.log("RESPONSE AT REQUEST:", response.status);
      return response.status;
    })
    .catch((error) => {
      return error;
    });
};
export const delete_Stored_Text_Clip_Request = async (requestBody) => {
  console.log("SPECIFIC TEXT CLIP DATA AT REQUESTS:", requestBody);
  const { usersDataEndPoint } = environment;
  return await axios
    .delete(`${usersDataEndPoint}/deleteStoredMessageByUserID`, {
      data: requestBody,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
