import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { theme } from "../../infrastructure/theme/index";
import {
  Flex_Container,
  Container,
  Action_Container,
} from "../../components/global_components/containers/general_containers";
import { TypeMessageContext } from "../../infrastructure/services/type_message/type_message.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";
import { HomeHeader } from "../../components/headers/home_header.component";
import { Translated_message_Tile } from "../../components/tiles/translated_message_tile/translated_message.tile";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Type_Message_Header } from "../../components/headers/type_message.header";
import { Message_Input } from "../../components/inputs/message.input";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta";
import { Text } from "../../infrastructure/typography/text.component";

export default function Type_Message_View() {
  const [textInputValue, setTextInputvalue] = useState("");

  const {
    type_message_request,
    isLoading,
    response,
    setResponse,
    messageTranslated,
  } = useContext(TypeMessageContext);

  const { globalLanguage, userToDB } = useContext(GlobalContext);
  const { user_id } = userToDB;

  const navigation = useNavigation();
  const route = useRoute();
  const inputRef = useRef(null);

  console.log("ROUTE AT TYPE MESSAGE VIEW:", route.name);

  useEffect(() => {
    if (!response && !isLoading) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [response, isLoading]);

  const onChangeText = (value) => {
    setTextInputvalue(value);
  };

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Flex_Container color={theme.colors.bg.screens_bg}>
        {isLoading ? (
          <Container
            width={"100%"}
            height={"82%"}
            justify="space-between"
            align="center"
            color={theme.colors.bg.screens_bg}
            // color={"green"}
          >
            <Container
              width={"100%"}
              height={"88%"}
              justify="center"
              align="center"
              color={theme.colors.bg.screens_bg}
              //   color={"red"}
              direction="row"
            >
              <ActivityIndicator size="small" color="#000000" />
              <Spacer position="left" size="large" />
              <Text variant="middle_screens_caption">"Translating..."</Text>
            </Container>
          </Container>
        ) : response ? (
          <>
            <HomeHeader />

            <Spacer position="top" size="extraLarge" />

            <Container
              width="100%"
              height="80%"
              color={theme.colors.bg.screens_bg}
              justify="center"
              align="center"
            >
              <Container
                width="100%"
                height="60%"
                color={theme.colors.bg.screens_bg}
                align="center"
                justify="flex-end"
              >
                <Translated_message_Tile
                  message_en={messageTranslated.body.en}
                  message_es={messageTranslated.body.es}
                  language_detected={messageTranslated.language_detected}
                  width="95%"
                  height="70%"
                  globalLanguage={globalLanguage}
                />
              </Container>

              <Container
                width="100%"
                height="20%"
                justify="flex-start"
                align="center"
                direction="column"
                color={theme.colors.bg.screens_bg}
              >
                <Spacer position="top" size="medium" />

                <Action_Container
                  width="95%"
                  height="45%"
                  justify="center"
                  align="center"
                  direction="column"
                  color="#000000"
                  onPress={() => {
                    setResponse(null);
                  }}
                  border_radius_top_left={15}
                  border_radius_top_right={15}
                  border_radius_bottom_left={15}
                  border_radius_bottom_right={15}
                >
                  <Text variant="dm_sans_bold_16_white">Exit</Text>
                </Action_Container>

                <Text variant="dm_sans_bold_14" style={{ padding: 10 }}>
                  {globalLanguage === "EN"
                    ? "Note: this message was saved on recent"
                    : "Nota: este mensaje se guardó en recientes"}
                </Text>
              </Container>
            </Container>

            <Container
              width="100%"
              height="10%"
              justify="space-between"
              align="center"
              color={theme.colors.bg.screens_bg}
            />
          </>
        ) : (
          <Container
            width="100%"
            height="100%"
            align="center"
            justify="flex-start"
            color={theme.colors.bg.elements_bg}
          >
            <Type_Message_Header globalLanguage={globalLanguage} />

            <Message_Input
              ref={inputRef}
              width="100%"
              height="310px"
              multiline={true}
              mode="flat"
              activeUnderlineColor="#FFFFFF"
              underlineColor="transparent"
              style={{
                backgroundColor: theme.colors.bg.elements_bg,
                textAlignVertical: "center",
                textAlign: "center",
                fontFamily: theme.fonts.body,
                fontSize: 18,
                fontWeight: theme.fontWeights.bold,
              }}
              onChangeText={onChangeText}
              cursorColor="black"
              selectionColor="black"
            />

            {textInputValue.length > 0 && (
              <Squared_action_CTA_component
                action={() => type_message_request(textInputValue, user_id)}
                label={globalLanguage === "EN" ? "Translate" : "Traducir"}
                height="8%"
              />
            )}
          </Container>
        )}
      </Flex_Container>
    </SafeArea>
  );
}
