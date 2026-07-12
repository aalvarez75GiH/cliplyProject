import React, { useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { Image } from "expo-image";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Successful_Process_View({ route }) {
  const { caption_1, caption_2, caption_3, email_to_show, flowType } =
    route.params || {};

  const navigation = useNavigation();
  const isContinuingRef = useRef(false);

  const {
    setEmail,
    setFirst_name,
    setLast_name,
    setPin,
    setNew_pin,
    setIsLoading,
    setErrorInAuthentication,
    setErrorInUpdatingPIN,
    requireLoginAfterPinChange,
    userToDB,
  } = useContext(GlobalContext);

  const { email } = userToDB || {};

  console.log("SUCCESSFUL VIEW FLOW TYPE:", flowType);
  console.log("USER IN SUCCESSFUL PROCESS VIEW:", userToDB);

  useFocusEffect(
    useCallback(() => {
      Keyboard.dismiss();
    }, [])
  );

  const handleContinue = async () => {
    if (isContinuingRef.current) {
      return;
    }

    isContinuingRef.current = true;

    try {
      Keyboard.dismiss();

      setPin("");
      setNew_pin("");
      setIsLoading(false);
      setErrorInAuthentication(null);
      setErrorInUpdatingPIN(null);

      setEmail("");
      setFirst_name("");
      setLast_name("");

      if (flowType === "pin_change") {
        console.log("CONTINUING FROM PIN CHANGE");

        await requireLoginAfterPinChange();

        // Do not manually navigate.
        // isAuthenticated true -> false changes the root navigator.
        return;
      }

      if (flowType === "register") {
        console.log("CONTINUING FROM REGISTRATION");

        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Login_user_View",
            },
          ],
        });

        return;
      }

      console.warn("Successful_View received an unknown flowType:", flowType);

      // Safe fallback because this screen is normally in the auth stack
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login_user_View",
          },
        ],
      });
    } catch (error) {
      console.error("Error leaving Successful_View:", error);

      isContinuingRef.current = false;
    }
  };

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height="100%"
        align="center"
        justify="center"
        color={theme.colors.bg.elements_bg}
      >
        <Container
          width="80%"
          height="92%"
          align="center"
          justify="center"
          color="transparent"
        >
          <Container
            width="80%"
            height="20%"
            align="center"
            justify="center"
            color="transparent"
          >
            <Image
              source={require("../../../assets/my-icons/email.png")}
              style={{
                width: "90%",
                height: "95%",
              }}
            />
          </Container>

          <Spacer position="top" size="medium" />

          <Container
            width="100%"
            height="10%"
            justify="center"
            align="center"
            color="transparent"
          >
            <Text variant="dm_sans_bold_26" style={{ textAlign: "center" }}>
              {caption_1}
            </Text>
          </Container>

          <Container width="100%" height="2%" color="transparent" />

          <Spacer position="top" size="small" />

          <Container
            width="100%"
            height="10%"
            justify="center"
            align="center"
            color="transparent"
          >
            <Text variant="dm_sans_bold_16" style={{ textAlign: "center" }}>
              {caption_2}
            </Text>

            <Text variant="dm_sans_regular_16" style={{ textAlign: "center" }}>
              {email_to_show || email || ""}
            </Text>
          </Container>

          <Container
            width="100%"
            height="10%"
            justify="center"
            align="center"
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
          action={handleContinue}
        />

        <Spacer position="top" size="large" />
      </Container>
    </SafeArea>
  );
}
