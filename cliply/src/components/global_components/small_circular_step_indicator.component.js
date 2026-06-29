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
      border_radius_top_left={"60px"}
      border_radius_top_right={"60px"}
      border_radius_bottom_left={"60px"}
      border_radius_bottom_right={"60px"}
    >
      <Text variant="dm_sans_bold_16_white" color="#FFFFFF">
        {caption}
      </Text>
    </Container>
  );
};
