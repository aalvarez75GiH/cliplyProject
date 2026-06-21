import React from "react";

import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";

export const Circular_Icon_CTA = ({
  action,
  Icon,
  width,
  height,
  recordingStatus,
}) => {
  console.log(recordingStatus);
  return (
    <Action_Container
      width={"20%"}
      height={"100%"}
      justify="center"
      align="center"
      color={theme.colors.bg.screens_bg}
      //color={"red"}
      onPress={action}
    >
      <Container
        width={"52%"}
        height={"67%"}
        border_radius_top_left={100}
        border_radius_top_right={100}
        border_radius_bottom_left={100}
        border_radius_bottom_right={100}
        color={
          recordingStatus === "transcribing"
            ? theme.colors.ui.disabled
            : recordingStatus === "listening"
            ? "#E93F2E"
            : theme.colors.ui.primary
        }
        direction="row"
        align="center"
        justify="center"
      >
        <Icon
          width={width}
          height={height}
          fill={
            recordingStatus === "transcribing"
              ? theme.colors.text.middle_screens_text
              : "#FFFFFF"
          }
        />
      </Container>
    </Action_Container>
  );
};
