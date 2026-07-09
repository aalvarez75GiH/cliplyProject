import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { FormInput } from "../../components/inputs/form.input.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Register_User({ navigation }) {
  const [error, setError] = useState(null);

  const { first_name, setFirst_name, last_name, setLast_name, globalLanguage } =
    useContext(GlobalContext);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const isFocused = useIsFocused();

  // Focus when screen becomes active; blur both when it loses focus
  useFocusEffect(
    useCallback(() => {
      const t = setTimeout(() => firstNameRef.current?.focus(), 120);
      return () => {
        clearTimeout(t);
        firstNameRef.current?.blur?.();
        lastNameRef.current?.blur?.();
      };
    }, [])
  );
  const handleBlur = useCallback(() => {
    if (!isFocused) return; // leaving → don't steal focus from next screen
    setTimeout(() => {
      if (!lastNameRef.current?.isFocused()) {
        firstNameRef.current?.focus();
      }
    }, 60);
  }, [isFocused]);

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container
          width={"100%"}
          height={"100%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          color={theme.colors.bg.elements_bg}
        >
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <ExitHeader
            action={() => {
              setFirst_name("");
              setLast_name("");
              setError(null);
              navigation.goBack();
            }}
          />
          <Container
            width="100%"
            height="12%"
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
            height="65%"
            color={theme.colors.bg.elements_bg}
            justify="flex-start"
            align="center"
          >
            <Container
              width="100%"
              height="10%"
              justify="flex-start"
              align="center"
              color={theme.colors.bg.elements_bg}
            />

            <FormInput
              ref={firstNameRef}
              label={globalLanguage === "EN" ? "First name" : "Nombre"}
              value={first_name}
              textContentType={"words"}
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(value) => {
                setFirst_name(value);
              }}
              theme={{ colors: { primary: theme.colors.brand.primary } }}
              underlineColor={"#dedede"}
              onFocus={() => setError(null)}
              style={{
                width: "95%",
                height: 80,
              }}
              onBlur={handleBlur}
            />
            <FormInput
              ref={lastNameRef}
              label={globalLanguage === "EN" ? "Last name" : "Apellido"}
              value={last_name}
              textContentType={"words"}
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(value) => {
                setLast_name(value);
              }}
              theme={{ colors: { primary: theme.colors.brand.primary } }}
              underlineColor={"#dedede"}
              onFocus={() => setError(null)}
              style={{
                width: "95%",
                height: 80,
              }}
              onBlur={handleBlur}
            />

            <Container
              color={theme.colors.bg.elements_bg}
              width="100%"
              height="5%"
              justify="flex-start"
              align="center"
            />
            {error && (
              <Container
                width="100%"
                height="20%"
                justify="center"
                align="flex-start"
                color={theme.colors.bg.elements_bg}
              >
                <Spacer position="left" size="small">
                  <Text
                    variant="dm_sans_bold_12_error_cancel"
                    style={{ padding: 10, textAlign: "center" }}
                  >
                    {error}
                  </Text>
                </Spacer>
              </Container>
            )}
          </Container>
          <Container
            width="100%"
            height="12%"
            justify="flex-start"
            align="center"
            color={theme.colors.bg.elements_bg}
          >
            <Regular_CTA
              width="95%"
              height="80%"
              caption="Next"
              caption_variant="dm_sans_bold_16_white"
              color="#000000"
              action={() => {
                if (!first_name.length || !last_name.length) {
                  setError("Please fill in first name & last name to continue");
                  return;
                }
                navigation.navigate("Register_User_View_2");
              }}
            />
          </Container>
          <Spacer position="bottom" size="large" />
        </Container>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}
