import React, { useState, useContext, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../infrastructure/typography/text.component.js";
import { EN_ES_CTA_component } from "../calls_to_action/en_es.cta.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import CopyPaste_icon from "../../../assets/my-icons/copy_paste.svg";
import { theme } from "../../infrastructure/theme/index.js";
import SuccessIcon from "../../../assets/my-icons/success_icon.svg";
import { Snack_Bar_Component } from "../others/snack_bar.component.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Recent_Message_Created_Tile = ({
  message_en,
  message_es,
  language_detected,
  width = "95%",
  height = "45%",
  message_id = null,
  globalLanguage,
  route_name,
  onAction,
}) => {
  //   *******************************************************
  const navigation = useNavigation();
  // const [language, setLanguage] = useState(null);
  const [language, setLanguage] = useState(globalLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showRegularFooterAfterCopy, setShowRegularFooterAfterCopy] =
    useState(true);

  useEffect(() => {
    setLanguage(globalLanguage);
  }, [globalLanguage]);

  // const onAction = () => {
  //   navigation.goBack();
  // };

  //   useEffect(() => {
  //     const autoCopyMessage = async () => {
  //       const messageToCopy = globalLanguage === "EN" ? message_en : message_es;

  //       await Clipboard.setStringAsync(messageToCopy);
  //       setCopiedMessage(true);
  //       setShowRegularFooterAfterCopy(false);
  //       showSuccessSnackbar("Copied, Paste it on your chat", onAction, "Ok");

  //       setTimeout(() => {
  //         setShowRegularFooterAfterCopy(true);
  //       }, 1000);
  //     };

  //     autoCopyMessage();
  //   }, []);

  const { userToDB, showSuccessSnackbar, snackbar } = useContext(GlobalContext);

  const { user_id } = userToDB;

  const updatedSpecificTextClipData = {
    user_id: user_id,
    message_id: message_id,
  };

  const toggleLanguage = async () => {
    const newLanguage = language === "EN" ? "ES" : "EN";

    const messageToCopy = newLanguage === "EN" ? message_en : message_es;

    try {
      setLanguage(newLanguage);

      await Clipboard.setStringAsync(messageToCopy);

      setShowRegularFooterAfterCopy(false);

      showSuccessSnackbar("Copied, Paste it on your chat", null, "");

      setTimeout(() => {
        setShowRegularFooterAfterCopy(true);
      }, 1000);
    } catch (error) {
      console.log("Failed to toggle and copy message:", error);
    }
  };

  const copy_message_action = async () => {
    setCopiedMessage(true);
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
      {isLoading && (
        <Container
          width="100%"
          height="55%"
          color={"#FFFFFF"}
          //   color={"#FAD"}
          justify="center"
          align="center"
          style={{
            position: "absolute",
            top: 90,
            bottom: 20,
          }}
        >
          <ActivityIndicator size="small" color="#000000" />
        </Container>
      )}
      {!isLoading && (
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
            <Container
              width="100%"
              height="30%"
              align="center"
              justify="center"
              direction="row"
              color={theme.colors.bg.elements_bg}
            >
              <Container
                width="30%"
                height="55%"
                align="flex-start"
                justify="flex-start"
                direction="row"
                color={theme.colors.bg.elements_bg}
                // color={"red"}
              >
                <EN_ES_CTA_component
                  //   language={language === "EN" ? "ES" : "EN"}
                  language={language === "EN" ? "ES" : "EN"}
                  action={toggleLanguage}
                  // isSelected={isSelected}
                />
              </Container>

              {!routes_names_to_hide_delete_option.includes(route_name) && (
                <Action_Container
                  width="30%"
                  height="65%"
                  align="center"
                  justify="center"
                  direction="column"
                  color={theme.colors.bg.elements_bg}
                  onPress={() => {
                    navigation.navigate("Delete_Item_View", {
                      dataNeededToDeleteTextClip: updatedSpecificTextClipData,
                      item_to_delete_label: "Text clip",
                      coming_from: "Recent_Text_Clip_Tile",
                    });
                  }}
                >
                  <Text
                    variant="dm_sans_bold_12_disable_not_active"
                    style={{
                      textDecorationLine: "underline",
                    }}
                  >
                    {globalLanguage === "EN" ? "Delete" : "Eliminar"}
                  </Text>
                </Action_Container>
              )}
              {routes_names_to_hide_delete_option.includes(route_name) && (
                <Container
                  width="30%"
                  height="65%"
                  align="center"
                  justify="center"
                  direction="column"
                  color={theme.colors.bg.elements_bg}
                />
              )}

              <Container
                width="30%"
                height="65%"
                align="flex-end"
                justify="flex-end"
                direction="row"
                color={theme.colors.bg.elements_bg}
              >
                <Action_Container
                  width="65px"
                  onPress={() => copy_message_action()}
                  color={theme.colors.bg.elements_bg}
                >
                  <CopyPaste_icon
                    width="30px"
                    height="30px"
                    fill={theme.colors.text.middle_screens_text}
                  />
                </Action_Container>
              </Container>
            </Container>
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
          {/* {showRegularFooterAfterCopy && (
            <Container
              width="100%"
              height="5%"
              color={
                showRegularFooterAfterCopy
                  ? theme.colors.ui.success
                  : "transparent"
              }
            />
          )} */}
        </Container>
      )}
    </>
  );
};
