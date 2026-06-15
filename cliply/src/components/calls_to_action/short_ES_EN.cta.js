// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React from "react";

import { Text } from "../../infrastructure/typography/text.component";

import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";

export const Short_EN_ES_CTA_CTA = ({ language, action, isSelected }) => {
  console.log("LANGUAGE AT EN_ES_CTA:", language);
  return (
    <Action_Container
      width={"55%"}
      height={"100%"}
      justify="center"
      align="center"
      color={isSelected ? theme.colors.ui.success : theme.colors.bg.elements_bg}
      onPress={action}
    >
      <Container
        width={"90%"}
        height={"60%"}
        color={theme.colors.ui.secondary}
        border_radius={"5px"}
        direction="row"
        align="center"
        justify="center"
      >
        <Text
          variant="dm_sans_bold_14"
          style={{ textDecorationLine: "underline" }}
        >
          {language === "EN" ? "EN" : "ES"}
        </Text>
      </Container>
    </Action_Container>
  );
};
