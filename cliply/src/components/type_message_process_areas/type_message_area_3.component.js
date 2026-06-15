import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Type_Message_Header } from "../headers/type_message.header";
import { Squared_action_CTA_component } from "../calls_to_action/squared_action.cta";
import { Message_Input } from "../inputs/message.input.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Type_message_process_area_3 = ({
  onChangeText,
  type_message_request,
  inputRef,
  textInputValue,
  globalLanguage,
}) => {
  const { userToDB } = useContext(GlobalContext);
  const { user_id } = userToDB;
  return (
    <>
      <Container
        width="100%"
        height="100%"
        align="center"
        justify="flex-start"
        color={theme.colors.bg.elements_bg}
      >
        <Type_Message_Header globalLanguage={globalLanguage} />

        {/* <Spacer position="top" size="small" /> */}

        <Message_Input
          width="100%"
          height="310px"
          multiline={true}
          mode="flat"
          activeUnderlineColor={"#FFFFFF"}
          underlineColor="transparent"
          style={{
            backgroundColor: theme.colors.bg.elements_bg,
            textAlignVertical: "center",
            textAlign: "center",
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: theme.fontWeights.bold,
          }}
          onChangeText={(value) => onChangeText(value)}
          // selectionColor={"red"}
          cursorColor="black"
          // onFocus={() => onFocus()}
          selectionColor="black"
          ref={inputRef}
        />
        {textInputValue.length > 0 && (
          <Squared_action_CTA_component
            action={() => type_message_request(textInputValue, user_id)}
            label={globalLanguage === "EN" ? "Translate" : "Traducir"}
            height="8%"
          />
        )}
      </Container>
    </>
  );
};
