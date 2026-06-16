import React, { useState, useContext, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { theme } from "../../infrastructure/theme/index";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Container } from "../../components/global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component";
import { Restart_flow_operation_status_process_header } from "../../components/headers/restart_flow_operation_status_process.header";
import { Operations_Status_Step_Component } from "../../components/operations_components/operations_status_step.component";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";

export default function Text_Clips_by_Status_View({ route }) {
  const { operation_name, status_name, specificTextClipData } = route.params;
  console.log(
    "OPERATION AND STATUS PARAMS IN CLIPS BY STATUS VIEW: ",
    operation_name,
    status_name
  );

  const {
    renderStoredMessagesTile,
    setSelectedItemId,
    setIntroAdded,
    setSpecificTextClipData,
  } = useContext(TextClipsContext);

  const { globalLanguage, userData } = useContext(GlobalContext);
  const [dataToRender, setDataToRender] = useState([]);

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
        caption_2: "drop-off",
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
      <Container
        width="100%"
        height={"100%"}
        color={theme.colors.bg.screens_bg}
      >
        <Restart_flow_operation_status_process_header />
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

        {/* <Add_intro_CTA introAdded={introAdded} setIntroAdded={setIntroAdded} /> */}
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
              <Text variant="middle_screens_caption" style={{ fontSize: 28 }}>
                No Messages!!
              </Text>
            </Container>
          )}

          {dataToRender.length > 0 && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataToRender}
              renderItem={renderStoredMessagesTile}
              keyExtractor={(item, id) => {
                return item.message_id;
              }}
            />
          )}
          <Spacer position="top" size="large" />
        </Container>
      </Container>
    </SafeArea>
  );
}
