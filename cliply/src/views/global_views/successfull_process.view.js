import React, { useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { Image } from "expo-image";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import SuccessIcon from "../../../assets/my-icons/success_icon.svg";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Successful_Process_View({ route }) {
  const { caption_1, caption_2, caption_3, email_to_show } = route.params || {
    label: "Let's start...",
  };
  const navigation = useNavigation();
  const { setEmail, setFirst_name, setLast_name, userToDB } =
    useContext(GlobalContext);
  const { email } = userToDB || {};
  console.log("EMAIL IN SUCCESSFUL PROCESS VIEW:", userToDB);
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
          // color={theme.colors.bg.elements_bg}
          color={"transparent"}
        >
          <Container
            width={"80%"}
            height={"20%"}
            align="center"
            justify="center"
            // color={theme.colors.bg.elements_bg}
            color={"transparent"}
          >
            <Image
              source={require("../../../assets/my-icons/email.png")}
              style={{ width: "90%", height: "95%" }}
            />
          </Container>
          {/* <SuccessIcon width={100} height={100} /> */}
          <Spacer position="top" size="medium" />
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            color="transparent"
          >
            <Text variant="dm_sans_bold_26" style={{ textAlign: "center" }}>
              {caption_1}
            </Text>
          </Container>
          <Container
            width={"100%"}
            height={"2%"}
            justify="center"
            align="center"
            color="transparent"
          />
          <Spacer position="top" size="small" />
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            // color="lightblue"
            color="transparent"
          >
            <Text variant="dm_sans_bold_16" style={{ textAlign: "center" }}>
              {caption_2}
            </Text>
            <Text variant="dm_sans_regular_16" style={{ textAlign: "center" }}>
              {email_to_show || email}
            </Text>
          </Container>
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            // color="lightblue"
            color="transparent"
          >
            <Text variant="dm_sans_bold_18" style={{ textAlign: "center" }}>
              {caption_3}
            </Text>
          </Container>
        </Container>
        <Regular_CTA
          width="95%"
          height="8%"
          caption="Continue"
          caption_variant="dm_sans_bold_16_white"
          color="#000000"
          action={() => {
            setEmail("");
            setFirst_name("");
            setLast_name("");
            navigation.popToTop();
          }}
        />
        <Spacer position="top" size="large" />
      </Container>
    </SafeArea>
  );
}
