import React from "react";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../global_components/optimized.spacer.component";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import Main_mic_icon from "../../../assets/my-icons/micIcon.svg";

export const Mic_CTA = ({ action, recordingStatus }) => {
  const bg_color =
    recordingStatus === "idle"
      ? theme.colors.ui.success
      : recordingStatus === "listening"
      ? theme.colors.ui.error
      : theme.colors.ui.disabled;
  return (
    <Spacer position="left" size="medium">
      <Container
        width="75px"
        height="90%"
        color={
          recordingStatus === "idle"
            ? theme.colors.bg.elements_bg
            : theme.colors.bg.elements_bg
        }
      >
        <Action_Container
          width="55px"
          height="55px"
          color={bg_color}
          border_radius={"100px"}
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
          <Main_mic_icon width="35px" height="35px" fill="#FFFFFF" />
        </Action_Container>
      </Container>
    </Spacer>
  );
};
