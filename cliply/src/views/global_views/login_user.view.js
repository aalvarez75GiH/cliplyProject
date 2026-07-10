import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform, InteractionManager } from "react-native";
import { KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { PinDotsInput } from "../../components/inputs/pin_dots.input.js";
import {
  Action_Container,
  Container,
} from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Not_Registered_Sign_Up_CTA } from "../../components/calls_to_action/not_registered_sign_up.cta.js";
import { Outlined_CTA } from "../../components/calls_to_action/outlined.cta.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";
import { FormInput } from "../../components/inputs/form.input.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Login_User({ route }) {
  const {
    errorInAuthentication,
    setPin,
    pin,
    loginUser,
    isLoading,
    setErrorInAuthentication,
    isUserDataLoading,
    globalLanguage,
    setGlobalLanguage,
    hasStoredEmail,
    storedEmail,
    email,
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const inputRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      let timer;

      setPin("");
      setErrorInAuthentication(null);

      const interaction = InteractionManager.runAfterInteractions(() => {
        timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 150);
      });

      return () => {
        interaction.cancel();

        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [setPin, setErrorInAuthentication])
  );

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isUserDataLoading && (
        <Whole_Screen_Loading_Spinner_Component caption="Wait! We are loading something..." />
      )}
      {!isUserDataLoading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Container
            width={"100%"}
            height={"90%"}
            justify={"flex-start"}
            align={"center"}
            color={theme.colors.bg.elements_bg}
            //color="red"
          >
            <Container
              width="100%"
              height="12%"
              justify="center"
              align="center"
              color={theme.colors.bg.elements_bg}
              //color={"red"}
              direction="row"
            >
              <Action_Container
                width={"30%"}
                height={"100%"}
                justify={"center"}
                align={"flex-start"}
                // color={theme.colors.bg.elements_bg}
                color={"transparent"}
                // color={"red"}
                onPress={() =>
                  setGlobalLanguage(globalLanguage === "EN" ? "ES" : "EN")
                }
              >
                <Spacer position="left" size="extraLarge">
                  <Text
                    variant="dm_sans_bold_16"
                    style={{ textDecorationLine: "underline" }}
                  >
                    {globalLanguage === "EN" ? "Español" : "English"}
                  </Text>
                </Spacer>
              </Action_Container>
              <Action_Container
                width="70%"
                height="100%"
                justify="center"
                align="flex-end"
                // color={theme.colors.bg.elements_bg}
                color={"transparent"}
                onPress={() => {
                  navigation.navigate("Switch_Account_Login_View", {
                    storedEmail: hasStoredEmail ? storedEmail : email,
                  });
                }}
                // color={"yellow"}
              >
                <Spacer position="right" size="extraLarge">
                  <Text
                    variant="dm_sans_bold_16"
                    style={{
                      textAlign: "center",
                      textDecorationLine: "underline",
                    }}
                  >
                    Switch account?
                  </Text>
                </Spacer>
              </Action_Container>
            </Container>
            <Container
              width="100%"
              height="40%"
              justify="flex-end"
              align="center"
              // color={"blue"}
              color={theme.colors.bg.elements_bg}
            >
              <Text variant="dm_sans_bold_40">Cliply</Text>
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="large" />
            </Container>
            <Spacer position="top" size="large" />

            <Container
              width="80%"
              height="20%"
              justify="center"
              align="center"
              color={theme.colors.bg.elements_bg}
              // color={"yellow"}
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
                  ref={inputRef}
                  length={6}
                  value={pin}
                  onChange={(newPin) => {
                    setPin(newPin); // Update the pin state

                    if (newPin === "") {
                      setErrorInAuthentication(null); // Set error when PIN is cleared
                    } else {
                      setErrorInAuthentication(null); // Clear error when PIN is not empty
                    }
                  }}
                  onFulfill={async (enteredPin) => {
                    try {
                      const loginEmail = hasStoredEmail ? storedEmail : email;

                      const res = await loginUser(enteredPin, loginEmail);

                      console.log("COMPLETE LOGIN RESULT:", res);

                      if (res?.success) {
                        setPin("");
                        setErrorInAuthentication(null);
                        return;
                      }

                      if (res?.ok && res?.next) {
                        setPin("");

                        navigation.navigate(res.next, {
                          data: res.data,
                          action_type: res.action_type,
                        });
                      }
                    } catch (error) {
                      console.error("An error occurred during login:", error);
                    }
                  }}
                  themeColor="#000000" // idle dot color (the gray you showed)
                  digitColor="#000000"
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
                {isLoading && (
                  <Container
                    width={"100%"}
                    height={"100%"}
                    justify="center"
                    align="center"
                    color={"transparent"}
                    // color={"red"}
                    direction="row"
                  >
                    <ActivityIndicator size="small" color={"#000000"} />
                  </Container>
                )}
                {!isLoading && errorInAuthentication && (
                  <Spacer position="left" size="small">
                    <Text
                      variant="dm_sans_bold_12_error_cancel"
                      style={{ padding: 10, textAlign: "center" }}
                    >
                      {errorInAuthentication}
                    </Text>
                  </Spacer>
                )}
              </Container>
            </Container>

            <Action_Container
              width="100%"
              height="40%"
              justify="center"
              align="center"
              color={theme.colors.bg.elements_bg}
              onPress={() => {
                navigation.navigate("Switch_Account_Login_View", {
                  data: null,
                  loading_area_caption:
                    globalLanguage === "EN"
                      ? "Wait, we are switching accounts..."
                      : "Espera, estamos cambiando de cuenta...",
                });
              }}
              // color={"yellow"}
            >
              <Outlined_CTA
                width={"70%"}
                height={"25%"}
                label={
                  globalLanguage === "EN"
                    ? "Forgot pin number"
                    : "Olvidé el número PIN"
                }
                border_radius="30px"
                border_width="2px"
                label_variant="dm_sans_bold_16"
                action={() =>
                  navigation.navigate("Generating_New_Automatic_Pin_View", {
                    data: null,
                    loading_area_caption: "Wait, getting a new PIN for you...",
                    // language: language,
                  })
                }
              />
              <Not_Registered_Sign_Up_CTA language={globalLanguage} />
            </Action_Container>

            <Spacer size="large" />
          </Container>
        </KeyboardAvoidingView>
      )}
    </SafeArea>
  );
}
