import React, { useContext, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Outlined_CTA } from "../../components/calls_to_action/outlined.cta.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";
import CliplyLogo from "../../../assets/my-icons/text_messages.svg";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Welcome_To_Cliply_View({ route }) {
  const { globalLanguage, setIsAuthenticated, isLoading } =
    useContext(GlobalContext);

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <Whole_Screen_Loading_Spinner_Component caption="Wait, we are wrapping up..." />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
          color={theme.colors.bg.elements_bg}
          //color="red"
        >
          <Container
            width="100%"
            height="50%"
            justify="center"
            align="center"
            direction="row"
            //  color={"blue"}
            color={theme.colors.bg.elements_bg}
          >
            <Container
              width="85%"
              height="50%"
              justify="center"
              align="center"
              direction="column"
              //color={"blue"}
              color={theme.colors.bg.elements_bg}
            >
              <Text variant="dm_sans_bold_40">Welcome to </Text>
              <Container
                width="85%"
                height="30%"
                justify="center"
                align="center"
                direction="row"
                color={theme.colors.bg.elements_bg}
                //color={"yellow"}
              >
                <Text variant="dm_sans_bold_40">Cliply </Text>
                <CliplyLogo width={40} height={40} />
              </Container>
            </Container>
            <Spacer position="bottom" size="large" />
          </Container>

          <Container
            width="100%"
            height="30%"
            justify="center"
            align="center"
            color={theme.colors.bg.elements_bg}
            //color={"yellow"}
          >
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="large" />
            <Spacer position="bottom" size="extraLarge" />
            <Outlined_CTA
              width={"70%"}
              height={"25%"}
              label={globalLanguage === "EN" ? "Start" : "Comiénza"}
              border_radius="30px"
              border_width="2px"
              label_variant="dm_sans_bold_16"
              action={() => setIsAuthenticated(true)}
            />
          </Container>

          <Spacer size="large" />
        </Container>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}
