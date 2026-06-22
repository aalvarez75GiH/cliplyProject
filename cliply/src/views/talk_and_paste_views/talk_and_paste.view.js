import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
// import { Voice_Recording_Component } from "../../components/operations_components/voice_recording.component.js";
import { Talk_And_Recording_Component } from "./talk_and_paste_components/talk_and_recording.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Sound_Wave_Component } from "../../components/operations_components/sound_wave.component.js";
import { Transcripted_Text_Clip_View } from "./transcripted_text_clip.view.js";
import { Transcripted_Message_View } from "./transcripted_message.view.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";
import { Text } from "../../infrastructure/typography/text.component.js";

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
  } = useContext(VoiceRecentClipsContext);
  const { globalLanguage, userData } = useContext(GlobalContext);
  const { recent_messages } = userData || { recent_messages: [] };
  const route = useRoute();
  console.log("ACTUAL ROUTE AT VOICE: ", route.name);
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
        <Container
          width="100%"
          height={"1%"}
          color={theme.colors.bg.screens_bg}
        />
        {!response && (
          <>
            <Talk_And_Recording_Component
              action1={() => startRecording()}
              action2={() => stopRecording()}
              //action3={() => setRecordingStatus("idle")}
              action3={() => startTranscription()}
              recordingStatus={recordingStatus}
              globalLanguage={globalLanguage}
            />
          </>
        )}

        <Spacer position="top" size="medium" />

        {!response && recordingStatus === "idle" && (
          <Container
            width="100%"
            height={"70%"}
            color={theme.colors.bg.screens_bg}
            //color={"red"}
          >
            <Container
              width="100%"
              height="80%"
              color={theme.colors.bg.screens_bg}
              //color={"blue"}
            >
              {recent_messages.length > 0 && (
                <>
                  <Spacer position="top" size="medium" />
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={recent_messages}
                    renderItem={renderRecentClipsTile}
                    keyExtractor={(item, id) => {
                      return item.message_id;
                    }}
                  />
                </>
              )}
              {!recent_messages.length && (
                <>
                  <Container
                    width="100%"
                    height="100%"
                    justify="center"
                    align="center"
                    color={theme.colors.bg.screens_bg}
                  >
                    <Text
                      variant="middle_screens_caption"
                      style={{ fontSize: 28 }}
                    >
                      {globalLanguage === "EN"
                        ? "No Recent Messages!!"
                        : " Sin mensajes recientes!!"}
                    </Text>
                    <Spacer position="bottom" size="extraLarge" />
                  </Container>
                </>
              )}
            </Container>
          </Container>
        )}
        {recordingStatus === "listening" && !response && (
          <>
            <Container
              width="100%"
              height={"70%"}
              color={"transparent"}
              justify="center"
              align="center"
            >
              {/* <Sound_Wave_Component /> */}
            </Container>
          </>
        )}
        {recordingStatus === "transcribing" && !response && (
          <Container
            width="100%"
            height={"70%"}
            // color={"lightblue"}
            color={"trasparent"}
            justify="center"
            align="center"
          >
            <Loading_Spinner_area />
          </Container>
        )}

        {response && recordingStatus === "idle" && (
          <Transcripted_Message_View
            message_en={response.body.en}
            message_es={response.body.es}
            language_detected={response.language_detected}
            action_1={() => navigation.navigate("Saving_text_clip_1")}
            action_2={() => setResponse(null)}
            globalLanguage={globalLanguage}
            route_name={route.name}
          />
        )}
      </Container>
    </SafeArea>
  );
}
