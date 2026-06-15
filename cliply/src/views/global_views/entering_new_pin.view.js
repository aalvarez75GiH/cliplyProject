import React, { useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  KeyboardAvoidingView,
  Keyboard,
  InteractionManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { PinDotsInput } from "../../components/inputs/pin_dots.input.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Entering_New_PIN_View({ route }) {
  const {
    isLoading,
    updatingPINOnDemandAndUpdatingUserAtFB,
    new_pin,
    setNew_pin,
    errorInUpdatingPIN,
    setErrorInUpdatingPIN,
    setIsLoading,
    globalLanguage,
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const [loadedCTA, setLoadedCTA] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  useEffect(() => {
    if (!isNavigating) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isNavigating]);
  console.log("ERROR UPDATING PING IS: ", errorInUpdatingPIN);
  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <>
          <Container
            width={"100%"}
            height={"40%"}
            justify="center"
            align="center"
            color={theme.colors.bg.elements_bg}
          />
          <Loading_Spinner_area
            color={theme.colors.bg.elements_bg}
            height="10%"
          />
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            // color="red"
            color={theme.colors.bg.elements_bg}
          >
            <Text variant="dm_sans_bold_18">
              {globalLanguage === "EN"
                ? "Wait, we are updating"
                : "Espera, actualizando"}
            </Text>
            <Spacer position="bottom" size="small" />
            <Text variant="dm_sans_bold_18">
              {globalLanguage === "EN" ? "your Pin number..." : "tu número PIN"}
            </Text>
          </Container>
        </>
      )}
      {!isLoading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Container
            width={"100%"}
            height={"100%"}
            justify={"flex-start"}
            align={"center"}
            color={theme.colors.bg.elements_bg}
            // color="red"
          >
            <ExitHeader
              action={() => {
                setIsLoading(false);
                navigation.goBack();
              }}
            />
            <Container
              width="100%"
              //   height="40%"
              height={loadedCTA ? "20%" : "40%"}
              justify="flex-end"
              align="center"
              //   color={"blue"}
              color={theme.colors.bg.elements_bg}
            >
              <Text variant="dm_sans_bold_28">
                {globalLanguage === "EN"
                  ? "Enter your new PIN"
                  : "Ingresa tu nuevo PIN"}
              </Text>
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="large" />
            </Container>

            <Container
              width="80%"
              height="20%"
              justify="center"
              align="center"
              color={theme.colors.bg.elements_bg}
              //   color={"red"}
            >
              <Container
                width="100%"
                height="50%"
                justify="center"
                align="center"
                color={theme.colors.bg.elements_bg}
                //color={"green"}
              >
                <PinDotsInput
                  length={6}
                  value={new_pin}
                  onChange={(newPin) => {
                    setNew_pin(newPin); // Update the pin state
                    if (newPin === "") {
                      inputRef.current?.focus();
                      setLoadedCTA(false); // Enable the CTA button
                      setErrorInUpdatingPIN(null); // Set error when PIN is cleared
                    } else {
                      setErrorInUpdatingPIN(null); // Clear error when PIN is not empty
                    }
                  }}
                  onFulfill={() => {
                    Keyboard.dismiss(); // Dismiss the keyboard when PIN is fulfilled
                    setLoadedCTA(true); // Enable the CTA button
                  }}
                  blurOnSubmit={true} // Ensure the input loses focus after submission
                  themeColor={theme.colors.ui.primary} // idle dot color (the gray you showed)
                  digitColor={theme.colors.ui.primary}
                  size={18}
                />
              </Container>
              <Container
                width="100%"
                height="50%"
                justify="center"
                align="center"
                color={theme.colors.bg.elements_bg}
                //color={"lightblue"}
              >
                {!isLoading && errorInUpdatingPIN && (
                  <Spacer position="left" size="small">
                    <Text
                      variant="dm_sans_bold_12_error_cancel"
                      style={{ padding: 10, textAlign: "center" }}
                    >
                      {errorInUpdatingPIN}
                    </Text>
                  </Spacer>
                )}
              </Container>
            </Container>

            <Container
              width="100%"
              //   height="40%"
              height={loadedCTA ? "52%" : "40%"}
              justify="flex-end"
              align="center"
              color={theme.colors.bg.elements_bg}
              //   color={"yellow"}
            >
              {loadedCTA && (
                <Squared_action_CTA_component
                  label="Update PIN"
                  action={async () => {
                    console.log("NEW PIN AT ON CTA:", new_pin);
                    try {
                      const res = await updatingPINOnDemandAndUpdatingUserAtFB(
                        new_pin
                      );

                      if (res.success) {
                        setIsNavigating(true);
                        Keyboard.dismiss();
                        await new Promise((r) => requestAnimationFrame(r));
                        await InteractionManager.runAfterInteractions();
                        navigation.navigate("Successful_View", {
                          label:
                            globalLanguage === "EN"
                              ? "PIN updated Successfully..."
                              : "PIN actualizado con éxito...",
                          cta_label:
                            globalLanguage === "EN"
                              ? "Go to Home"
                              : "Ir a Inicio",
                        });
                      } else {
                        isProcessing = false; // Reset the flag if not successful
                      }
                    } catch (error) {
                      console.error(
                        "An error occurred during updating pin:",
                        error
                      );
                    }
                  }}
                  icon_visible={false}
                  height="15%"
                />
              )}
            </Container>
            <Spacer size="large" />
          </Container>
        </KeyboardAvoidingView>
      )}
    </SafeArea>
  );
}
