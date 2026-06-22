import { theme } from "../../../infrastructure/theme/index.js";
import { Text } from "../../../infrastructure/typography/text.component.js";
import {
  Action_Container,
  Container,
} from "../../../../src/components/global_components/containers/general_containers.js";
import { Spacer } from "../../../components/global_components/optimized.spacer.component.js";
import { Circular_Icon_CTA } from "../../../components/calls_to_action/circular_icon.cta.js";
import { ExitIcon } from "../../../../assets/my-icons/exit_icon.svg";
import StopIcon from "../../../../assets/my-icons/stop_icon.svg";
import RightArrow from "../../../../assets/my-icons/arrow_next_icon.svg";
import Main_mic_icon from "../../../../assets/my-icons/micIcon.svg";
import { Sound_Wave_Component } from "../../../components/operations_components/sound_wave.component.js";
import { Animated_Voice_Indicator } from "../../../components/others/animated_voice_indicator.component.js";

export const Mic_CTA_component = ({
  action1,
  action2,
  action3,
  recordingStatus,
  caption_1,
  caption_2,
  globalLanguage,
}) => {
  return (
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
              <Text variant="dm_sans_bold_18">{caption_1}</Text>
            </Spacer>
            <Spacer position="top" size="small" />
            <Spacer position="left" size="large">
              <Text
                variant="dm_sans_bold_14_disable_not_active"
                style={{ lineHeight: 18 }}
              >
                {caption_2}
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
  );
};
