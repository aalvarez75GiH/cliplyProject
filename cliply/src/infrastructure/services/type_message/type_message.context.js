import React, { createContext, useState, useContext } from "react";
import "react-native-get-random-values";

import { post_a_typed_message_Request } from "./type_message.requests";

import { TextClipsContext } from "../home/text_clips.context";

export const TypeMessageContext = createContext();

export const Type_Message_ContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageTranslated, setMessageTranslated] = useState({});

  const { gettingUserDataOnDifferentOperations } = useContext(TextClipsContext);
  const type_message_request = async (text_to_operate, user_id) => {
    setIsLoading(true);
    try {
      const encodedText = encodeURIComponent(text_to_operate);
      const response = await post_a_typed_message_Request(encodedText, user_id);
      console.log("RESPONSE AT TYPE MESSAGE CONTEXT:", response);
      if (response.status === 200) {
        setMessageTranslated(response.data);
        setResponse(response.data);
        setIsLoading(false);
        gettingUserDataOnDifferentOperations(user_id);
      } else {
        setIsLoading(false);
        setResponse(null);
        console.log("Failed to get a valid response:", response.status);
      }
    } catch (error) {
      setIsLoading(false);
      setResponse(null);

      console.log("Error in type_message_request:", error.response?.status);
      console.log("Backend error data:", error.response?.data);
    }
  };

  return (
    <TypeMessageContext.Provider
      value={{
        type_message_request,
        setResponse,
        response,
        isLoading,
        messageTranslated,
      }}
    >
      {children}
    </TypeMessageContext.Provider>
  );
};
