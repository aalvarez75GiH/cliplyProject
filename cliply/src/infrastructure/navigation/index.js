import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  PaperProvider,
  MD3LightTheme as DefaultPaperTheme,
} from "react-native-paper";

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
  // const { isUserDataLoading } = useContext(TextClipsContext);
  console.log("isAuthenticated at navigation:", isUserDataLoading);
  console.log("isUserDataLoading at navigation:", isUserDataLoading);
  // const isUserDataLoading = false;

  if (!authHasBeenChecked || isUserDataLoading) {
    return null; // or your splash/loading component
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={paperTheme}>
        {isAuthenticated ? (
          <AppNavigator />
        ) : (
          <Login_Register_Navigator hasStoredEmail={hasStoredEmail} />
        )}
      </PaperProvider>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <PaperProvider theme={paperTheme}>
  //       {/* {isAuthenticated ? ( */}
  //       {isAuthenticated && !isUserDataLoading ? (
  //         <AppNavigator />
  //       ) : (
  //         <Login_Register_Navigator hasStoredEmail={hasStoredEmail} />
  //       )}
  //       {/* <AppNavigator /> */}
  //     </PaperProvider>
  //   </NavigationContainer>
  // );
};
