import React from "react";
import { ActivityIndicator } from "react-native";

import { Text } from "../../infrastructure/typography/text.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Loading_Spinner_area } from "./global_loading_spinner_area.component.js";
import { Container } from "./containers/general_containers.js";
import { Spacer } from "./optimized.spacer.component.js";

export const Whole_Screen_Loading_Spinner_Component = ({ caption }) => {
  return (
    <>
      <Container
        width={"100%"}
        height={"100%"}
        justify="space-between"
        align="center"
        color={theme.colors.bg.elements_bg}
        // color={"red"}
        direction="column"
        // color={"green"}
      >
        <Container
          width={"70%"}
          height={"88%"}
          justify="center"
          align="center"
          color={theme.colors.bg.elements_bg}
          // color={"red"}
          direction="column"
        >
          <ActivityIndicator size="small" color="#000000" />
          <Spacer position="top" size="extraLarge" />

          <Text variant="dm_sans_bold_16" style={{ textAlign: "center" }}>
            {caption}
          </Text>
        </Container>
      </Container>
    </>
  );
};
