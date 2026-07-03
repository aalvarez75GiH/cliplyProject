import React, { useContext } from "react";

import { theme } from "../../../infrastructure/theme/index";
import {
  Container,
  Action_Container,
} from "../../../components/global_components/containers/general_containers";
// import { Mic_CTA_component } from "./main_mic_cta.component";
import { Spacer } from "../../../components/global_components/optimized.spacer.component";
import StopIcon from "../../../../assets/my-icons/stop_icon.svg";
import RightArrow from "../../../../assets/my-icons/arrow_next_icon.svg";
import { Animated_Voice_Indicator } from "../../../components/others/animated_voice_indicator.component.js";
import { Text } from "../../../infrastructure/typography/text.component.js";
import { Mic_CTA } from "../../../components/calls_to_action/mic.cta.js";
import { Transcribe_CTA } from "../../../components/calls_to_action/transcribe.cta.js";

export const Talk_And_Recording_Component = ({
  action1,
  action2,
  action3,
  recordingStatus,
  globalLanguage,
}) => {
  console.log("GLOBAL LANGUAGE AT VOICE RECORDING:", globalLanguage);
  return (
    <Container
      width="100%"
      height={recordingStatus === "idle" ? "20%" : "20%"}
      //color={"red"}
      color={theme.colors.bg.elements_bg}
      justify="center"
      align="center"
    >
      <Container
        width="95%"
        height="75%"
        // color={theme.colors.bg.screens_bg}
        color={
          recordingStatus === "idle"
            ? theme.colors.bg.elements_bg
            : theme.colors.bg.elements_bg
        }
        //color={"red"}
        direction="row"
        align="center"
        justify={recordingStatus ? "flex-start" : "flex-start"}
        border_radius={recordingStatus === "idle" ? "10px" : "70px"}
      >
        {recordingStatus === "idle" && (
          <>
            <Mic_CTA action={action1} recordingStatus={recordingStatus} />

            <Container
              width="75%"
              height="90%"
              color={theme.colors.bg.elements_bg}
              //color={"blue"}
              direction="column"
              align="flex-start"
              justify="center"
            >
              <Spacer position="top" size="medium" />
              <Spacer position="left" size="large">
                <Text variant="dm_sans_bold_22">Talk, Copy & Paste</Text>
              </Spacer>
              <Spacer position="top" size="small" />
              <Spacer position="left" size="large">
                <Text
                  variant="dm_sans_bold_14_disable_not_active"
                  style={{ lineHeight: 18 }}
                >
                  Speak naturally and paste anywhere
                </Text>
              </Spacer>
            </Container>
          </>
        )}
        {recordingStatus === "listening" && (
          <>
            <Mic_CTA action={action2} recordingStatus={recordingStatus} />

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
              width="55px"
              height="55px"
              icon_width="25px"
              icon_height="25px"
              action={action3}
              recordingStatus={recordingStatus}
            />
          </>
        )}
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
              width="55px"
              height="55px"
              icon_width="25px"
              icon_height="25px"
              recordingStatus={recordingStatus}
              action={null}
            />
          </>
        )}
      </Container>
    </Container>
  );
};
