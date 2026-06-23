import React, { useContext, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ScrollView, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
import { Transcripted_Message_Tile } from "../../components/tiles/transcripted_message.tile.js";
import { Text } from "../../infrastructure/typography/text.component.js";

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
  // const imageSize = screenWidth * 1.5;
  const imageSize = screenWidth * 0.55;

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
            //color={"#FAD"}
            justify="center"
            align="center"
          >
            {!response && recordingStatus === "idle" && (
              <>
                <Container
                  width="100%"
                  height={"40%"}
                  //color={"lightblue"}
                  color={"transparent"}
                  justify="center"
                  align="center"
                  // direction="row"
                >
                  <Container
                    width="100%"
                    height={"65%"}
                    //color={"lightblue"}
                    color={"transparent"}
                    justify="center"
                    align="center"
                  >
                    <Image
                      source={require("../../../assets/illustrations/talk_and_paste_doodle.png")}
                      contentFit="contain"
                      style={{
                        width: imageSize,
                        height: imageSize,
                      }}
                    />
                  </Container>
                  <Container
                    width="100%"
                    height={"70%"}
                    // /color={"lightgreen"}
                    color={"transparent"}
                    justify="center"
                    align="center"
                  >
                    <Container
                      width="55%"
                      height={"100%"}
                      color={"transparent"}
                      //color={"lightyellow"}
                      justify="center"
                      align="center"
                    >
                      <Text
                        variant="dm_sans_bold_18_grey"
                        style={{
                          textAlign: "center",
                          color: "#7A7A7A",
                        }}
                      >
                        {/* Tap, Talk and Paste your message anywhere... */}
                        Tap the microphone and start speaking...
                      </Text>
                    </Container>
                    {/* <Text variant="dm_sans_bold_18_grey">
                      Talk to our AI, then paste your message anywhere...
                    </Text> */}
                    {/* </Spacer> */}
                  </Container>
                </Container>
              </>
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
            height={screenHeight * 0.07}
            onPress={() =>
              navigation.navigate("Temporary_Recent_Messages_View")
            }
          >
            <LinearGradient
              colors={["#F3E2A6", "#EBD89A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: "100%",
                height: screenHeight * 0.075,
                flexDirection: "row",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#E8D794",
              }}
            >
              <Container
                width="90%"
                height="100%"
                justify="center"
                align="flex-start"
                color="transparent"
                style={{ paddingLeft: 24 }}
              >
                <Text variant="dm_sans_bold_18">Recent messages</Text>

                <Text variant="dm_sans_bold_14">Open your recent messages</Text>
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
            </LinearGradient>
          </Action_Container>
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
