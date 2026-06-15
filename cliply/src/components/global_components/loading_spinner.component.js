import React from "react";
import { ActivityIndicator } from "react-native";

import { theme } from "../../infrastructure/theme";
// import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Container } from "../../components/global_components/containers/general_containers.js";

export const Loading_Spinner_Component = ({
  bg_color = "#FFFFFF",
  spinner_color = "#000000",
}) => {
  return (
    <Container
      width={"100%"}
      height={"100%"}
      justify="center"
      align="center"
      color={bg_color}
      //   color={"red"}
      direction="row"
    >
      <ActivityIndicator size="small" color={spinner_color} />
    </Container>
  );
};
