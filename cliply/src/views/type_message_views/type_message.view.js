import React, { useState, useRef, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { theme } from "../../infrastructure/theme/index";
import { Flex_Container } from "../../components/global_components/containers/general_containers";
import { TypeMessageContext } from "../../infrastructure/services/type_message/type_message.context";
import { Type_message_process_area_1 } from "../../components/type_message_process_areas/type_message_area_1.component";
import { Type_message_process_area_2 } from "../../components/type_message_process_areas/type_message_area_2.component";
import { Type_message_process_area_3 } from "../../components/type_message_process_areas/type_message_area_3.component";

import { GlobalContext } from "../../infrastructure/services/global/global.context";
export default function Type_Message_View() {
  const [textInputValue, setTextInputvalue] = useState("");
  const {
    type_message_request,
    isLoading,
    response,
    setResponse,
    messageTranslated,
  } = useContext(TypeMessageContext);
  const { globalLanguage } = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();
  console.log("ROUTE AT TYPE MESSAGE VIEW:", route.name);
  const inputRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200); // slight delay to ensure screen is rendered

      return () => clearTimeout(timeout);
    }, [])
  );

  const onChangeText = (value) => {
    setTextInputvalue(value);
    console.log("Text input state: ", textInputValue);
  };

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Flex_Container color={theme.colors.bg.screens_bg}>
        {isLoading && (
          <Type_message_process_area_1 globalLanguage={globalLanguage} />
        )}
        {!isLoading && response && (
          <Type_message_process_area_2
            message_en={messageTranslated.body.en}
            message_es={messageTranslated.body.es}
            original_message={messageTranslated.original_message}
            language_detected={messageTranslated.language_detected}
            action_1={() => navigation.navigate("Saving_text_clip_1")}
            action_2={() => {
              setResponse(null);
              navigation.navigate("Home");
            }}
            globalLanguage={globalLanguage}
            route_name={route.name}
          />
        )}
        {!isLoading && !response && (
          <Type_message_process_area_3
            onChangeText={onChangeText}
            type_message_request={type_message_request}
            inputRef={inputRef}
            textInputValue={textInputValue}
            globalLanguage={globalLanguage}
          />
        )}
      </Flex_Container>
    </SafeArea>
  );
}
