import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../../infrastructure/typography/text.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";

export const Regular_CTA = ({
  width = "120px",
  height = "40px",
  border_width = "0px",
  caption,
  caption_variant = "underlined_small_caption_black",
  action,
  color,
}) => {
  return (
    <Action_Container
      width={width}
      height={height}
      justify="center"
      align="center"
      direction="column"
      border_radius_top_left={15}
      border_radius_top_right={15}
      border_radius_bottom_left={15}
      border_radius_bottom_right={15}
      border_width={border_width}
      border_style="solid"
      color={color}
      //   border_color={color}
      onPress={action}
      //   style={{ overflow: "hidden" }}
    >
      <Text variant={caption_variant}>{caption}</Text>
    </Action_Container>
  );
};
