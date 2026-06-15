import React from "react";

import { Container } from "../../components/global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";

export const Operations_Status_Connector_Line = ({ side }) => {
  return side === "right" ? (
    <Container
      width="100%"
      height={"10%"}
      justify="center"
      color={theme.colors.bg.elements_bg}
      //color={"red"}
      align="center"
      direction="row"
    >
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Container
        width="1%"
        height="100%"
        color={theme.colors.ui.primary}
      ></Container>
    </Container>
  ) : (
    <Container
      width="100%"
      height={"10%"}
      justify="flex-start"
      color={theme.colors.bg.elements_bg}
      //color={"red"}
      align="center"
      direction="row"
    >
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Spacer position="left" size="extraLarge" />
      <Container
        width="1%"
        height="100%"
        color={theme.colors.ui.primary}
      ></Container>
    </Container>
  );
};
