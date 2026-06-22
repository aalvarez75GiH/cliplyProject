import React, { useState, useContext, use } from "react";
import * as Clipboard from "expo-clipboard";
import { ActivityIndicator, Platform } from "react-native";
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

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";
import { Snack_Bar_Component } from "../others/snack_bar.component.js";

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

  const { introAdded, setIntroAdded, updatingTextClipsUsedCount } =
    useContext(TextClipsContext);
  const { showSuccessSnackbar } = useContext(GlobalContext);
  // useState(() => {}, []);
  const navigation = useNavigation();

  console.log(
    "SPECIFIC TEXT CLIP DATA AT STORED CLIP TILE:",
    specificTextClipData
  );

  const toggleLanguage = async () => {
    const newLanguage = language === "EN" ? "ES" : "EN";

    const messageToCopy = introAdded
      ? `Hey, Your driver here. ${newLanguage === "EN" ? body.en : body.es}`
      : newLanguage === "EN"
      ? body.en
      : body.es;

    try {
      setLanguage(newLanguage);

      await Clipboard.setStringAsync(messageToCopy);

      onSelect(message_id);
      setShowRegularFooterAfterCopy(false);
      setIntroAdded(false);

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

    const messageToCopy = introAdded
      ? `Hey, Your driver here. ${language === "EN" ? body.en : body.es}`
      : language === "EN"
      ? body.en
      : body.es;

    try {
      await Clipboard.setStringAsync(messageToCopy);

      onSelect(message_id);
      setShowRegularFooterAfterCopy(false);
      setIntroAdded(false);

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

  const unCopy_message_action = async () => {
    try {
      setLanguage(globalLanguage === "EN" ? "EN" : "ES");
      onSelect(null);
      await Clipboard.setStringAsync("");
      setIntroAdded(false);
    } catch (error) {
      console.log("Failed to uncopy message:", error);
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
            <Container
              width={Platform.OS === "ios" ? "410px" : "100%"}
              height="30%"
              align="center"
              justify="center"
              direction="row"
              color={
                isSelected
                  ? theme.colors.bg.elements_bg
                  : theme.colors.bg.elements_bg
              }
            >
              <Container
                width="30%"
                height="75%"
                align="flex-start"
                justify="flex-start"
                direction="row"
                color={theme.colors.bg.elements_bg}
              >
                <EN_ES_CTA_component
                  language={language === "EN" ? "ES" : "EN"}
                  action={toggleLanguage}
                  isSelected={isSelected}
                />
              </Container>

              <Action_Container
                width="30%"
                height="65%"
                align="center"
                justify="center"
                direction="column"
                color={theme.colors.bg.elements_bg}
                onPress={() => {
                  const updatedSpecificTextClipData = {
                    ...specificTextClipData,
                    message_id: item.message_id,
                  };
                  setSpecificTextClipData(updatedSpecificTextClipData);
                  navigation.navigate("Delete_Item_View", {
                    dataNeededToDeleteTextClip: updatedSpecificTextClipData,
                    item_to_delete_label: "Text clip",
                    coming_from: "Stored_Clips_Tile",
                  });
                  // deleteStoredTextClip(updatedSpecificTextClipData);
                }}
              >
                <Text variant="underlined_small_caption">Delete</Text>
              </Action_Container>
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
                  onPress={() => copy_message_action(item)}
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
              >
                {/* <Action_Container
                  width="100%"
                  height="65%"
                  justify="center"
                  align="center"
                  direction="row"
                  //color={theme.colors.ui.success}
                  color={"transparent"}
                  onPress={() => unCopy_message_action(item)}
                >
                  <Spacer position="left" size="large">
                    <SuccessIcon width="20px" height="20px" />
                  </Spacer>
                  <Spacer position="left" size="medium">
                    <Text
                      variant="dm_sans_bold_16"
                      style={{
                        color: theme.colors.ui.success,
                        textDecorationLine: "underline",
                      }}
                    >
                      Last copied
                    </Text>
                  </Spacer>
                </Action_Container> */}
              </Container>
              <Container width="45%" height="100%" color="transparent" />
              {/* </Container> */}
            </Container>
          )}
          {isSelected && (
            <>
              <Container
                width="100%"
                height="5%"
                color={theme.colors.ui.success}
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
      )}
    </>
  );
};
