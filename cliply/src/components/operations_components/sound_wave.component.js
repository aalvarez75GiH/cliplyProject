import React from "react";
import LottieView from "lottie-react-native";

import { theme } from "../../infrastructure/theme";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Container } from "../../components/global_components/containers/general_containers.js";

export const Sound_Wave_Component = ({ width = "100%" }) => {
  return (
    <>
      <Container
        width={width}
        height={"100%"}
        justify="space-between"
        align="center"
        // color={theme.colors.bg.screens_bg}
        color={"green"}
      >
        <Container
          width={"100%"}
          height={"100%"}
          justify="center"
          align="center"
          color={theme.colors.bg.screens_bg}
          //   color={"red"}
          direction="row"
        >
          <LottieView
            source={require("../../../assets/animations/Sound_Waves_B2B2B2.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
          <Spacer position="left" size="large" />
        </Container>
      </Container>
    </>
  );
};
