import React, { useContext, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ScrollView, useWindowDimensions } from "react-native";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import {
  Action_Container,
  Container,
} from "../../components/global_components/containers/general_containers.js";
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

export default function Talk_and_paste_View({ navigation }) {
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
        color={theme.colors.bg.screens_bg}
        justify="center"
        align="center"
      >
        <HomeHeader action={() => navigation.navigate("Menu_View")} />
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingBottom: 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Container
            width="100%"
            height={"1%"}
            color={theme.colors.bg.screens_bg}
          />

          <Talk_And_Recording_Component
            action1={() => {
              setResponse(null);
              startRecording();
            }}
            action2={() => stopRecording()}
            action3={() => startTranscription()}
            recordingStatus={recordingStatus}
            globalLanguage={globalLanguage}
          />

          <Spacer position="top" size="medium" />

          <Container
            width="100%"
            height={`${resultAreaHeight}px`}
            color={theme.colors.bg.elements_bg}
            justify="center"
            align="center"
          >
            {!response && recordingStatus === "idle" && (
              <Image
                source={require("../../../assets/illustrations/create_voice_message.png")}
                contentFit="contain"
                style={{
                  width: imageSize,
                  height: imageSize,
                }}
              />
            )}

            {recordingStatus === "listening" && !response && (
              <Container
                width="100%"
                height="100%"
                color={theme.colors.bg.elements_bg}
                justify="center"
                align="center"
              />
            )}

            {recordingStatus === "transcribing" && !response && (
              <Container
                width="100%"
                height="100%"
                color={theme.colors.bg.elements_bg}
                justify="center"
                align="center"
              >
                <Loading_Spinner_area color={theme.colors.bg.elements_bg} />
              </Container>
            )}

            {response && recordingStatus === "idle" && (
              <>
                <Spacer position="top" size="medium" />
                <Transcripted_Message_Tile
                  message_en={response.body.en}
                  message_es={response.body.es}
                  width="92%"
                  // height="65%"
                  globalLanguage={globalLanguage}
                  route_name={route.name}
                  onAction={() => setResponse(null)}
                />
              </>
            )}
          </Container>
          {/* **************************************** */}
          <Action_Container
            width="100%"
            height={`${screenHeight * 0.075}px`}
            justify="center"
            align="center"
            color={theme.colors.ui.highlight_color_2}
            direction="row"
            onPress={() =>
              navigation.navigate("Temporary_Recent_Messages_View")
            }
          >
            <Container
              width="90%"
              height="100%"
              justify="center"
              align="flex-start"
              color="transparent"
              style={{ paddingLeft: 24 }}
            >
              <Text variant="dm_sans_bold_18" style={{ lineHeight: 28 }}>
                Recent messages
              </Text>
            </Container>

            <Container
              width="10%"
              height="100%"
              justify="center"
              align="center"
              color="transparent"
            >
              <ChevronRightArrow width={20} height={20} />
            </Container>
          </Action_Container>
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
