import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../infrastructure/theme/index";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers";
import { Short_EN_ES_CTA_CTA } from "../../calls_to_action/short_ES_EN.cta";

import CopyPaste_icon from "../../../../assets/my-icons/copy_paste.svg";
import RemoveIcon from "../../../../assets/my-icons/remove_icon.svg";
import LanguageIcon from "../../../../assets/my-icons/language_icon.svg";

export const Footer_1 = ({
  item,
  isSelected,
  language,
  toggleLanguage,
  copy_message_action,
  specificTextClipData,
  setSpecificTextClipData,
}) => {
  const navigation = useNavigation();
  return (
    <Container
      width={Platform.OS === "ios" ? "410px" : "100%"}
      height="30%"
      align="center"
      justify="center"
      direction="row"
      color={
        isSelected ? theme.colors.bg.elements_bg : theme.colors.bg.elements_bg
      }
    >
      <Container
        width="50%"
        height="75%"
        align="center"
        justify="center"
        direction="row"
        color={theme.colors.bg.elements_bg}
        //color="yellow"
        style={{
          paddingLeft: 20,
        }}
      >
        <LanguageIcon width="20px" height="20px" fill={"#000000"} />
        <Short_EN_ES_CTA_CTA
          language_caption={"English"}
          language={language}
          // language={language === "EN" ? "ES" : "EN"}
          action={() => toggleLanguage("English")}
        />
        <Container width="1%" height="55%" color="grey" />
        <Short_EN_ES_CTA_CTA
          language_caption={"Español"}
          language={language}
          // language={language === "EN" ? "ES" : "EN"}
          action={() => toggleLanguage("Spanish")}
        />
      </Container>

      <Container
        width="20%"
        height="65%"
        align="center"
        justify="center"
        direction="column"
        color={theme.colors.bg.elements_bg}
      >
        {/* <Text variant="underlined_small_caption">Delete</Text> */}
      </Container>
      <Container
        width="33%"
        // height="65%"
        align="center"
        justify="center"
        direction="row"
        color={theme.colors.bg.elements_bg}
        //color={"red"}
      >
        <Action_Container
          width="30%"
          // height="100%"
          align="center"
          justify="center"
          direction="column"
          color={theme.colors.bg.elements_bg}
          //color={"lightgreen"}

          onPress={() => {
            const updatedSpecificTextClipData = {
              ...specificTextClipData,
              message_id: item.message_id,
            };
            setSpecificTextClipData(updatedSpecificTextClipData);
            navigation.navigate("Delete_Overlay_View", {
              dataNeededToDeleteTextClip: updatedSpecificTextClipData,
              item_to_delete_label: "Message",
              coming_from: "Stored_Message_Tile",
            });
          }}
        >
          <RemoveIcon width="20px" height="20px" color={"#000000"} />
          {/* <Text variant="underlined_small_caption">Delete</Text> */}
        </Action_Container>
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
  );
};
