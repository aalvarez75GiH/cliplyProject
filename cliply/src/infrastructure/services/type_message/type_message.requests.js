import axios from "axios";
import { environment } from "../../../util/env";

export const post_a_typed_message_Request = async (
  text_to_operate_encoded,
  user_id
) => {
  const { typeMessageEndPoint } = environment;
  //const { categoryListEndPoint } = environment;
  console.log("TEXT ENCODED AT REQUEST:", text_to_operate_encoded);

  return await axios
    .post(
      `${typeMessageEndPoint}/postTypeMessage?text_to_operate=${text_to_operate_encoded}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
