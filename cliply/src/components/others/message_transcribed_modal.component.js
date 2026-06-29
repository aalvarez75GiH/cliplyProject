import React, { useContext } from "react";
import { Modal, Portal } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import { Image } from "expo-image";

import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context";

export const Message_transcribed_modal = () => {
  const { modalVisible, setModalVisible, setResponse } = useContext(
    VoiceRecentClipsContext
  );
  const DEV_MODAL_ALWAYS_OPEN = __DEV__ && true;

  const modalStyle = {
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 28,
    padding: 24,
    overflow: "hidden",
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        // visible={DEV_MODAL_ALWAYS_OPEN || modalVisible}
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
              source={require("../../../assets/illustrations/chat_room_doodle.png")}
              contentFit="contain"
              style={{
                width: 210,
                height: 210,
              }}
            />
          </Container>

          <Spacer position="top" size="medium" />

          <Container
            width="100%"
            height="90px"
            align="center"
            justify="center"
            direction="column"
            color="#E9FBEA"
            border_radius_top_left={18}
            border_radius_top_right={18}
            border_radius_bottom_left={18}
            border_radius_bottom_right={18}
            style={{ alignSelf: "center" }}
          >
            <Text
              variant="dm_sans_bold_26"
              style={{ color: "#0DB21E", letterSpacing: 0.3, lineHeight: 34 }}
            >
              ✓ Paste your message!
            </Text>
            <Text
              variant="dm_sans_bold_26"
              style={{ color: "#0DB21E", letterSpacing: 0.3, lineHeight: 34 }}
            >
              in your chat
            </Text>
          </Container>

          <Spacer position="top" size="large" />

          <Spacer position="top" size="large" />

          <Container
            width="100%"
            height="70px"
            // color="red"
            color="transparent"
            direction="row"
            align="center"
            justify="space-between"
          >
            <Action_Container
              width="50%"
              height="50px"
              align="center"
              justify="center"
              direction="row"
              //   color="#0DB21E"
              color="transparent"
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
                alignSelf: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                variant="dm_sans_bold_18"
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Open message
              </Text>
            </Action_Container>

            <Action_Container
              width="30%"
              height="42px"
              align="center"
              justify="center"
              color="transparent"
              //   color="lightblue"
              onPress={() => {
                setModalVisible(false);
                setResponse(null);
              }}
            >
              <Text
                variant="dm_sans_bold_16"
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Back
              </Text>
            </Action_Container>
          </Container>
        </ThemeProvider>
      </Modal>
    </Portal>
  );
};
