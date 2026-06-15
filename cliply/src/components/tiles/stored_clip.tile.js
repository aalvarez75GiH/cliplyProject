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

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

export const Stored_Clips_Tile = ({
  item,
  globalLanguage,
  selectedItemId,
  onSelect,
  specificTextClipData,
  setSpecificTextClipData,
}) => {
  //   *******************************************************
  const [language, setLanguage] = useState(globalLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const { summary, body, message_id } = item;

  const { introAdded, setIntroAdded, updatingTextClipsUsedCount } =
    useContext(TextClipsContext);
  const { deleteStoredTextClip } = useContext(GlobalContext);
  useState(() => {
    // console.log(
    //   "NEXT STEP AT STORED CLIPS TILE:",
    //   JSON.stringify(nextStep, null, 2)
    // );
    // console.log(
    //   "NEXT STEP RS AT STORED CLIPS TILE:",
    //   JSON.stringify(nextStepRS, null, 2)
    // );
  }, []);
  const navigation = useNavigation();

  console.log(
    "SPECIFIC TEXT CLIP DATA AT STORED CLIP TILE:",
    specificTextClipData
  );
  const toggleLanguage = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      setLanguage((prevLanguage) => (prevLanguage === "EN" ? "ES" : "EN"));
      setIsLoading(false);
    }, 300);
  };

  const copy_message_action = async (item) => {
    const { body, message_id } = item;
    setIsLoading(true);
    setTimeout(async () => {
      await Clipboard.setStringAsync(
        introAdded
          ? `Hey, Your driver here. ${language === "EN" ? body.en : body.es}`
          : language === "EN"
          ? body.en
          : body.es
      );

      const usedCountDataForUpdate = {
        ...specificTextClipData,
        message_id: message_id,
      };
      console.log("DATA TO UPDATE USED COUNT AT TILE:", usedCountDataForUpdate);
      await updatingTextClipsUsedCount(usedCountDataForUpdate);

      console.log(`Copied to clipboard: ${body.en}`);
      //   setIsSelected(id);
      onSelect(message_id);
      setIsLoading(false);
      setIntroAdded(false);
    }, 300);
  };

  const uncopy_message_action = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      setLanguage(globalLanguage === "EN" ? "EN" : "ES");
      onSelect(null);
      await Clipboard.setStringAsync("");
      setIsLoading(false);
      setIntroAdded(false);
    }, 300);
  };

  // const delete_message_action = async (item) => {
  //   const updatedSpecificTextClipData = {
  //     ...specificTextClipData,
  //     message_id: item.message_id,
  //   };
  //   setSpecificTextClipData(updatedSpecificTextClipData);
  //   deleteStoredTextClip(updatedSpecificTextClipData);
  // };

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
              isSelected ? theme.colors.ui.success : theme.colors.bg.elements_bg
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
                  ? theme.colors.ui.success
                  : theme.colors.bg.elements_bg
              }
              onPress={() => (isSelected ? null : copy_message_action(item))}
            >
              {language === "ES" && (
                <Text
                  variant={
                    isSelected
                      ? "dm_sans_bold_18_white_centered"
                      : "dm_sans_bold_26_centered"
                  }
                >
                  {!isSelected ? summary.es : body.es}
                </Text>
              )}
              {language === "EN" && (
                <Text
                  variant={
                    isSelected
                      ? "dm_sans_bold_18_white_centered"
                      : "dm_sans_bold_28_centered"
                  }
                >
                  {!isSelected ? summary.en : body.en}
                </Text>
              )}
            </Action_Container>
          </Container>
          {/* ***************** FOOTER 1 ************************** */}
          {!isSelected && (
            <Container
              width={Platform.OS === "ios" ? "410px" : "100%"}
              height="30%"
              align="center"
              justify="center"
              direction="row"
              color={
                isSelected
                  ? theme.colors.ui.success
                  : theme.colors.bg.elements_bg
              }
            >
              <Container
                width="30%"
                height="75%"
                align="flex-start"
                justify="flex-start"
                direction="row"
                color={
                  isSelected
                    ? theme.colors.ui.success
                    : theme.colors.bg.elements_bg
                }
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
                color={
                  isSelected
                    ? theme.colors.ui.success
                    : theme.colors.bg.elements_bg
                }
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
                color={
                  isSelected
                    ? theme.colors.ui.success
                    : theme.colors.bg.elements_bg
                }
              >
                <Action_Container
                  width="65px"
                  onPress={() => copy_message_action(item)}
                  color={
                    isSelected
                      ? theme.colors.ui.success
                      : theme.colors.bg.elements_bg
                  }
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
          {isSelected && (
            <Container
              width="100%"
              height="30%"
              align="center"
              justify="flex-end"
              direction="row"
              color={theme.colors.ui.success}
            >
              <Container
                width="30%"
                height="65%"
                align="flex-end"
                justify="flex-end"
                direction="row"
                color={theme.colors.ui.success}
              >
                <Action_Container
                  width="100%"
                  height="100%"
                  onPress={() => uncopy_message_action(item)}
                  justify="center"
                  align="center"
                  color={theme.colors.ui.success}
                >
                  <Text variant="stages_ctas_white">Uncopy</Text>
                </Action_Container>
              </Container>
            </Container>
          )}
        </Container>
      )}
    </>
  );
};
