// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React from "react";

import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";

export const Short_EN_ES_CTA_CTA = ({ language_caption, language, action }) => {
  console.log("LANGUAGE AT EN_ES_CTA:", language);

  const isActive =
    (language === "EN" && language_caption === "English") ||
    (language === "ES" && language_caption === "Español");

  return (
    <Action_Container
      width={"40%"}
      height={"60%"}
      color={theme.colors.ui.secondary}
      onPress={action}
      //color={"lightblue"}
      border_radius={"5px"}
      direction="row"
      align="center"
      justify="center"
    >
      <Text
        variant={isActive ? "dm_sans_bold_14" : "dm_sans_regular_14"}
        style={{ textDecorationLine: "underline" }}
      >
        {language_caption}
        {/* {language === "EN" ? "English" : "Spanish"} */}
      </Text>
    </Action_Container>
  );
};
