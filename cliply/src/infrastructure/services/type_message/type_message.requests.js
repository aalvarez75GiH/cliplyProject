import axios from "axios";
import { environment } from "../../../util/env";

export const post_a_typed_message_Request = async (
  text_to_operate_encoded,
  user_id
) => {
  const { typeMessageEndPoint } = environment;

  console.log("TEXT ENCODED AT REQUEST:", text_to_operate_encoded);
  console.log("USER ID AT REQUEST:", user_id);
  console.log(
    "FULL TYPE MESSAGE URL:",
    `${typeMessageEndPoint}/postTypeMessage?text_to_operate=${text_to_operate_encoded}&user_id=${user_id}`
  );

  try {
    const response = await axios.post(
      `${typeMessageEndPoint}/postTypeMessage?text_to_operate=${text_to_operate_encoded}&user_id=${user_id}`
    );

    return response;
  } catch (error) {
    console.log("TYPE MESSAGE ERROR STATUS:", error.response?.status);
    console.log("TYPE MESSAGE ERROR DATA:", error.response?.data);
    console.log("TYPE MESSAGE ERROR MESSAGE:", error.message);

    throw error;
  }
};
