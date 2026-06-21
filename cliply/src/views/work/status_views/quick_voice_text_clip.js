import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/global_components/safe-area.component";
import { theme } from "../../../infrastructure/theme/index";
import { Spacer } from "../../../components/global_components/optimized.spacer.component";
import {
  Container,
  Action_Container,
} from "../../../components/global_components/containers/general_containers";
import { Text } from "../../../infrastructure/typography/text.component";
import { Sound_Wave_Component } from "../../../components/operations_components/sound_wave.component";

import { ExitHeader } from "../../../components/headers/exit_header.component";
import Main_mic_icon from "../../../../assets/my-icons/micIcon.svg";
import { Squared_action_CTA_component } from "../../../components/calls_to_action/squared_action.cta";
import { Loading_Spinner_area } from "../../../components/global_components/global_loading_spinner_area.component";
import { Transcripted_Clips_Tile } from "../../../components/tiles/transcripted_clip.tile";
import StopRecordingIcon from "../../../../assets/my-icons/stop_icon.svg";

import { VoiceRecentClipsContext } from "../../../infrastructure/services/voice_recents/voice_recent.context";
import { TextClipsContext } from "../../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../../infrastructure/services/global/global.context";

export default function Quick_Voice_Text_Clip() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    recordingStatus,
    startRecording,
    stopRecording,
    startTranscription,
    response,
    setResponse,
  } = useContext(VoiceRecentClipsContext);
  const { globalLanguage } = useContext(GlobalContext);
  const { nextStep } = useContext(TextClipsContext);
  const { operation_name } = nextStep || { operation_name: "None" };
  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height={"100%"}
        color={theme.colors.bg.screens_bg}
        justify="center"
        align="center"
      >
        <ExitHeader action={() => navigation.goBack()} />
        <Spacer position="top" size="small" />
        <Container
          width="100%"
          height={"92%"}
          color={theme.colors.bg.elements_bg}
          // color={"red"}
          justify="center"
          align="center"
        >
          {!response && recordingStatus === "listening" && (
            <>
              <Container
                width="100%"
                height={"40%"}
                color={theme.colors.bg.screens_bg}
                justify="center"
                align="center"
                // color={"blue"}
              />
              <Action_Container
                width="100%"
                height={"15%"}
                // color={"lightblue"}
                color={theme.colors.bg.screens_bg}
                justify="center"
                align="center"
                direction="row"
                onPress={() => stopRecording()}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
              >
                <StopRecordingIcon
                  width="25px"
                  height="25px"
                  fill={theme.colors.ui.error}
                  style={{
                    borderRadius: 100,
                  }}
                />

                <Sound_Wave_Component width={"50%"} />
              </Action_Container>
              <Container
                width="100%"
                height={"12%"}
                color={theme.colors.bg.screens_bg}
                justify="flex-start"
                align="center"
                //color={"red"}
              ></Container>
              <Container
                width="100%"
                height={"25%"}
                color={theme.colors.bg.screens_bg}
                justify="flex-start"
                align="center"
                //color={"blue"}
              />
              <Squared_action_CTA_component
                width="100%"
                height="8%"
                action={() => startTranscription()}
                label="Transcribe..."
                color={theme.colors.ui.primary}
                text_variant="dm_sans_bold_18_white"
                icon_visible={true}
                Icon={null}
              />
            </>
          )}

          {!response && recordingStatus === "idle" && (
            <>
              <Action_Container
                width="130px"
                height="130px"
                //color={theme.colors.ui.ctas_bg_dark}
                color={theme.colors.ui.success}
                // border_radius="100px"
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={() => startRecording()}
                style={{
                  shadowColor: "#000", // iOS shadow color
                  shadowOffset: { width: 2, height: 2 }, // iOS shadow offset
                  shadowOpacity: 0.25, // iOS shadow opacity
                  shadowRadius: 3.84, // iOS shadow radius
                  elevation: 5, // Android shadow
                }}
              >
                <Main_mic_icon width="65px" height="65px" fill="#FFFFFF" />
              </Action_Container>
              <Spacer position="top" size="large" />
              <Container
                width="90%"
                height="20%"
                justify="center"
                align="center"
                color={theme.colors.bg.elements_bg}
                // color={"red"}
                direction="column"
              >
                <Text variant="dm_sans_bold_20_grey">
                  {globalLanguage === "EN" ? "Tap here &" : "Presiona aqui &"}
                </Text>
                <Text variant="dm_sans_bold_20_grey">
                  {globalLanguage === "EN"
                    ? "Use your voice to create a"
                    : "Usa tu voz para crear un"}
                </Text>
                <Text
                  variant="dm_sans_bold_20_grey"
                  style={{
                    textAlign: "center",
                  }}
                >
                  {globalLanguage === "EN"
                    ? "quick text clip"
                    : "text clip rápido"}
                </Text>
              </Container>
            </>
          )}
          {!response && recordingStatus === "transcribing" && (
            <>
              <Container
                width="100%"
                height={"10%"}
                color={theme.colors.bg.elements_bg}
                justify="center"
                align="center"
              >
                <Loading_Spinner_area color={theme.colors.bg.elements_bg} />
              </Container>
              <Text variant="dm_sans_bold_20_grey">Transcribing...</Text>
            </>
          )}
          {response && recordingStatus === "idle" && (
            <>
              <Container
                width={"100%"}
                height={"60%"}
                color={theme.colors.bg.elements_bg}
                //color={"purple"}
                align="center"
                justify="flex-end"
              >
                <Transcripted_Clips_Tile
                  width="95%"
                  height="65%"
                  message_en={response.body.en}
                  message_es={response.body.es}
                  language_detected={response.language_detected}
                  // height="60%"
                  globalLanguage={globalLanguage}
                  route_name={route.name}
                />
              </Container>
              <Container
                width={"100%"}
                height={"20%"}
                justify="flex-start"
                align="center"
                direction="column"
                color={theme.colors.bg.elements_bg}
              >
                <Squared_action_CTA_component
                  label={globalLanguage === "EN" ? "Exit" : "Salir"}
                  width="95%"
                  height={"35%"}
                  color={theme.colors.ui.highlight_color}
                  text_variant={"dm_sans_bold_16"}
                  icon_visible={false}
                  action={() => {
                    setResponse(null);
                    navigation.goBack();
                  }}
                  // action={action_2}
                />
                <Text variant="dm_sans_bold_14" style={{ padding: 10 }}>
                  {globalLanguage === "EN"
                    ? "Note: this message was saved on recent"
                    : " Nota: este mensaje se guardó en recientes"}
                </Text>
              </Container>
            </>
          )}
        </Container>
      </Container>
    </SafeArea>
  );
}
