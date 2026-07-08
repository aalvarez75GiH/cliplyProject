import React, { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PaperProvider,
  MD3LightTheme as DefaultPaperTheme,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";

import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { VoiceRecentClipsContextProvider } from "./src/infrastructure/services/voice_recents/voice_recent.context";
import { TextClipsContextProvider } from "./src/infrastructure/services/home/text_clips.context";
import { Type_Message_ContextProvider } from "./src/infrastructure/services/type_message/type_message.context";
import { GlobalContextProvider } from "./src/infrastructure/services/global/global.context";
import { TalkAndPasteContextProvider } from "./src/infrastructure/services/talk_and_paste/talk_and_paste.context";
// ***************************************************

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

// ***************************************************

export default function App() {
  // useEffect(() => {
  //   const resetStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       await SecureStore.deleteItemAsync("user_pin");

  //       console.log("🧹 Fresh install reset complete");
  //     } catch (error) {
  //       console.log("❌ Error clearing storage:", error);
  //     }
  //   };

  //   resetStorage();
  // }, []);

  useEffect(() => {
    const logAsyncStorageKeys = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log("📦 AsyncStorage KEYS:", JSON.stringify(keys, null, 2));
        const entries = await AsyncStorage.multiGet(keys);
        entries.forEach(([key, value]) => {
          console.log(`🧩 ${key}:`, JSON.stringify(value, null, 2));
        });
      } catch (e) {
        console.log("❌ Error reading AsyncStorage keys:", e);
      }
    };

    logAsyncStorageKeys();
  }, []);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  const paperTheme = {
    ...DefaultPaperTheme,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: theme.colors.ui.primary,
      onSurface: theme.colors.text.primary,
      onSurfaceVariant: theme.colors.text.secondary,
      background: "#ffffff",
    },
  };
  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GlobalContextProvider>
            <TextClipsContextProvider>
              <TalkAndPasteContextProvider>
                <VoiceRecentClipsContextProvider>
                  <Type_Message_ContextProvider>
                    <Navigation />
                  </Type_Message_ContextProvider>
                </VoiceRecentClipsContextProvider>
              </TalkAndPasteContextProvider>
            </TextClipsContextProvider>
          </GlobalContextProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </PaperProvider>
  );
}
