import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useHea,
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { FormInput } from "../../components/inputs/form.input.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { New_FormInput } from "../../components/inputs/new_form_input.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Register_User({ navigation }) {
  const [error, setError] = useState(null);

  const { first_name, setFirst_name, last_name, setLast_name, globalLanguage } =
    useContext(GlobalContext);

  // const inputRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  // const hiddenInputRef = useRef(null);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     firstNameRef.current?.focus();
  //   }, 100); // slight delay ensures focus sticks
  //   return () => clearTimeout(timer);
  // }, []);

  // const handleBlur = () => {
  //   setTimeout(() => inputRef.current?.focus(), 60);
  // };
  // const handleBlur = () => {
  //   setTimeout(() => {
  //     if (lastNameRef.current && !lastNameRef.current.isFocused()) {
  //       firstNameRef.current?.focus();
  //     }
  //   }, 60);
  // };
  // Only refocus on blur if THIS screen is currently focused

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

            {/*   <FormInput
              ref={hiddenInputRef}
              style={{ opacity: 0, height: 0 }} // keep invisible
              // autoFocus
              keyboardType="default"
            /> */}
          </Container>

          <Squared_action_CTA_component
            label="Next"
            action={() => {
              if (!first_name.length || !last_name.length) {
                setError("Please fill in first name & last name to continue");
                return;
              }
              navigation.navigate("Register_User_View_2");
            }}
            icon_visible={false}
            height="12%"
          />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
        </Container>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}
