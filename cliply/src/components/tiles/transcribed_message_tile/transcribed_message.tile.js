import React, { useState, useContext, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../../infrastructure/typography/text.component.js";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers.js";
import { theme } from "../../../infrastructure/theme/index.js";
import { Snack_Bar_Component } from "../../others/snack_bar.component.js";
import { Footer_1 } from "./footer_1.component.js";

import { GlobalContext } from "../../../infrastructure/services/global/global.context.js";

export const Transcribed_Message_Tile = ({
  message_en,
  message_es,
  width = "95%",
  message_id = null,
  globalLanguage,
}) => {
  const { userToDB, showSuccessSnackbar, snackbar } = useContext(GlobalContext);

  const [language, setLanguage] = useState(globalLanguage);
  const [showRegularFooterAfterCopy, setShowRegularFooterAfterCopy] =
    useState(false);

  const { user_id } = userToDB;

  const updatedSpecificTextClipData = {
    user_id,
    message_id,
  };

  useEffect(() => {
    setLanguage(globalLanguage);
  }, [globalLanguage]);

  useEffect(() => {
    setShowRegularFooterAfterCopy(true);
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === "EN" ? "ES" : "EN";
    const messageToCopy = newLanguage === "EN" ? message_en : message_es;

    try {
      setLanguage(newLanguage);
      await Clipboard.setStringAsync(messageToCopy);

      showSuccessSnackbar("Copied, Paste it on your chat", null, "");

      setTimeout(() => {
        setShowRegularFooterAfterCopy(true);
      }, 1000);
    } catch (error) {
      console.log("Failed to toggle and copy message:", error);
    }
  };

  const copy_message_action = async () => {
    await Clipboard.setStringAsync(language === "EN" ? message_en : message_es);
    showSuccessSnackbar("Copied, Paste it on your chat", null, "");
  };

  const messageToShow =
    language === "EN"
      ? message_en
      : language === "ES"
      ? message_es
      : globalLanguage === "EN"
      ? message_en
      : message_es;

  return (
    <>
      <Container
        width={width}
        height="250px"
        color="transparent"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        <Container
          // width={width}
          width={width}
          height="250px"
          align="center"
          justify="space-between"
          color={theme.colors.bg.elements_bg}
          border_radius_top_left={15}
          border_radius_top_right={15}
          border_radius_bottom_left={15}
          border_radius_bottom_right={15}
          // overflow="hidden"
        >
          <Action_Container
            width="100%"
            style={{
              flex: 1,
              paddingHorizontal: 28,
              paddingTop: 28,
              paddingBottom: 12,
            }}
            align="center"
            justify="center"
            direction="row"
            color={theme.colors.bg.elements_bg}
            onPress={copy_message_action}
          >
            <Text
              variant="dm_sans_bold_18"
              style={{
                lineHeight: 28,
                // textAlign: "start",
              }}
            >
              {messageToShow}
            </Text>
          </Action_Container>

          {showRegularFooterAfterCopy && (
            <Footer_1
              language={language}
              toggleLanguage={toggleLanguage}
              copy_message_action={copy_message_action}
              updatedSpecificTextClipData={updatedSpecificTextClipData}
            />
          )}

          {!showRegularFooterAfterCopy && (
            <Container
              width="100%"
              height="58px"
              align="center"
              justify="center"
              direction="row"
              color={theme.colors.bg.elements_bg}
            />
          )}

          <Container
            width="100%"
            height="6px"
            color={theme.colors.ui.success}
          />

          <Snack_Bar_Component
            snackbar={snackbar}
            bottom_ios={-25}
            bottom_android={-45}
            minHeight={60}
            minWidth="100%"
            duration={1000}
          />
        </Container>
      </Container>
    </>
  );
};
