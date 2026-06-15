import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Platform,
  KeyboardAvoidingView,
  InteractionManager,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { FormInput } from "../../components/inputs/form.input.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Register_User_View_2({ navigation, route }) {
  const {
    setEmail,
    email,
    emailError,
    validatingEmail,
    setEmailError,
    registerUser,
    isLoading,
    setIsLoading,
    globalLanguage,
  } = useContext(GlobalContext);
  const [customHeaderH, setCustomHeaderH] = useState(0);
  const emailInputRef = useRef(null);
  const hiddenInputRef = useRef(null);
  const headerHeight = useHeaderHeight();
  const keyboardVerticalOffset = Platform.OS === "ios" ? headerHeight : 0;
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      const t = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          if (!cancelled) emailInputRef.current?.focus();
        });
      }, 100); // 80–150ms is a good window
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }, [])
  );

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <Whole_Screen_Loading_Spinner_Component caption="Wait, We are signing you up..." />
      )}

      {!isLoading && (
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          // style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {/* <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={590}> */}
          <Container
            width={"100%"}
            height={"100%"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            color={theme.colors.bg.elements_bg}
            //   color="red"
          >
            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
            <View
              onLayout={(e) => setCustomHeaderH(e.nativeEvent.layout.height)}
            >
              <ExitHeader
                action={() => {
                  setEmail("");
                  navigation.goBack();
                }}
              />
            </View>
            <Container
              width="100%"
              height="15%"
              // color={"lightblue"}
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="center"
            >
              <Spacer position="left" size="large">
                <Text variant="dm_sans_bold_28">
                  {globalLanguage === "EN" ? "Sign Up" : "Regístro"}
                </Text>
              </Spacer>
            </Container>
            <Container
              width="100%"
              height="55%"
              //color={"lightyellow"}
              color={theme.colors.bg.elements_bg}
              justify="flex-start"
              align="center"
            >
              <Container
                //color={theme.colors.bg.elements_bg}
                width="100%"
                height="15%"
                //   color={"brown"}
                color={theme.colors.bg.elements_bg}
                justify="flex-start"
                align="center"
              />
              <Spacer size="large" />

              <FormInput
                ref={emailInputRef}
                label={globalLanguage === "EN" ? "Email" : "Correo eléctronico"}
                value={email}
                textContentType={"emailAddress"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setEmailError(null);
                  setEmail(value);
                }}
                // theme={{ colors: { primary: "#6200ee" } }}
                theme={{ colors: { primary: theme.colors.brand.primary } }}
                underlineColor={"#dedede"}
                onFocus={() => {
                  if (emailError) {
                    setEmailError(null);
                  }
                }}
                style={{
                  height: 80,
                  width: "90%",
                }}
              />
              {emailError && (
                <Container
                  width="100%"
                  height="20%"
                  justify="center"
                  align="flex-start"
                  color={theme.colors.bg.elements_bg}
                >
                  <Spacer position="left" size="medium">
                    <Spacer position="left" size="large">
                      <Text
                        variant="dm_sans_bold_12_error_cancel"
                        style={{ padding: 10, textAlign: "center" }}
                      >
                        {emailError}
                      </Text>
                    </Spacer>
                  </Spacer>
                </Container>
              )}
              <FormInput
                ref={hiddenInputRef}
                style={{ opacity: 0, height: 0 }} // keep invisible
                keyboardType="default"
              />
            </Container>

            <Squared_action_CTA_component
              label="Register"
              action={async () => {
                const emailValidated = validatingEmail(email);
                console.log("EMAIL_VALIDATED:", emailValidated);

                if (!emailValidated) {
                  setEmailError("Please enter a valid email.");
                  return; // Exit early if email is invalid
                }

                try {
                  const res = await registerUser();
                  if (res?.ok) {
                    setIsLoading(false);
                    navigation.navigate("Successful_View", {
                      label: "Registration done!",
                      cta_label: "Go to Login",
                    });
                  } else {
                    // Handle case where email already exists
                    setEmailError("Email already exists");
                  }
                } catch (error) {
                  console.log("REGISTER_USER_ERROR:", error);
                  setEmailError("An error occurred. Please try again.");
                }
              }}
              icon_visible={false}
              height="12%"
            />
          </Container>
        </KeyboardAvoidingView>
      )}
    </SafeArea>
  );
}
