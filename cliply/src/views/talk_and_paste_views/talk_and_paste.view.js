import React, { useContext, useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { ScrollView, useWindowDimensions } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { Action_Container } from "../../components/global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Talk_And_Recording_Component } from "./talk_and_paste_components/talk_and_recording.component.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Transcripted_Message_Tile } from "../../components/tiles/transcripted_message.tile.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Navigate_to_Recent_Messages_Tile } from "../../components/tiles/navigate_to_recent_messages.tile.js";

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

  const modalStyle = {
    backgroundColor: "white",
    width: "90%",
    minHeight: 360,
    alignSelf: "center",
    borderRadius: 24,
    padding: 24,
  };

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
                        Tap the mic, Talk and Paste your message anywhere...
                        {/* Tap the microphone and start speaking... */}
                        {/* Talk to our AI & paste your message anywhere... */}
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

            {response && recordingStatus === "idle" && (
              <>
                <Portal>
                  <Modal
                    visible={modalVisible}
                    dismissable={false}
                    contentContainerStyle={modalStyle}
                  >
                    <ThemeProvider theme={theme}>
                      <Action_Container
                        width="42px"
                        height="42px"
                        align="center"
                        justify="center"
                        color="#FFFFFF"
                        border_radius_top_left={21}
                        border_radius_top_right={21}
                        border_radius_bottom_left={21}
                        border_radius_bottom_right={21}
                        style={{
                          position: "absolute",
                          top: 18,
                          right: 18,
                          zIndex: 10,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.12,
                          shadowRadius: 6,
                          elevation: 4,
                        }}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text variant="dm_sans_bold_22">×</Text>
                      </Action_Container>

                      <Container
                        width="100%"
                        height="210px"
                        align="center"
                        justify="center"
                        color="#F1FFF3"
                        border_radius_top_left={22}
                        border_radius_top_right={22}
                        border_radius_bottom_left={22}
                        border_radius_bottom_right={22}
                      >
                        <Image
                          source={require("../../../assets/illustrations/clip_board.png")}
                          contentFit="contain"
                          style={{
                            width: 210,
                            height: 210,
                          }}
                        />
                      </Container>

                      <Spacer position="top" size="medium" />

                      <Container
                        width="110px"
                        height="36px"
                        align="center"
                        justify="center"
                        direction="row"
                        color="#E9FBEA"
                        border_radius_top_left={18}
                        border_radius_top_right={18}
                        border_radius_bottom_left={18}
                        border_radius_bottom_right={18}
                        style={{ alignSelf: "center" }}
                      >
                        <Text
                          variant="dm_sans_bold_14"
                          style={{ color: "#0DB21E", letterSpacing: 0.5 }}
                        >
                          ✓ COPIED
                        </Text>
                      </Container>

                      <Spacer position="top" size="medium" />

                      <Text
                        variant="dm_sans_bold_28"
                        style={{
                          textAlign: "center",
                          color: "#151515",
                          lineHeight: 34,
                        }}
                      >
                        Your message is ready!
                      </Text>

                      <Spacer position="top" size="small" />

                      <Text
                        variant="dm_sans_bold_16_grey"
                        style={{
                          textAlign: "center",
                          color: "#6F6F6F",
                          lineHeight: 23,
                        }}
                      >
                        It’s copied and ready to paste anywhere you need.
                      </Text>

                      <Spacer position="top" size="large" />

                      <Action_Container
                        width="100%"
                        height="58px"
                        align="center"
                        justify="center"
                        direction="row"
                        color="#0DB21E"
                        border_radius_top_left={29}
                        border_radius_top_right={29}
                        border_radius_bottom_left={29}
                        border_radius_bottom_right={29}
                        style={{
                          shadowColor: "#0DB21E",
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.25,
                          shadowRadius: 10,
                          elevation: 6,
                        }}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text
                          variant="dm_sans_bold_18"
                          style={{
                            color: "#FFFFFF",
                          }}
                        >
                          Open message
                        </Text>
                      </Action_Container>

                      <Spacer position="top" size="medium" />

                      <Action_Container
                        width="100%"
                        height="42px"
                        align="center"
                        justify="center"
                        color="transparent"
                        onPress={() => {
                          setModalVisible(false);
                          setResponse(null);
                        }}
                      >
                        <Text
                          variant="dm_sans_bold_16"
                          style={{
                            color: "#0DB21E",
                          }}
                        >
                          Continue recording
                        </Text>
                      </Action_Container>
                    </ThemeProvider>
                  </Modal>
                </Portal>
                {/* <Portal>
                  <Modal
                    visible={modalVisible}
                    dismissable={false}
                    contentContainerStyle={modalStyle}
                  >
                    <ThemeProvider theme={theme}>
                      <Text variant="dm_sans_bold_18">
                        Your message is ready.
                      </Text>

                      <Spacer position="top" size="medium" />

                      <Text variant="dm_sans_regular_16">
                        Do you want to open the transcripted message?
                      </Text>

                      <Spacer position="top" size="large" />

                      <Button onPress={() => setModalVisible(false)}>
                        Open message
                      </Button>
                    </ThemeProvider>
                  </Modal>
                </Portal> */}

                {!modalVisible && (
                  <Transcripted_Message_Tile
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
            {/* {response && recordingStatus === "idle" && (
              <>
                <Portal>
                  <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    contentContainerStyle={modalStyle}
                  >
                    <ThemeProvider theme={theme}>
                      <Text variant="dm_sans_bold_18">
                        Example Modal. Click outside this area to dismiss.
                      </Text>

                      <Spacer position="top" size="medium" />

                      <Transcripted_Message_Tile
                        message_en={response?.body?.en}
                        message_es={response?.body?.es}
                        width="95%"
                        globalLanguage={globalLanguage}
                        route_name={route.name}
                        onAction={() => setResponse(null)}
                      />
                    </ThemeProvider>
                  </Modal>
                </Portal>
              </>
            )} */}
          </Container>
          {/* **************************************** */}

          {recordingStatus === "idle" && recent_messages.length > 0 && (
            <Navigate_to_Recent_Messages_Tile />
          )}
        </ScrollView>
      </Container>
    </SafeArea>
  );
}
