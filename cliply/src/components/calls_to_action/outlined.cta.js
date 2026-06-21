import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../infrastructure/typography/text.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";

export const Outlined_CTA = ({
  width = "120px",
  height = "40px",
  border_radius = "30px",
  border_width = "1px",
  label,
  label_variant = "underlined_small_caption_black",
  action,
}) => {
  return (
    <Action_Container
      width={width}
      height={height}
      justify="center"
      align="center"
      color={theme.colors.bg.elements_bg}
      border_radius_top_left={10}
      border_radius_top_right={10}
      border_radius_bottom_left={10}
      border_radius_bottom_right={10}
      border_width={border_width}
      border_style="solid"
      border_color={theme.colors.ui.primary}
      onPress={action}
      style={{ overflow: "hidden" }}
    >
      <Text variant={label_variant}>{label}</Text>
    </Action_Container>
  );
};
