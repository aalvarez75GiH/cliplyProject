import React, { useContext } from "react";

import { theme } from "../../../infrastructure/theme/index";
import {
  Container,
  Action_Container,
} from "../../../components/global_components/containers/general_containers";
import { Main_mic_CTA_component } from "../../../components/calls_to_action/main_mic_cta.component";
import { Mic_CTA_component } from "./main_mic_cta.component";
import { Spacer } from "../../../components/global_components/optimized.spacer.component";
import StopIcon from "../../../../assets/my-icons/stop_icon.svg";
import RightArrow from "../../../../assets/my-icons/arrow_next_icon.svg";
import Main_mic_icon from "../../../../assets/my-icons/micIcon.svg";
import { Animated_Voice_Indicator } from "../../../components/others/animated_voice_indicator.component.js";
import { Text } from "../../../infrastructure/typography/text.component.js";

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
      // color={"red"}
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
            ? theme.colors.bg.screens_bg
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
            <Spacer position="left" size="medium" />
            <Container
              width="75px"
              height="75px"
              color={
                recordingStatus === "idle"
                  ? theme.colors.bg.screens_bg
                  : theme.colors.bg.elements_bg
              }
            >
              <Action_Container
                width="75px"
                height="75px"
                color={theme.colors.ui.success}
                border_radius={"100px"}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={action1}
                style={{
                  shadowColor: "#000", // iOS shadow color
                  shadowOffset: { width: 2, height: 2 }, // iOS shadow offset
                  shadowOpacity: 0.25, // iOS shadow opacity
                  shadowRadius: 3.84, // iOS shadow radius
                  elevation: 5, // Android shadow
                }}
              >
                <Main_mic_icon width="45px" height="45px" fill="#FFFFFF" />
              </Action_Container>
            </Container>
            <Container
              width="70%"
              height="90%"
              color={theme.colors.bg.screens_bg}
              //color={"blue"}
              direction="column"
              align="flex-start"
              justify="center"
            >
              <Spacer position="top" size="medium" />
              <Spacer position="left" size="large">
                <Text variant="dm_sans_bold_18">"Talk & Paste"</Text>
              </Spacer>
              <Spacer position="top" size="small" />
              <Spacer position="left" size="large">
                <Text
                  variant="dm_sans_bold_14_disable_not_active"
                  style={{ lineHeight: 18 }}
                >
                  Talk to our AI, then paste it anywhere you want
                </Text>
              </Spacer>
            </Container>
          </>
        )}
        {recordingStatus === "listening" && (
          <>
            <Spacer position="left" size="medium" />
            <Container
              width="75px"
              height="75px"
              color={theme.colors.bg.elements_bg}
            >
              <Spacer position="top" size="small" />
              <Action_Container
                width="40px"
                height="40px"
                color={"#FFFFFF"}
                border_radius={"100px"}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={action2}
                style={{
                  shadowColor: "#000", // iOS shadow color
                  shadowOffset: { width: 2, height: 2 }, // iOS shadow offset
                  shadowOpacity: 0.25, // iOS shadow opacity
                  shadowRadius: 3.84, // iOS shadow radius
                  elevation: 5, // Android shadow
                }}
              >
                <StopIcon width="15px" height="15px" fill="red" />
              </Action_Container>
            </Container>
            <>
              <Container
                height="70%"
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
            </>
            <Container
              width="75px"
              height="75px"
              color={theme.colors.bg.elements_bg}
            >
              <Spacer position="top" size="small" />
              <Action_Container
                width="40px"
                height="40px"
                color={"#000000"}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={action3}
              >
                <RightArrow width="15px" height="15px" fill={"#FFFFFF"} />
              </Action_Container>
            </Container>
          </>
        )}
        {recordingStatus === "transcribing" && (
          <>
            <Spacer position="left" size="medium" />
            <Container
              width="75px"
              height="75px"
              color={theme.colors.bg.elements_bg}
            >
              <Action_Container
                width="40px"
                height="40px"
                color={"#FFFFFF"}
                border_radius={"100px"}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={action2}
                style={{
                  shadowColor: "#000", // iOS shadow color
                  shadowOffset: { width: 2, height: 2 }, // iOS shadow offset
                  shadowOpacity: 0.25, // iOS shadow opacity
                  shadowRadius: 3.84, // iOS shadow radius
                  elevation: 5, // Android shadow
                }}
              >
                <StopIcon width="15px" height="15px" fill="red" />
              </Action_Container>
            </Container>

            <Container
              width="60%"
              // height={"80.5%"}
              height={"70%"}
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="center"
            >
              <Text
                variant="dm_sans_bold_16_grey"
                style={{
                  alignSelf: "center",
                  justifySelf: "flex-start",
                  textAlign: "left",
                }}
              >
                {globalLanguage === "EN"
                  ? "Transcribing..."
                  : " Transcribiendo..."}
              </Text>
            </Container>

            <Container
              width="75px"
              height="75px"
              color={theme.colors.bg.elements_bg}
            >
              <Action_Container
                width="40px"
                height="40px"
                color={"#000000"}
                border_radius_top_left={100}
                border_radius_top_right={100}
                border_radius_bottom_left={100}
                border_radius_bottom_right={100}
                onPress={action3}
              >
                <RightArrow width="15px" height="15px" fill={"#FFFFFF"} />
              </Action_Container>
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
};
// import React, { useContext } from "react";

// import { theme } from "../../../infrastructure/theme/index";
// import { Container } from "../../../components/global_components/containers/general_containers";
// import { Main_mic_CTA_component } from "../../../components/calls_to_action/main_mic_cta.component";
// import { Mic_CTA_component } from "./main_mic_cta.component";
// import { Spacer } from "../../../components/global_components/optimized.spacer.component";

// export const Talk_And_Recording_Component = ({
//   action1,
//   action2,
//   action3,
//   recordingStatus,
//   globalLanguage,
// }) => {
//   console.log("GLOBAL LANGUAGE AT VOICE RECORDING:", globalLanguage);
//   return (
//     <Container
//       width="100%"
//       // height={recordingStatus === "idle" ? "20%" : "10.3%"}
//       height={recordingStatus === "idle" ? "20%" : "20%"}
//       // color={"red"}
//       color={theme.colors.bg.elements_bg}
//       justify="center"
//       align="center"
//     >
//       <Spacer position="top" size="medium" />
//       <Mic_CTA_component
//         action1={action1}
//         action2={action2}
//         action3={action3}
//         recordingStatus={recordingStatus}
//         caption_1={"Talk & Paste"}
//         caption_2={"Talk to our AI, then paste it anywhere you want"}
//         globalLanguage={globalLanguage}
//       />
//     </Container>
//   );
// };
