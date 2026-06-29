import React from "react";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../infrastructure/theme/index";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers.js";
import { Text } from "../../../infrastructure/typography/text.component.js";
// import { EN_ES_CTA_component } from "../../../components/calls_to_action/en_es.cta.js";
import { Short_EN_ES_CTA_CTA } from "../../calls_to_action/short_ES_EN.cta.js";

import CopyPaste_icon from "../../../../assets/my-icons/copy_paste.svg";
import LanguageIcon from "../../../../assets/my-icons/language_icon.svg";
import RemoveIcon from "../../../../assets/my-icons/remove_icon.svg";

export const Footer_1 = ({
  language,
  toggleLanguage,
  copy_message_action,
  updatedSpecificTextClipData,
  globalLanguage,
  routes_names_to_hide_delete_option,
  route_name,
}) => {
  const navigation = useNavigation();

  return (
    <Container
      width="100%"
      height="30%"
      align="center"
      justify="center"
      direction="row"
      color={theme.colors.bg.elements_bg}
    >
      <Container
        width="50%"
        height="75%"
        align="center"
        justify="center"
        direction="row"
        color={theme.colors.bg.elements_bg}
        style={{
          paddingLeft: 20,
        }}
        // color={"red"}
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

      {!routes_names_to_hide_delete_option.includes(route_name) && (
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
        <Container
          width="30%"
          align="center"
          justify="center"
          direction="column"
          color={theme.colors.bg.elements_bg}
        >
          {/* <RemoveIcon width="20px" height="20px" color={"#000000"} /> */}
        </Container>
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
  );
};
