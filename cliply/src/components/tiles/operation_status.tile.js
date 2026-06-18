import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../infrastructure/theme/index";
import { Container } from "../global_components/containers/general_containers";
import { Spacer } from "../global_components/optimized.spacer.component.js";
import { Circular_Step_Indicator } from "../global_components/small_circular_step_indicator.component.js";
import { Operation_Status_CTA } from "../calls_to_action/operation_status.cta.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { Platform } from "react-native";

export const Operations_Status_Tile = ({
  caption_1,
  caption_2,
  image_source_1,
  inverted,
  action,
  step_number,
}) => {
  const { operation } = useContext(TextClipsContext);
  const navigation = useNavigation();
  return (
    <>
      <Container
        width={"100%"}
        height={Platform.OS === "ios" ? "30%" : "20%"}
        justify="flex-start"
        color={theme.colors.bg.elements_bg}
        align="center"
        direction="row"
      >
        <Operation_Status_CTA
          caption_1={caption_1}
          caption_2={caption_2}
          action={action}
          inverted={inverted}
          image_source={image_source_1}
          step_number={step_number}
          operation={operation}
        />
      </Container>
    </>
  );
};
