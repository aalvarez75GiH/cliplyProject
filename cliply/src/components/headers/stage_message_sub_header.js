import React from "react";

import ExitIcon from "../../../assets/my-icons/exit_icon.svg";
import { Text } from "../../infrastructure/typography/text.component.js";
// import {
//   ExitHeaderContainer,
//   ExitIconContainer,
//   TitleContainer,
// } from "./header.elements.js";
import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";

export const Stage_Sub_Header = ({ number, label }) => {
  return (
    <Container
      width="100%"
      height="8%"
      justify="center"
      align="center"
      color={theme.colors.ui.primary}
      direction="row"
    >
      <Container
        width={"30px"}
        height={"30px"}
        color={theme.colors.ui.secondary}
        border_radius={"15px"}
      >
        <Text variant="stages_ctas_black">{number}</Text>
      </Container>
      <Container
        width="60%"
        height="100%"
        color={theme.colors.ui.primary}
        justify="center"
        align="center"
      >
        <Text variant="stages_ctas_white">{label}</Text>
      </Container>
    </Container>
  );
};
