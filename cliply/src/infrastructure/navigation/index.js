import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  PaperProvider,
  MD3LightTheme as DefaultPaperTheme,
} from "react-native-paper";

import { AppNavigator } from "./app.navigator";
import { Login_Register_Navigator } from "./login_register.navigator";

import { GlobalContext } from "../services/global/global.context";
import { TextClipsContext } from "../services/home/text_clips.context";
// import { AuthenticationContext } from "../services/authentication/authentication.context";

const paperTheme = {
  ...DefaultPaperTheme,
};

export const Navigation = () => {
  const { isAuthenticated, isUserDataLoading } = useContext(GlobalContext);
  // const { isUserDataLoading } = useContext(TextClipsContext);
  console.log("isAuthenticated at navigation:", isUserDataLoading);
  console.log("isUserDataLoading at navigation:", isUserDataLoading);
  // const isUserDataLoading = false;
  return (
    <NavigationContainer>
      <PaperProvider theme={paperTheme}>
        {/* {isAuthenticated ? ( */}
        {isAuthenticated && !isUserDataLoading ? (
          <AppNavigator />
        ) : (
          <Login_Register_Navigator />
        )}
        {/* <AppNavigator /> */}
      </PaperProvider>
    </NavigationContainer>
  );
};
