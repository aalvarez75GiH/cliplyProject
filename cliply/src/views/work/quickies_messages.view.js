import React, { useContext, useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../infrastructure/typography/text.component.js";
import { View } from "react-native";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { quickies_food_delivery } from "../../infrastructure/local_data/clips_by_operations.data.js";
import { quickies_ride_share } from "../../infrastructure/local_data/clips_by_operations.data.js";
import { Messages_By_Status_header } from "../../components/headers/messages_by_status.header.js";
import { Quick_Voice_Transcription_header } from "../../components/headers/quick_voice_transcription.header.js";
import { Transcribed_Message_Tile } from "../../components/tiles/transcribed_message_tile/transcribed_message.tile.js";
import { Global_activity_indicator } from "../../components/global_components/global_activity_indicator_screen.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { TalkAndPasteContext } from "../../infrastructure/services/talk_and_paste/talk_and_paste.context.js";

export default function Quickies_Messages_View({ route }) {
  const navigation = useNavigation();
  const { globalLanguage } = useContext(GlobalContext);
  const { renderQuickiesTile, setSelectedItemId } =
    useContext(TextClipsContext);
  const { operation, status } = route.params;

  const { heading_to_pickup_shop, picking_up_shopping, heading_to_drop_off } =
    quickies_food_delivery;
  const { heading_to_passenger, close_to_passenger, at_passenger_location } =
    quickies_ride_share;

  const {
    recordingStatus,
    startRecording,
    stopRecording,
    startTranscription,
    response,
    setResponse,
    isLoading,
  } = useContext(TalkAndPasteContext);

  useEffect(() => {
    return () => {
      setSelectedItemId(null);
    };
  }, []);
  // console.log("OPERATION AND STATUS PARAMS: ", operation, status);
  // console.log("HEADING TO PICKUP DATA: ", heading_to_pickup_shop);
  // console.log("PICKING UP SHOPPING DATA: ", picking_up_shopping);
  // console.log("HEADING TO DROP OFF: ", heading_to_drop_off);
  // console.log("HEADING TO PASSENGER DATA: ", heading_to_passenger);
  // console.log("CLOSE TO PASSENGER DATA: ", close_to_passenger);
  // console.log("AT PICKUP LOCATION  DATA: ", at_passenger_location);
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
            recordingStatus={recordingStatus}
            startRecording={startRecording}
            stopRecording={stopRecording}
            startTranscription={startTranscription}
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
          height="100%"
          align="center"
          justify="flex-start"
          color={theme.colors.bg.screens_bg}
        >
          <Quick_Voice_Transcription_header
            recordingStatus={recordingStatus}
            startRecording={startRecording}
            stopRecording={stopRecording}
            startTranscription={startTranscription}
            setResponse={setResponse}
            action={() => navigation.goBack()}
          />

          <View style={{ flex: 1, width: "100%", position: "relative" }}>
            <Spacer position="top" size="medium" />

            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={
                operation === "food_delivery" &&
                status === "heading_to_pickup_shop"
                  ? heading_to_pickup_shop
                  : operation === "food_delivery" &&
                    status === "picking_up_shopping"
                  ? picking_up_shopping
                  : operation === "food_delivery" &&
                    status === "heading_to_drop_off"
                  ? heading_to_drop_off
                  : operation === "ride_share" &&
                    status === "heading_to_passenger"
                  ? heading_to_passenger
                  : operation === "ride_share" &&
                    status === "close_to_passenger"
                  ? close_to_passenger
                  : operation === "ride_share" &&
                    status === "at_passenger_location"
                  ? at_passenger_location
                  : []
              }
              renderItem={renderQuickiesTile}
              keyExtractor={(item) => item.message_id}
            />

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
  //   return (
  //     <SafeArea background_color={theme.colors.bg.elements_bg}>
  //       <Container
  //         // color={"lightyellow"}
  //         width={"100%"}
  //         height={"100%"}
  //         align="center"
  //         justify="flex-start"
  //         // color={theme.colors.bg.elements_bg}
  //         color={theme.colors.bg.screens_bg}
  //       >
  //         {/* <Messages_By_Status_header /> */}
  //         <Quick_Voice_Transcription_header
  //           recordingStatus={recordingStatus}
  //           startRecording={startRecording}
  //           stopRecording={stopRecording}
  //           startTranscription={startTranscription}
  //           setResponse={setResponse}
  //           action={() => navigation.goBack()}
  //         />
  //         {/* ******************* FOOD DELIVERY ***************************** */}
  //         {operation === "food_delivery" &&
  //           status === "heading_to_pickup_shop" && (
  //             <Container
  //               width="100%"
  //               height="90%"
  //               color={theme.colors.bg.screens_bg}
  //             >
  //               <Spacer position="top" size="medium" />
  //               <FlatList
  //                 showsHorizontalScrollIndicator={false}
  //                 showsVerticalScrollIndicator={false}
  //                 data={heading_to_pickup_shop}
  //                 renderItem={renderQuickiesTile}
  //                 keyExtractor={(item, id) => {
  //                   return item.message_id;
  //                 }}
  //               />
  //               <Spacer position="top" size="medium" />
  //             </Container>
  //           )}
  //         {operation === "food_delivery" && status === "picking_up_shopping" && (
  //           <Container
  //             width="100%"
  //             height="90%"
  //             color={theme.colors.bg.screens_bg}
  //           >
  //             <Spacer position="top" size="medium" />
  //             <FlatList
  //               showsHorizontalScrollIndicator={false}
  //               showsVerticalScrollIndicator={false}
  //               data={picking_up_shopping}
  //               renderItem={renderQuickiesTile}
  //               keyExtractor={(item, id) => {
  //                 return item.message_id;
  //               }}
  //             />
  //             <Spacer position="top" size="medium" />
  //           </Container>
  //         )}
  //         {operation === "food_delivery" && status === "heading_to_drop_off" && (
  //           <Container
  //             width="100%"
  //             height="90%"
  //             color={theme.colors.bg.screens_bg}
  //           >
  //             <Spacer position="top" size="medium" />
  //             <FlatList
  //               showsHorizontalScrollIndicator={false}
  //               showsVerticalScrollIndicator={false}
  //               data={heading_to_drop_off}
  //               renderItem={renderQuickiesTile}
  //               keyExtractor={(item, id) => {
  //                 return item.message_id;
  //               }}
  //             />
  //             <Spacer position="top" size="medium" />
  //           </Container>
  //         )}
  //         {/* ************** RIDE SHARE ***************************** */}
  //         {operation === "ride_share" && status === "heading_to_passenger" && (
  //           <Container
  //             width="100%"
  //             height="90%"
  //             color={theme.colors.bg.screens_bg}
  //           >
  //             <Spacer position="top" size="medium" />
  //             <FlatList
  //               showsHorizontalScrollIndicator={false}
  //               showsVerticalScrollIndicator={false}
  //               data={heading_to_passenger}
  //               renderItem={renderQuickiesTile}
  //               keyExtractor={(item, id) => {
  //                 return item.message_id;
  //               }}
  //             />
  //             <Spacer position="top" size="medium" />
  //           </Container>
  //         )}
  //         {operation === "ride_share" && status === "close_to_passenger" && (
  //           <Container
  //             width="100%"
  //             height="90%"
  //             color={theme.colors.bg.screens_bg}
  //           >
  //             <Spacer position="top" size="medium" />
  //             <FlatList
  //               showsHorizontalScrollIndicator={false}
  //               showsVerticalScrollIndicator={false}
  //               data={close_to_passenger}
  //               renderItem={renderQuickiesTile}
  //               keyExtractor={(item, id) => {
  //                 return item.message_id;
  //               }}
  //             />
  //             <Spacer position="top" size="medium" />
  //           </Container>
  //         )}
  //         {operation === "ride_share" && status === "at_passenger_location" && (
  //           <Container
  //             width="100%"
  //             height="90%"
  //             color={theme.colors.bg.screens_bg}
  //           >
  //             <Spacer position="top" size="medium" />
  //             <FlatList
  //               showsHorizontalScrollIndicator={false}
  //               showsVerticalScrollIndicator={false}
  //               data={at_passenger_location}
  //               renderItem={renderQuickiesTile}
  //               keyExtractor={(item, id) => {
  //                 return item.message_id;
  //               }}
  //             />
  //             <Spacer position="top" size="medium" />
  //           </Container>
  //         )}
  //       </Container>
  //     </SafeArea>
  //   );
}
