import React from "react";

import { theme } from "../../infrastructure/theme/index";
import { Container } from "../global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component";

export const Circular_Step_Indicator = ({ width, height, caption, color }) => {
  return (
    <Container
      width={width}
      height={height}
      //   color={theme.colors.ui.primary}
      color={color || theme.colors.bg.screens_bg}
      border_radius={"60px"}
      direction="row"
      align="center"
      justify="center"
    >
      <Text variant="dm_sans_bold_16_white" color="#FFFFFF">
        {caption}
      </Text>
    </Container>
  );
};
