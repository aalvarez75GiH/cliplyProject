import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import MicIcon from "../../../assets/my-icons/micIcon.svg";
import { Snack_Bar_Component } from "../others/snack_bar.component.js";

import { Spacer } from "../global_components/optimized.spacer.component.js";
import { Outlined_CTA } from "../calls_to_action/outlined.cta.js";
import { Mic_CTA } from "../calls_to_action/mic.cta.js";
import { Transcribe_CTA } from "../calls_to_action/transcribe.cta.js";
import { Animated_Voice_Indicator } from "../others/animated_voice_indicator.component.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Quick_Voice_Transcription_header = ({
  recordingStatus,
  startRecording,
  stopRecording,
  startTranscription,
  setResponse,
  action,
}) => {
  console.log("RECORDING STATUS AT HEADER:", recordingStatus);
  const { setSelectedItemId } = useContext(TextClipsContext);

  const { globalLanguage } = useContext(GlobalContext);

  // const navigation = useNavigation();

  return recordingStatus === "listening" ? (
    <Container
      width="100%"
      height="12%"
      align="flex-start"
      direction="row"
      justify="center"
      color={theme.colors.bg.elements_bg}
    >
      <>
        <Mic_CTA
          action={() => stopRecording()}
          recordingStatus={recordingStatus}
          width="40px"
          height="40px"
          icon_width="25px"
          icon_height="25px"
        />

        <Container
          height="65px"
          color={theme.colors.bg.elements_bg}
          //color={"red"}
          justify="center"
          align="center"
          style={{
            flex: 1,
            marginTop: 15,
            marginHorizontal: 8,
            overflow: "hidden",
          }}
        >
          <Animated_Voice_Indicator recordingStatus={recordingStatus} />
        </Container>
        <Transcribe_CTA
          width="40px"
          height="40px"
          icon_width="20px"
          icon_height="20px"
          action={() => startTranscription()}
          recordingStatus={recordingStatus}
        />
      </>
      {recordingStatus === "transcribing" && (
        <>
          <Mic_CTA action={null} recordingStatus={recordingStatus} />

          <Container
            height="65%"
            color={theme.colors.bg.elements_bg}
            //color={"red"}
            justify="center"
            align="center"
            style={{
              flex: 1,
              marginTop: 0,
              marginHorizontal: 8,
              overflow: "hidden",
            }}
          >
            <Text
              variant="dm_sans_bold_16_grey"
              style={{
                alignSelf: "center",
                justifySelf: "flex-start",
                textAlign: "left",
              }}
            >
              Transcribing...
            </Text>
          </Container>

          <Transcribe_CTA
            action={() => startTranscription()}
            recordingStatus={recordingStatus}
          />
        </>
      )}
    </Container>
  ) : (
    <Container
      width="100%"
      height="12%"
      align="flex-start"
      direction="row"
      justify="center"
      color={theme.colors.bg.elements_bg}
    >
      <Action_Container
        width="35%"
        height="100%"
        // color={"blue"}
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="center"
        style={{ paddingRight: "5%" }}
        // onPress={() => navigation.navigate("Quick_Voice_Text_Clip")}
        onPress={() => {
          setResponse(null);
          startRecording();
        }}
      >
        <Spacer position="left" size="large">
          <MicIcon width={30} height={30} fill={theme.colors.ui.primary} />
        </Spacer>
      </Action_Container>
      <Container
        width="35%"
        height="100%"
        //color={"red"}
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="flex-end"
        style={{ paddingRight: "5%" }}
      ></Container>

      <Container
        width="40%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="center"
        border_radius={100}
      >
        <Outlined_CTA
          width={"60%"}
          height={"45%"}
          label={globalLanguage === "EN" ? "Back" : "Atrás"}
          // border_radius={100}
          border_width="2px"
          label_variant="dm_sans_bold_14"
          action={action}
          // action={() => {
          //   // setNextStep(nextStepInitialState);
          //   setSelectedItemId(null);
          //   navigation.popToTop("Home_View");
          // }}
        />
      </Container>
    </Container>
  );
};
