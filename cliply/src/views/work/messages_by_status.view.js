import React, { useState, useContext, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { theme } from "../../infrastructure/theme/index";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Container } from "../../components/global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component";
import { useNavigation } from "@react-navigation/native";
// import { Messages_By_Status_header } from "../../components/headers/messages_by_status.header";
import { Operations_Status_Step_Component } from "../../components/operations_components/old_operations_status_step.component";
import { Quick_Voice_Transcription_header } from "../../components/headers/quick_voice_transcription.header";
import { Global_activity_indicator } from "../../components/global_components/global_activity_indicator_screen.component";
import { Transcribed_Message_Tile } from "../../components/tiles/transcribed_message_tile/transcribed_message.tile";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";
import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context";
import { TalkAndPasteContext } from "../../infrastructure/services/talk_and_paste/talk_and_paste.context";

export default function Messages_by_Status_View({ route }) {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();

  const {
    recordingStatus,
    startRecording,
    stopRecording,
    startTranscription,
    response,
    setResponse,
    isLoading,
  } = useContext(TalkAndPasteContext);

  const { operation_name, status_name, specificTextClipData } = route.params;

  const {
    renderStoredMessagesTile,
    setSelectedItemId,
    setIntroAdded,
    setSpecificTextClipData,
  } = useContext(TextClipsContext);

  const { globalLanguage, userData, snackbar } = useContext(GlobalContext);
  const [dataToRender, setDataToRender] = useState([]);

  console.log("RECORDING STATUS IN MESSAGES BY STATUS VIEW:", recordingStatus);
  useEffect(() => {
    const { global_operations } = userData;
    const { statuses } = global_operations.find(
      (op) => op.operation_name === operation_name
    ) || { statuses: [] };

    const status_to_render = statuses.find(
      (st) => st.status_name === status_name
    );

    if (!status_to_render) {
      console.log("STATUS NOT FOUND:", status_name);
      console.log(
        "AVAILABLE STATUSES:",
        statuses.map((st) => st.status_name)
      );

      setDataToRender([]);
      return;
    }

    setDataToRender(status_to_render.stored_messages || []);
    console.log(
      "STATUS TO RENDER IN STATUS VIEW:",
      JSON.stringify(status_to_render, null, 2)
    );

    setDataToRender(status_to_render.stored_messages || []);
    setSpecificTextClipData({
      ...specificTextClipData,
      status_name: status_name,
    });

    // Cleanup function to set state when leaving the view
    return () => {
      setDataToRender([]); // Reset data or set any state you want
      setSelectedItemId(null); // Clear selected item ID on exit
      setIntroAdded(false); // Reset intro added state
    };
  }, []);

  const fd_heading_to_pickup = require("../../../assets/illustrations/heading_to_pickup.png");
  // const image_source_1 = require("../../../assets/illustrations/heading_to_pickup.png");
  const fd_at_restaurant = require("../../../assets/illustrations/at restaurant-shopping.png");
  const fd_heading_to_dropoff = require("../../../assets/illustrations/heading to drop off.png");
  const rs_heading_to_passenger = require("../../../assets/illustrations/heading to passenger.png");
  const rs_close_to_passanger = require("../../../assets/illustrations/close to passenger.png");
  const rs_at_passenger = require("../../../assets/illustrations/at pickUp location.png");

  const statusImagesAndCaptions = {
    food_delivery: {
      heading_to_pickup_shop: {
        image: fd_heading_to_pickup,
        caption_1: "Heading to",
        caption_2: "pickup",
      },
      picking_up_shopping: {
        image: fd_at_restaurant,
        caption_1: "Picking Up",
        caption_2: "",
      },
      heading_to_drop_off: {
        image: fd_heading_to_dropoff,
        caption_1: "Heading to",
        caption_2: "drop off",
      },
    },
    ride_share: {
      heading_to_passenger: {
        image: rs_heading_to_passenger,
        caption_1: "Heading to",
        caption_2: "passenger",
      },
      close_to_passenger: {
        image: rs_close_to_passanger,
        caption_1: "Close to",
        caption_2: "passenger",
      },
      at_passenger_location: {
        image: rs_at_passenger,
        caption_1: "I am",
        caption_2: "here",
      },
    },
  };

  const currentImage =
    statusImagesAndCaptions?.[operation_name]?.[status_name]?.image ||
    fd_heading_to_pickup;
  const currentCaption1 =
    statusImagesAndCaptions?.[operation_name]?.[status_name]?.caption_1 || "";
  const currentCaption2 =
    statusImagesAndCaptions?.[operation_name]?.[status_name]?.caption_2 || "";

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      {isLoading && recordingStatus === "transcribing" && (
        <Global_activity_indicator caption="Wait, transcribing" />
      )}
      {response && recordingStatus === "idle" && (
        <Container
          width="100%"
          height="100%"
          color={theme.colors.bg.screens_bg}
          justify="flex-start"
          align="center"
        >
          <Quick_Voice_Transcription_header
            snackbar={snackbar}
            recordingStatus={recordingStatus}
            startRecording={startRecording}
            stopRecording={stopRecording}
            startTranscription={startTranscription}
            response={response}
            setResponse={setResponse}
            action={() => setResponse(null)}
          />

          <Container
            width="100%"
            height="75%"
            color={theme.colors.bg.screens_bg}
            justify="center"
            align="center"
          >
            <Transcribed_Message_Tile
              message_en={response?.body?.en}
              message_es={response?.body?.es}
              width="95%"
              globalLanguage={globalLanguage}
              route_name={route.name}
              onAction={() => setResponse(null)}
            />
          </Container>
        </Container>
      )}

      {!isLoading && !response && (
        <Container
          width="100%"
          height={"100%"}
          color={theme.colors.bg.screens_bg}
        >
          <Quick_Voice_Transcription_header
            snackbar={snackbar}
            //   recordingStatus={"listening"}
            recordingStatus={recordingStatus}
            startRecording={startRecording}
            stopRecording={stopRecording}
            startTranscription={startTranscription}
            response={response}
            setResponse={setResponse}
            action={() => {
              // setNextStep(nextStepInitialState);
              navigation.popToTop("Home_View");
            }}
            // action={() => setResponse(null)}
          />

          <View style={{ flex: 1, width: "100%", position: "relative" }}>
            <Spacer position="top" size="small" />

            <Container
              width="100%"
              height={"15%"}
              //color={"red"}
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="center"
            >
              <Spacer position="top" size="small" />
              <Operations_Status_Step_Component
                operation_name={operation_name}
                status_name={status_name}
                caption_1={currentCaption1}
                caption_2={currentCaption2}
                caption_3={globalLanguage === "EN" ? "Quickies" : "Rapiditos"}
                image_source_1={currentImage}
                step_indicator_color={theme.colors.ui.food_delivery_theme_color}
                inverted={false}
                status={status_name}
                step_number={"1"}
              />
              <Spacer position="top" size="small" />
            </Container>

            <Container
              width="100%"
              height={"75%"}
              color={theme.colors.bg.screens_bg}
            >
              <Spacer position="top" size="medium" />
              {dataToRender.length === 0 && (
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
                    No Messages!!
                  </Text>
                </Container>
              )}

              {dataToRender.length > 0 && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={dataToRender}
                  renderItem={({ item }) =>
                    renderStoredMessagesTile({
                      item,
                      snackbar,
                    })
                  }
                  // renderItem={() => renderStoredMessagesTile(snackbar)}
                  keyExtractor={(item, id) => {
                    return item.message_id;
                  }}
                />
              )}
              <Spacer position="top" size="large" />
            </Container>
            {(recordingStatus === "listening" ||
              recordingStatus === "transcribing") && (
              <View
                pointerEvents="auto"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(40,40,40,0.55)",
                  zIndex: 999,
                }}
              />
            )}
          </View>
        </Container>
      )}
    </SafeArea>
  );
}
