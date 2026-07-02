import React from "react";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../global_components/optimized.spacer.component";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import Main_mic_icon from "../../../assets/my-icons/micIcon.svg";

export const Mic_CTA = ({
  action,
  recordingStatus,
  width = "55px",
  height = "55px",
  icon_width = "35px",
  icon_height = "35px",
}) => {
  const bg_color =
    recordingStatus === "idle"
      ? theme.colors.ui.success
      : recordingStatus === "listening"
      ? theme.colors.ui.error
      : theme.colors.ui.disabled;
  return (
    <Spacer position="left" size="medium">
      <Container width="75px" height="90%" color={theme.colors.bg.elements_bg}>
        <Action_Container
          width={width}
          height={height}
          color={bg_color}
          border_radius_top_left={100}
          border_radius_top_right={100}
          border_radius_bottom_left={100}
          border_radius_bottom_right={100}
          onPress={action}
          style={{
            shadowColor: "#000", // iOS shadow color
            shadowOffset: { width: 2, height: 2 }, // iOS shadow offset
            shadowOpacity: 0.25, // iOS shadow opacity
            shadowRadius: 3.84, // iOS shadow radius
            elevation: 5, // Android shadow
          }}
        >
          <Main_mic_icon
            width={icon_width}
            height={icon_height}
            fill="#FFFFFF"
          />
        </Action_Container>
      </Container>
    </Spacer>
  );
};
