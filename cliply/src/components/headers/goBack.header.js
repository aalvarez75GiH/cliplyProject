import React from "react";

import ExitIcon from "../../../assets/my-icons/exit_icon.svg";
import ArrowBackIcon from "../../../assets/my-icons/arrow_back_icon.svg";
import { Text } from "../../infrastructure/typography/text.component.js";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";

export const Go_Back_Header = ({ action, label = "" }) => {
  return (
    <Container
      width="100%"
      height="8%"
      align="flex-start"
      direction="row"
      justify="center"
      color={theme.colors.bg.elements_bg}
    >
      <Action_Container
        width="20%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        onPress={action}
      >
        <ArrowBackIcon width={35} height={35} fill={"#000000"} />
      </Action_Container>
      <Container
        width="80%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="flex-end"
        style={{ paddingRight: "5%" }}
      >
        <Text variant="logo_caption">{label}</Text>
      </Container>
    </Container>
  );
};
