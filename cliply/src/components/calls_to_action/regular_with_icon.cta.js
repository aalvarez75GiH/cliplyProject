import React from "react";

import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";

export const Regular_With_Icon_CTA = ({
  width = "100%",
  height = "12%",
  action,
  label,
  color = theme.colors.ui.primary,
  text_variant = "transcripted_message_copied_caption",
  icon_visible = true,
  Icon = null,
}) => {
  return (
    <Action_Container
      width={width}
      height={height}
      justify="center"
      align="center"
      direction="row"
      color={color}
      border_radius_top_left={15}
      border_radius_top_right={15}
      border_radius_bottom_left={15}
      border_radius_bottom_right={15}
      onPress={action}
      overflow="hidden"
    >
      <Container
        width="20%"
        height="100%"
        justify="center"
        align="center"
        direction="row"
        color={color}
      />
      <Container
        width="60%"
        height="100%"
        justify="center"
        align="center"
        direction="row"
        color={color}
      >
        <Text variant={text_variant}>{label}</Text>
      </Container>
      <Container
        width="20%"
        height="100%"
        justify="center"
        align="center"
        direction="row"
        color={color}
      >
        {icon_visible && Icon}
      </Container>
    </Action_Container>
  );
};
