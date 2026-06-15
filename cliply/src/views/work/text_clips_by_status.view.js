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
  const isFoodDelivery = operation_name === "food_delivery";

  const {
    renderStoredMessagesTile,
    setSelectedItemId,
    setIntroAdded,
    setSpecificTextClipData,
  } = useContext(TextClipsContext);

  const { globalLanguage, userData } = useContext(GlobalContext);
  const [dataToRender, setDataToRender] = useState([]);
  const [headers_caption, set_Headers_Caption] = useState("");

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
      set_Headers_Caption(""); // Reset headers or perform other cleanup
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

  const step_component_EN_or_ES = {
    caption_1_FD_EN: "Heading to",
    caption_1_FD_ES: "Iendo a",
    caption_2_FD_EN: "pickup/shop",
    caption_2_FD_ES: "recoger",
    caption_1_RS_EN: "Heading to",
    caption_1_RS_ES: "Iendo al",
    caption_2_RS_EN: "passenger",
    caption_2_RS_ES: "pasajero",
  };

  const statusImages = {
    food_delivery: {
      heading_to_pickup: fd_heading_to_pickup,
      picking_up_shopping: fd_at_restaurant,
      heading_to_drop_off: fd_heading_to_dropoff,
    },
    ride_share: {
      heading_to_passenger: rs_heading_to_passenger,
      close_to_passenger: rs_close_to_passanger,
      at_passenger_location: rs_at_passenger,
    },
  };

  const currentImage =
    statusImages?.[operation_name]?.[status_name] || fd_heading_to_pickup;

  console.log("CURRENT IMAGE SOURCE: ", currentImage);
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
            caption_1={
              isFoodDelivery && globalLanguage === "EN"
                ? step_component_EN_or_ES.caption_1_FD_EN
                : isFoodDelivery && globalLanguage === "ES"
                ? step_component_EN_or_ES.caption_1_FD_ES
                : !isFoodDelivery && globalLanguage === "EN"
                ? step_component_EN_or_ES.caption_1_RS_EN
                : step_component_EN_or_ES.caption_1_RS_ES
            }
            caption_2={
              isFoodDelivery && globalLanguage === "EN"
                ? step_component_EN_or_ES.caption_2_FD_EN
                : isFoodDelivery && globalLanguage === "ES"
                ? step_component_EN_or_ES.caption_2_FD_ES
                : !isFoodDelivery && globalLanguage === "EN"
                ? step_component_EN_or_ES.caption_2_RS_EN
                : step_component_EN_or_ES.caption_2_RS_ES
            }
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
