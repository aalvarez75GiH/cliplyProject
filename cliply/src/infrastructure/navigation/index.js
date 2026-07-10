import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  PaperProvider,
  MD3LightTheme as DefaultPaperTheme,
} from "react-native-paper";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { Container } from "../../components/global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component.js";
import { theme } from "../theme/index.js";

import { AppNavigator } from "./app.navigator";
import { Login_Register_Navigator } from "./login_register.navigator";

import { GlobalContext } from "../services/global/global.context";

const paperTheme = {
  ...DefaultPaperTheme,
};

export const Navigation = () => {
  const {
    isAuthenticated,
    isUserDataLoading,
    hasStoredEmail,
    authHasBeenChecked,
  } = useContext(GlobalContext);

  useEffect(() => {
    console.log("NAVIGATION STATE:", {
      isAuthenticated,
      isUserDataLoading,
      authHasBeenChecked,
      hasStoredEmail,
    });
  }, [isAuthenticated, isUserDataLoading, authHasBeenChecked, hasStoredEmail]);

  if (!authHasBeenChecked || isUserDataLoading) {
    return (
      <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
        <Container
          width="100%"
          height="100%"
          justify="center"
          align="center"
          color={theme.colors.bg.elements_bg}
        >
          <Text variant="dm_sans_bold_18">Checking auth...</Text>
        </Container>
      </SafeArea>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        {isAuthenticated ? (
          <AppNavigator />
        ) : (
          <Login_Register_Navigator hasStoredEmail={hasStoredEmail} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};
