import React, { useContext, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

import { Go_Back_Header } from "../../components/headers/goBack.header.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Listing_Recent_Messages_View({ navigation }) {
  const { renderRecentClipsTile, setResponse, setRecordingStatus } = useContext(
    VoiceRecentClipsContext
  );
  const { userData } = useContext(GlobalContext);
  const { recent_messages } = userData || { recent_messages: [] };
  const route = useRoute();
  console.log("ACTUAL ROUTE AT VOICE: ", route.name);

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setResponse(null);
        setRecordingStatus("idle");
      };
    }, [])
  );

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height={"100%"}
        // color={theme.colors.bg.screens_bg}
        color={"red"}
        justify="center"
        align="center"
      >
        <Go_Back_Header action={() => navigation.goBack()} />
        <Container
          width="100%"
          height={"1%"}
          justify="flex-start"
          align="center"
          color={theme.colors.bg.screens_bg}
        />

        <Container
          width="100%"
          style={{ flex: 1 }}
          color={theme.colors.bg.elements_bg}
          justify="center"
          align="center"
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={recent_messages}
            renderItem={renderRecentClipsTile}
            keyExtractor={(item, id) => {
              return item.message_id;
            }}
          />
        </Container>
        {/* **************************************** */}
      </Container>
    </SafeArea>
  );
}
