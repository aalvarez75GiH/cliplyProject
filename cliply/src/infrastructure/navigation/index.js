import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { Login_Register_Navigator } from "./login_register.navigator";

import { GlobalContext } from "../services/global/global.context";
import { TextClipsContext } from "../services/home/text_clips.context";
// import { AuthenticationContext } from "../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticated, isUserDataLoading } = useContext(GlobalContext);
  // const { isUserDataLoading } = useContext(TextClipsContext);
  console.log("isAuthenticated at navigation:", isUserDataLoading);
  console.log("isUserDataLoading at navigation:", isUserDataLoading);
  // const isUserDataLoading = false;
  return (
    <NavigationContainer>
      {/* {isAuthenticated ? ( */}
      {isAuthenticated && !isUserDataLoading ? (
        <AppNavigator />
      ) : (
        <Login_Register_Navigator />
      )}
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};
