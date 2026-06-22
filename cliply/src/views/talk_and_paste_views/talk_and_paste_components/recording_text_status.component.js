import React from "react";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../global_components/optimized.spacer.component";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import Main_mic_icon from "../../../assets/my-icons/micIcon.svg";
import RightArrow from "../../../assets/my-icons/arrow_next_icon.svg";

export const Recording_Text_Status = ({ caption_1, caption_2 = "" }) => {
  const bg_color =
    recordingStatus === "listening"
      ? theme.colors.ui.primary
      : theme.colors.ui.disabled;
  return (
    <Container
      width="70%"
      height="90%"
      color={theme.colors.bg.screens_bg}
      //color={"blue"}
      direction="column"
      align="flex-start"
      justify="center"
    >
      <Spacer position="top" size="medium" />
      <Spacer position="left" size="large">
        <Text variant="dm_sans_bold_18">{caption_1}</Text>
      </Spacer>
      <Spacer position="top" size="small" />
      <Spacer position="left" size="large">
        <Text
          variant="dm_sans_bold_14_disable_not_active"
          style={{ lineHeight: 18 }}
        >
          {caption_2}
        </Text>
      </Spacer>
    </Container>
  );
};
