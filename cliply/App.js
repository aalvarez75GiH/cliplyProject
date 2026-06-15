import React from "react";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { VoiceRecentClipsContextProvider } from "./src/infrastructure/services/voice_recents/voice_recent.context";
import { TextClipsContextProvider } from "./src/infrastructure/services/home/text_clips.context";
import { Type_Message_ContextProvider } from "./src/infrastructure/services/type_message/type_message.context";
import { GlobalContextProvider } from "./src/infrastructure/services/global/global.context";
// ***************************************************

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

// ***************************************************

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalContextProvider>
          <TextClipsContextProvider>
            <VoiceRecentClipsContextProvider>
              <Type_Message_ContextProvider>
                <Navigation />
              </Type_Message_ContextProvider>
            </VoiceRecentClipsContextProvider>
          </TextClipsContextProvider>
        </GlobalContextProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
