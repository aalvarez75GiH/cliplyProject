import React, { useState, useContext, use } from "react";
import * as Clipboard from "expo-clipboard";
import { ActivityIndicator, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../../infrastructure/typography/text.component.js";
import { EN_ES_CTA_component } from "../../calls_to_action/en_es.cta.js";
import { Short_EN_ES_CTA_CTA } from "../../calls_to_action/short_ES_EN.cta.js";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers.js";
import CopyPaste_icon from "../../../../assets/my-icons/copy_paste.svg";
import { theme } from "../../../infrastructure/theme/index.js";
import { Footer_1 } from "./footer_1.component.js";

import LanguageIcon from "../../../../assets/my-icons/language_icon.svg";
import RemoveIcon from "../../../../assets/my-icons/remove_icon.svg";

import { TextClipsContext } from "../../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../../infrastructure/services/global/global.context.js";
import { Snack_Bar_Component } from "../../others/snack_bar.component.js";

export const Stored_Message_Tile = ({
  item,
  globalLanguage,
  selectedItemId,
  onSelect,
  specificTextClipData,
  setSpecificTextClipData,
  snackbar,
}) => {
  //   *******************************************************
  const [language, setLanguage] = useState(globalLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegularFooterAfterCopy, setShowRegularFooterAfterCopy] =
    useState(false);
  const { summary, body, message_id } = item;

  const { updatingTextClipsUsedCount } = useContext(TextClipsContext);
  const { showSuccessSnackbar } = useContext(GlobalContext);
  // useState(() => {}, []);
  const navigation = useNavigation();

  console.log(
    "SPECIFIC TEXT CLIP DATA AT STORED CLIP TILE:",
    specificTextClipData
  );

  const toggleLanguage = async (language) => {
    console.log("Toggling language to:", language);
    const newLanguage = language === "English" ? "EN" : "ES";

    const messageToCopy = newLanguage === "EN" ? body.en : body.es;

    try {
      setLanguage(newLanguage);

      await Clipboard.setStringAsync(messageToCopy);

      onSelect(message_id);
      setShowRegularFooterAfterCopy(false);

      showSuccessSnackbar("Message copied", null, "");

      setTimeout(() => {
        setShowRegularFooterAfterCopy(true);
      }, 1000);
    } catch (error) {
      console.log("Failed to toggle and copy message:", error);
    }
  };

  const copy_message_action = async (item) => {
    const { body, message_id } = item;

    const messageToCopy = language === "EN" ? body.en : body.es;

    try {
      await Clipboard.setStringAsync(messageToCopy);

      onSelect(message_id);
      setShowRegularFooterAfterCopy(false);

      showSuccessSnackbar("Message copied", null, "");

      setTimeout(() => {
        setShowRegularFooterAfterCopy(true);
      }, 1000);

      const usedCountDataForUpdate = {
        ...specificTextClipData,
        message_id,
      };

      updatingTextClipsUsedCount(usedCountDataForUpdate).catch((error) => {
        console.log("Failed to update used count:", error);
      });
    } catch (error) {
      console.log("Failed to copy message:", error);
    }
  };

  const isSelected = selectedItemId === message_id;
  //   *******************************************************

  return (
    <>
      {isLoading && (
        <Container
          width={Platform.OS === "ios" ? "400px" : "100%"}
          height="210px"
          color={"#FFFFFF"}
          justify="center"
          align="center"
        >
          <ActivityIndicator size="small" color="#000000" />
        </Container>
      )}
      {!isLoading && (
        <Container
          width={"410px"}
          height="210px"
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
            width={Platform.OS === "ios" ? "400px" : "100%"}
            height="210px"
            align="center"
            justify="flex-start"
            color={theme.colors.bg.elements_bg}
            style={{
              shadowColor: "#000", // iOS shadow color
              shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
              shadowOpacity: 0.25, // iOS shadow opacity
              shadowRadius: 3.84, // iOS shadow radius
              elevation: 5, // Android shadow
            }}
            border_radius_top_left={15}
            border_radius_top_right={15}
            border_radius_bottom_left={15}
            border_radius_bottom_right={15}
            overflow="hidden"
          >
            <Container
              width="100%"
              height="70%"
              align="center"
              justify="center"
              direction="row"
              color={
                isSelected
                  ? theme.colors.bg.elements_bg
                  : theme.colors.bg.elements_bg
              }
            >
              <Action_Container
                width="95%"
                height="90%"
                align="center"
                justify="center"
                direction="row"
                color={
                  isSelected
                    ? theme.colors.bg.elements_bg
                    : theme.colors.bg.elements_bg
                }
                onPress={() => (isSelected ? null : copy_message_action(item))}
              >
                {language === "ES" && (
                  <Text
                    variant={isSelected ? "dm_sans_bold_18" : "dm_sans_bold_26"}
                  >
                    {!isSelected ? summary.es : body.es}
                  </Text>
                )}
                {language === "EN" && (
                  <Text
                    variant={isSelected ? "dm_sans_bold_18" : "dm_sans_bold_28"}
                  >
                    {!isSelected ? summary.en : body.en}
                  </Text>
                )}
              </Action_Container>
            </Container>
            {/* ***************** FOOTER 1 ************************** */}
            {(!isSelected || showRegularFooterAfterCopy) && (
              <Footer_1
                item={item}
                language={language}
                toggleLanguage={toggleLanguage}
                copy_message_action={copy_message_action}
                isSelected={isSelected}
                specificTextClipData={specificTextClipData}
                setSpecificTextClipData={setSpecificTextClipData}
                navigation={navigation}
              />
            )}
            {/* ***************** FOOTER 2 ************************** */}
            {isSelected && !showRegularFooterAfterCopy && (
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
            {isSelected && (
              <>
                <Container
                  width="100%"
                  height="5%"
                  color={theme.colors.ui.success}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                />
                <Snack_Bar_Component
                  snackbar={snackbar}
                  bottom_ios={-25}
                  bottom_android={-45}
                  minHeight={60}
                  minWidth={"100%"}
                  duration={1000}
                />
              </>
            )}
          </Container>
        </Container>
      )}
    </>
  );
};
