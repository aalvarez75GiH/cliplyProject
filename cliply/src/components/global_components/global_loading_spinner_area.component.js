import React from "react";
import { ActivityIndicator } from "react-native";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Container } from "../../components/global_components/containers/general_containers.js";

export const Loading_Spinner_area = ({
  color = theme.colors.bg.screens_bg,
  width = "100%",
  height = "100%",
}) => {
  return (
    <>
      <Container
        width={width}
        height={height}
        justify="space-between"
        align="center"
        // color={theme.colors.bg.screens_bg}
        color={color}
      >
        <Container
          width={"100%"}
          height={"100%"}
          justify="center"
          align="center"
          color={color}
          //   color={"red"}
          direction="row"
        >
          <ActivityIndicator size="small" color="#000000" />
          <Spacer position="left" size="large" />
        </Container>
      </Container>
    </>
  );
};
