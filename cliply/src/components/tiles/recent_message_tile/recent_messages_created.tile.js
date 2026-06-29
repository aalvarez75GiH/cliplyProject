import React, { useState, useContext, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import { ActivityIndicator } from "react-native";

import { Text } from "../../../infrastructure/typography/text.component.js";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers.js";
import { theme } from "../../../infrastructure/theme/index.js";
import { Footer_1 } from "./footer_1.component.js";
import { Snack_Bar_Component } from "../../others/snack_bar.component.js";

import { GlobalContext } from "../../../infrastructure/services/global/global.context.js";

export const Recent_Message_Created_Tile = ({
  message_en,
  message_es,
  width = "95%",
  height = "45%",
  message_id = null,
  globalLanguage,
  route_name,
  onAction,
}) => {
  const [language, setLanguage] = useState(globalLanguage);
  const [showRegularFooterAfterCopy, setShowRegularFooterAfterCopy] =
    useState(true);
  const { userToDB, showSuccessSnackbar, snackbar } = useContext(GlobalContext);
  const { user_id } = userToDB;

  const updatedSpecificTextClipData = {
    user_id: user_id,
    message_id: message_id,
  };

  useEffect(() => {
    setLanguage(globalLanguage);
  }, [globalLanguage]);

  // This effect runs only once when the component mounts, automatically copying the message to the clipboard and showing a success snackbar.
  useEffect(() => {
    const autoCopyMessage = async () => {
      const messageToCopy = globalLanguage === "EN" ? message_en : message_es;

      await Clipboard.setStringAsync(messageToCopy);
      // setCopiedMessage(true);
      showSuccessSnackbar("Just paste it on your chat", onAction, "Ok");
    };

    autoCopyMessage();
  }, []);

  const toggleLanguage = async (language) => {
    console.log("Toggling language to:", language);
    const newLanguage = language === "English" ? "EN" : "ES";

    const messageToCopy = newLanguage === "EN" ? message_en : message_es;

    console.log("Message to copy after toggling language:", messageToCopy);

    try {
      setLanguage(newLanguage);

      await Clipboard.setStringAsync(messageToCopy);

      setShowRegularFooterAfterCopy(false);

      showSuccessSnackbar("Message copied", null, "");

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

  const routes_names_to_hide_delete_option = [
    "Type_Message_View",
    "Voice_and_recent_View",
    "Quick_Voice_Text_Clip",
  ];

  //   *******************************************************

  return (
    <>
      <Container
        width={width}
        height={height}
        align="center"
        justify="center"
        color={theme.colors.bg.elements_bg}
        style={{
          shadowColor: "#000", // iOS shadow color
          shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
          shadowOpacity: 0.25, // iOS shadow opacity
          shadowRadius: 3.84, // iOS shadow radius
          elevation: 5, // Android shadow
          position: "absolute",
          top: 90,
          bottom: 20,
        }}
      >
        <Action_Container
          width="100%"
          height={showRegularFooterAfterCopy ? "65%" : "70%"}
          align="center"
          justify="center"
          direction="row"
          color={theme.colors.bg.elements_bg}
          onPress={() => copy_message_action()}
        >
          {
            <Container
              width="90%"
              height="90%"
              align="center"
              justify="center"
              direction="row"
              color={theme.colors.bg.elements_bg}
            >
              <Text variant={"dm_sans_bold_18_centered"}>
                {language === null
                  ? globalLanguage === "EN"
                    ? message_en
                    : message_es
                  : null}
                {language === "EN" ? message_en : null}
                {language === "ES" ? message_es : null}
              </Text>
            </Container>
          }
        </Action_Container>
        {/* ***************** FOOTER 1 *********** */}
        {showRegularFooterAfterCopy && (
          <Footer_1
            language={language}
            message_en={message_en}
            message_es={message_es}
            toggleLanguage={toggleLanguage}
            copy_message_action={copy_message_action}
            updatedSpecificTextClipData={updatedSpecificTextClipData}
            globalLanguage={globalLanguage}
            routes_names_to_hide_delete_option={
              routes_names_to_hide_delete_option
            }
            route_name={route_name}
          />
        )}
        {/* ***************** FOOTER 2 *********** */}
        {!showRegularFooterAfterCopy && (
          <Container
            width="100%"
            height="30%"
            align="center"
            justify="flex-start"
            direction="row"
            color={theme.colors.bg.elements_bg}
            // color={"lightyellow"}
          >
            <Container
              width="35%"
              height="100%"
              justify="center"
              align="center"
              color={"transparent"}
              //color={"red"}
            ></Container>
            <Container width="45%" height="100%" color="transparent" />
          </Container>
        )}
        <Snack_Bar_Component
          snackbar={snackbar}
          bottom_ios={-25}
          bottom_android={-45}
          minHeight={60}
          minWidth={"100%"}
          duration={1000}
        />
      </Container>
    </>
  );
};
