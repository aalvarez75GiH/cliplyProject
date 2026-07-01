import React, { useContext, useCallback, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ScrollView, useWindowDimensions } from "react-native";
import * as Clipboard from "expo-clipboard";

import { Button_Go_Back_Header } from "../../components/headers/button_go_back_header.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Talk_And_Recording_Component } from "./talk_and_paste_components/talk_and_recording.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Transcribed_Message_Tile } from "../../components/tiles/transcribed_message_tile/transcribed_message.tile.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Navigate_to_Recent_Messages_Tile } from "../../components/tiles/navigate_to_recent_messages.tile.js";
import { Message_transcribed_modal } from "../../components/others/message_transcribed_modal.component.js";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Talk_and_paste_View({ navigation }) {
  const {
    startRecording,
    recordingStatus,
    response,
    startTranscription,
    setResponse,
    stopRecording,
    setRecordingStatus,
    modalVisible,
    setModalVisible,
  } = useContext(VoiceRecentClipsContext);
  const { globalLanguage, userData } = useContext(GlobalContext);
  const { recent_messages } = userData || { recent_messages: [] };
  const route = useRoute();

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const resultAreaHeight =
    recordingStatus === "listening" || recordingStatus === "transcribing"
      ? screenHeight * 0.64
      : screenHeight * 0.53;

  const imageSize = screenWidth * 0.55;

  useEffect(() => {
    const copyNewResponse = async () => {
      if (!response?.body) return;

      const messageToCopy =
        globalLanguage === "EN" ? response.body.en : response.body.es;

      await Clipboard.setStringAsync(messageToCopy);

      setModalVisible(true);
    };

    copyNewResponse();
  }, [response?.body?.en, response?.body?.es, globalLanguage]);

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
        <Button_Go_Back_Header
          action={() => navigation.navigate("Home")}
          caption="Home"
        />
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
            // color={"#FAD"}
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
                        Tap the mic, Talk and Paste your message anywhere...
                      </Text>
                    </Container>

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
                // color={"red"}
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

            {/* <Message_transcribed_modal /> */}
            {response && recordingStatus === "idle" && (
              <>
                <Message_transcribed_modal />
                {!modalVisible && (
                  <Transcribed_Message_Tile
                    message_en={response?.body?.en}
                    message_es={response?.body?.es}
                    width="95%"
                    globalLanguage={globalLanguage}
                    route_name={route.name}
                    onAction={() => setResponse(null)}
                  />
                )}
              </>
            )}
          </Container>

          <Container
            width="100%"
            height="70px"
            color={theme.colors.bg.elements_bg}
            // color={"red"}
            justify="center"
            align="center"
          >
            {recordingStatus === "idle" && recent_messages.length > 0 && (
              <Navigate_to_Recent_Messages_Tile />
            )}
          </Container>
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
