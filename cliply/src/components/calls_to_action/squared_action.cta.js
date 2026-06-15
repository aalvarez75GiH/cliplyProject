import React from "react";

import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import Arrow_next_icon from "../../../assets/my-icons/arrow_next_icon.svg";
import { Spacer } from "../global_components/optimized.spacer.component";

export const Squared_action_CTA_component = ({
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
      // color={theme.colors.bg.screens_bg}
      color={color}
      // onPress={() => setRecordingStatus("idle")}
      onPress={action}
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
        // color="green"
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
        //color="blue"
      >
        {icon_visible && Icon}
      </Container>
    </Action_Container>
  );
};
