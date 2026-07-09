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
import { useNavigation } from "@react-navigation/native";

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
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Switch_Account_Login_View({ route }) {
  const navigation = useNavigation();
  const {
    setEmail,
    email,
    emailError,
    validatingEmail,
    setEmailError,
    isLoading,
    setIsLoading,
    globalLanguage,
    pin,
    setPin,
    loginUser,
    errorInAuthentication,
    setErrorInAuthentication,
  } = useContext(GlobalContext);
  const [customHeaderH, setCustomHeaderH] = useState(0);
  const emailInputRef = useRef(null);
  const pinInputRef = useRef(null);
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

  const [switchEmail, setSwitchEmail] = useState("");
  const [switchPin, setSwitchPin] = useState("");

  const handleLogin = async (pinToUse = switchPin) => {
    const cleanEmail = switchEmail.trim().toLowerCase();

    const emailValidated = validatingEmail(cleanEmail);

    if (!emailValidated) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (pinToUse.length !== 6) {
      setErrorInAuthentication(
        globalLanguage === "EN"
          ? "Please enter your 6-digit PIN."
          : "Ingresa tu PIN de 6 dígitos."
      );
      return;
    }

    const res = await loginUser(pinToUse, cleanEmail);

    if (res?.ok && res?.next) {
      navigation.navigate(res.next, {
        data: res.data,
        action_type: res.action_type,
      });
    }
  };

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
            {/* <View
              onLayout={(e) => setCustomHeaderH(e.nativeEvent.layout.height)}
            > */}
            <Container
              width="100%"
              height="10%"
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="flex-start"
            >
              <ExitHeader
                action={() => {
                  setEmail("");
                  setPin("");
                  navigation.goBack();
                }}
              />
            </Container>
            {/* </View> */}
            <Container
              width="100%"
              height="15%"
              // color={"lightblue"}
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="flex-start"
            >
              <Spacer position="left" size="extraLarge">
                <Text variant="dm_sans_bold_28">
                  {globalLanguage === "EN"
                    ? "Switch Account"
                    : "Cambiar de cuenta"}
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
                value={switchEmail}
                textContentType={"emailAddress"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setSwitchEmail(value);
                  setEmailError(null);
                  setErrorInAuthentication(null);
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
              <FormInput
                ref={pinInputRef}
                label={"PIN"}
                value={switchPin}
                textContentType={"oneTimeCode"}
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={(value) => {
                  const onlyNumbers = value.replace(/[^0-9]/g, "");

                  setSwitchPin(onlyNumbers);
                  setErrorInAuthentication(null);

                  if (onlyNumbers.length === 6) {
                    handleLogin(onlyNumbers);
                  }
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
              {errorInAuthentication && (
                <Text
                  variant="dm_sans_bold_12_error_cancel"
                  style={{ padding: 10, textAlign: "center" }}
                >
                  {errorInAuthentication}
                </Text>
              )}
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
            <Regular_CTA
              width="95%"
              height="10%"
              caption={globalLanguage === "EN" ? "Sign in" : "Iniciar sesión"}
              caption_variant="dm_sans_bold_16_white"
              color="#000000"
              action={() => handleLogin()}
            />
          </Container>
        </KeyboardAvoidingView>
      )}
    </SafeArea>
  );
}
