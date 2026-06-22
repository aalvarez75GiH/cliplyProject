import React, { useContext, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ScrollView, useWindowDimensions } from "react-native";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { Go_Back_Header } from "../../components/headers/goBack.header.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Talk_And_Recording_Component } from "./talk_and_paste_components/talk_and_recording.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Transcripted_Message_View } from "./transcripted_message.view.js";
import { Transcripted_Message_Tile } from "../../components/tiles/transcripted_message.tile.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";

import ChevronRightArrow from "../../../assets/my-icons/chevron-right.svg";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Temporary_Recent_Messages_View({ navigation }) {
  const {
    renderRecentClipsTile,
    startRecording,
    recordingStatus,
    response,
    startTranscription,
    setResponse,
    stopRecording,
    setRecordingStatus,
  } = useContext(VoiceRecentClipsContext);
  const { globalLanguage, userData } = useContext(GlobalContext);
  const { recent_messages } = userData || { recent_messages: [] };
  const route = useRoute();
  console.log("ACTUAL ROUTE AT VOICE: ", route.name);

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const resultAreaHeight = screenHeight * 0.53;
  const imageSize = screenWidth * 1.5;

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
