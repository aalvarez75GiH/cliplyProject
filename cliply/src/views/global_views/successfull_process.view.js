import React, { useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Keyboard } from "react-native";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import SuccessIcon from "../../../assets/my-icons/success_icon.svg";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Successful_Process_View({ route }) {
  const { label, cta_label } = route.params || { label: "Let's start..." };
  const navigation = useNavigation();
  const { setEmail, setFirst_name, setLast_name } = useContext(GlobalContext);
  useFocusEffect(
    useCallback(() => {
      Keyboard.dismiss();
    }, [])
  );
  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width={"100%"}
        height={"100%"}
        align="center"
        justify="center"
        color={theme.colors.bg.elements_bg}
      >
        <Container
          width={"80%"}
          height={"92%"}
          align="center"
          justify="center"
          color={theme.colors.bg.elements_bg}
        >
          <SuccessIcon width={80} height={80} />
          <Spacer position="top" size="medium" />
          <Text variant="dm_sans_bold_20" style={{ textAlign: "center" }}>
            {label}
          </Text>
        </Container>
        <Squared_action_CTA_component
          label={cta_label || "Go Home"}
          action={() => {
            setEmail("");
            setFirst_name("");
            setLast_name("");
            navigation.popToTop();
          }}
          icon_visible={false}
          height="8%"
        />
      </Container>
    </SafeArea>
  );
}
