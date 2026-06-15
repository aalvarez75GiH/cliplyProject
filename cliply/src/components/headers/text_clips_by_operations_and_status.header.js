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

export const Text_Clips_By_Status_Sub_Header = ({ caption }) => {
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
        width="60%"
        height="100%"
        color={theme.colors.ui.primary}
        justify="center"
        align="center"
      >
        <Text variant="stages_ctas_white">{caption}</Text>
      </Container>
    </Container>
  );
};
