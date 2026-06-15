import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { SafeArea } from "../global_components/safe-area.component.js";
import { Main_mic_CTA_component } from "../calls_to_action/main_mic_cta.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

export const Type_message_process_area_1 = ({ globalLanguage }) => {
  return (
    <>
      <Container
        width={"100%"}
        height={"82%"}
        justify="space-between"
        align="center"
        color={theme.colors.bg.screens_bg}
        // color={"green"}
      >
        <Container
          width={"100%"}
          height={"88%"}
          justify="center"
          align="center"
          color={theme.colors.bg.screens_bg}
          //   color={"red"}
          direction="row"
        >
          <ActivityIndicator size="small" color="#000000" />
          <Spacer position="left" size="large" />
          <Text variant="middle_screens_caption">
            {globalLanguage === "EN" ? "Translating..." : "Traduciendo..."}
          </Text>
        </Container>
      </Container>
    </>
  );
};
