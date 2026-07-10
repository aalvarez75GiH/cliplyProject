import React, { useState, useContext, useRef, useCallback } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  InteractionManager,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

import { Text } from "../../infrastructure/typography/text.component.js";
import { FormInput } from "../../components/inputs/form.input.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";
import { Box } from "../../components/global_components/containers/general_containers.js";
import { DataInput } from "../../components/inputs/form.input.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";

export default function Switch_Account_Login_View({ route }) {
  const navigation = useNavigation();
  const storedEmail = route?.params?.storedEmail || "";

  const {
    emailError,
    validatingEmail,
    setEmailError,
    isLoading,
    globalLanguage,
    loginUser,
    errorInAuthentication,
    setErrorInAuthentication,
  } = useContext(GlobalContext);

  const pinInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const [switchEmail, setSwitchEmail] = useState(storedEmail);
  const [switchPin, setSwitchPin] = useState("");

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        pinInputRef.current?.focus?.();
      }, 450);

      return () => clearTimeout(timer);
    }, [])
  );

  const loginStartedRef = useRef(false);

  const handleLogin = async (pinToUse = switchPin) => {
    if (loginStartedRef.current) {
      return;
    }

    const cleanEmail = switchEmail.trim().toLowerCase();

    if (!validatingEmail(cleanEmail)) {
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

    loginStartedRef.current = true;

    try {
      const res = await loginUser(pinToUse, cleanEmail);

      if (res?.ok && res?.next) {
        navigation.navigate(res.next, {
          data: res.data,
          action_type: res.action_type,
        });
      }
    } finally {
      loginStartedRef.current = false;
    }
  };

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      <Box
        flex={1}
        width="100%"
        color={theme.colors.bg.elements_bg}
        justify="flex-start"
        align="stretch"
      >
        {/* Header stays outside the keyboard-resized area */}
        <Box
          width="100%"
          height={100}
          padding_horizontal={28}
          justify="center"
          align="stretch"
          flex_shrink={0}
        >
          <ExitHeader action={() => navigation.goBack()} />
        </Box>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          keyboardVerticalOffset={0}
        >
          <Box
            flex={1}
            width="100%"
            padding_horizontal={28}
            padding_bottom={18}
            justify="flex-start"
            align="stretch"
          >
            {/* Title */}
            <Box
              width="100%"
              height={130}
              justify="center"
              align="flex-start"
              flex_shrink={0}
              // color="red"
            >
              <Spacer position="left" size="large">
                <Text variant="dm_sans_bold_28">
                  {globalLanguage === "EN"
                    ? "Switch Account"
                    : "Cambiar de cuenta"}
                </Text>
              </Spacer>
            </Box>

            {/* Inputs */}
            <Box
              width="100%"
              justify="flex-start"
              align="stretch"
              flex_shrink={0}
              color="red"
            >
              <FormInput
                label={globalLanguage === "EN" ? "Email" : "Correo electrónico"}
                value={switchEmail}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => {
                  setSwitchEmail(value);
                  setEmailError(null);
                  setErrorInAuthentication(null);
                }}
                theme={{
                  colors: {
                    primary: theme.colors.brand.primary,
                  },
                }}
                underlineColor="#dedede"
                style={{
                  height: 76,
                  width: "100%",
                }}
                right={
                  switchEmail ? (
                    <TextInput.Icon
                      icon="close-circle"
                      style={{ marginTop: 30 }}
                      size={18}
                      color="#A9B2B2"
                      onPress={() => {
                        setSwitchEmail("");
                        setEmailError(null);
                        setErrorInAuthentication(null);
                      }}
                    />
                  ) : null
                }
              />

              <FormInput
                ref={pinInputRef}
                label="PIN"
                value={switchPin}
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                maxLength={6}
                autoCapitalize="none"
                onChangeText={(value) => {
                  const onlyNumbers = value.replace(/[^0-9]/g, "");

                  setSwitchPin(onlyNumbers);
                  setErrorInAuthentication(null);

                  if (onlyNumbers.length === 6) {
                    handleLogin(onlyNumbers);
                  }
                }}
                theme={{
                  colors: {
                    primary: theme.colors.brand.primary,
                  },
                }}
                underlineColor="#dedede"
                style={{
                  height: 76,
                  width: "100%",
                }}
              />

              {errorInAuthentication && (
                <Text
                  variant="dm_sans_bold_12_error_cancel"
                  style={{
                    paddingTop: 14,
                    textAlign: "center",
                  }}
                >
                  {errorInAuthentication}
                </Text>
              )}

              {emailError && (
                <Text
                  variant="dm_sans_bold_12_error_cancel"
                  style={{
                    paddingTop: 14,
                    textAlign: "center",
                  }}
                >
                  {emailError}
                </Text>
              )}
            </Box>

            {/* Takes all remaining available space */}
            <Box flex={1} width="100%" min_height={16} flex_shrink={1} />

            {/* CTA */}
            <Box
              width="100%"
              min_height={74}
              justify="center"
              align="stretch"
              padding_bottom={Platform.OS === "ios" ? 40 : 0}
              flex_shrink={0}
            >
              <Regular_CTA
                width="100%"
                height={64}
                caption={globalLanguage === "EN" ? "Sign in" : "Iniciar sesión"}
                caption_variant="dm_sans_bold_16_white"
                color="#000000"
                action={() => handleLogin()}
              />
            </Box>
          </Box>
        </KeyboardAvoidingView>
        {isLoading && (
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            z_index={999}
            color={theme.colors.bg.elements_bg}
          >
            <Whole_Screen_Loading_Spinner_Component caption="Wait, we are signing you in..." />
          </Box>
        )}
      </Box>
    </SafeArea>
  );
}
