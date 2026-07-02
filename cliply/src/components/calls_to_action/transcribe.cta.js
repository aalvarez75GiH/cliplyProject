import React from "react";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../global_components/optimized.spacer.component";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import Main_mic_icon from "../../../assets/my-icons/micIcon.svg";
import RightArrow from "../../../assets/my-icons/arrow_next_icon.svg";

export const Transcribe_CTA = ({
  action,
  recordingStatus,
  width = "75px",
  height = "75px",
  icon_width = "55px",
  icon_height = "55px",
}) => {
  const bg_color =
    recordingStatus === "listening"
      ? theme.colors.ui.primary
      : theme.colors.ui.disabled;
  return (
    <Spacer position="left" size="medium">
      <Container
        width={"75px"}
        height={"75px"}
        color={theme.colors.bg.elements_bg}
        // color={"black"}
      >
        <Spacer position="top" size="small" />
        <Action_Container
          width={width}
          height={height}
          color={bg_color}
          border_radius_top_left={100}
          border_radius_top_right={100}
          border_radius_bottom_left={100}
          border_radius_bottom_right={100}
          onPress={action}
        >
          <RightArrow
            width={icon_width}
            height={icon_height}
            fill={"#FFFFFF"}
          />
        </Action_Container>
      </Container>
    </Spacer>
  );
};
