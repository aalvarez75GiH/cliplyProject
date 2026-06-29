import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Animated, StyleSheet, View, Button } from "react-native";

import { theme } from "../../infrastructure/theme";
import { Container } from "../../components/global_components/containers/general_containers";
import { Spacer } from "../../components/global_components/optimized.spacer.component";

import { Scrollable_Container } from "../../components/global_components/containers/general_containers";
import { Flex_Container } from "../../components/global_components/containers/general_containers";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component";
import { Operations_Status_Connector_Line } from "../../components/global_components/operations_status_connector_line.component";
import { Operations_Status_Step_Component } from "../../components/operations_components/old_operations_status_step.component";
import { Voice_Operations_Status_Step_Component } from "../../components/operations_components/voice_operations_status_step.component";
import { Two_Rounded_Ctas_Belt } from "../../components/belts/two_semi_rounded_ctas_belt.component";

import { GlobalContext } from "../../infrastructure/services/global/global.context";
export const Voice_Operations_Status_Area = ({
  operation,
  isLoading,
  setTextClip_data_to_upload,
  textClip_data_to_upload,
}) => {
  const navigation = useNavigation();

  const image_source_1 = require("../../../assets/illustrations/heading_to_pickup.png");
  const image_source_2 = require("../../../assets/illustrations/at restaurant-shopping.png");
  const image_source_3 = require("../../../assets/illustrations/heading to drop off.png");
  const image_source_4 = require("../../../assets/illustrations/heading to passenger.png");
  const image_source_5 = require("../../../assets/illustrations/close to passenger.png");
  const image_source_6 = require("../../../assets/illustrations/at pickUp location.png");
  const { globalLanguage } = React.useContext(GlobalContext);
  //   const [operation, setOperation] = React.useState("food_delivery");
  // const slideAnim = useRef(new Animated.Value(0)).current; // Animation value

  useEffect(() => {
    console.log(
      "TEXT CLIP DATA TO UPLOAD AT OPERATION AREA:",
      JSON.stringify(textClip_data_to_upload, null, 2)
    );
  }, [textClip_data_to_upload]);

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

  return (
    <Flex_Container
      width="100%"
      height={"67%"}
      justify="center"
      //   color={"lightblue"}
      align="center"
      color={theme.colors.bg.screens_bg}
    >
      {isLoading ? (
        <Container
          width="100%"
          height={"81%"}
          color={"lightblue"}
          justify="center"
          align="center"
        >
          <Loading_Spinner_area />
        </Container>
      ) : operation === "food_delivery" ? (
        // <Animated.View style={[{ transform: [{ translateX: slideAnim }] }]}>
        <Scrollable_Container
          width="100%"
          // height={"85%"}
          justify="flex-start"
          color={theme.colors.bg.elements_bg}
          // color={"blue"}
          align="center"
        >
          <Spacer position="top" size="small" />
          {/* ******************************************* */}
          <Container
            width="100%"
            height={"08%"}
            justify="space-around"
            color={theme.colors.bg.elements_bg}
            //   color={"blue"}
            align="center"
            direction="row"
          />

          {/* ******************* FOOD DELIVERY OPERATION ****************************** */}
          {/* ******************* HEADING TO PICK UP STATUS ****************************** */}
          <Voice_Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"pickup"}
            // caption_2={globalLanguage === "EN" ? "pickup/shop" : "recoger"}
            caption_3={"1"}
            image_source_1={image_source_1}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "food_delivery",
                status_name: "heading_to_pickup_shop",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Food Delivery",
                status_label: "Heading to pickup",
              });
            }}
            status="heading_to_pickup_shop"
            step_number={"1"}
          />

          <Operations_Status_Connector_Line side="right" />

          {/* ******************* PICKING UP/SHOPPING STATUS ****************************** */}
          <Voice_Operations_Status_Step_Component
            // caption_1={"Picking up"}
            caption_1={"Picking up"}
            caption_2={""}
            caption_3={"2"}
            image_source_1={image_source_2}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            // action={() => null}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "food_delivery",
                status_name: "picking_up_shopping",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Food Delivery",
                status_label: "Picking up",
              });
            }}
            status="picking_up_shopping"
            step_number={"2"}
          />

          <Operations_Status_Connector_Line side="left" />

          {/* ******************* HEADING TO DROP OFF STATUS ****************************** */}
          <Voice_Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"drop off"}
            caption_3={"3"}
            image_source_1={image_source_3}
            step_indicator_color={theme.colors.ui.food_delivery_theme_color}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "food_delivery",
                status_name: "heading_to_drop_off",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Food Delivery",
                status_label: "Heading to drop off",
              });
            }}
            status="heading_to_drop_off"
            step_number={"3"}
          />

          <Container
            width="100%"
            height={"5%"}
            justify="center"
            color={theme.colors.bg.elements_bg}
            //color={"red"}
            align="center"
            direction="row"
          />
          {/* ******************* RIDE SHARE OPERATION ****************************** */}
        </Scrollable_Container>
      ) : operation === "ride_share" ? (
        // <Animated.View style={[{ transform: [{ translateX: slideAnim }] }]}>
        <Scrollable_Container
          width="100%"
          justify="flex-start"
          color={theme.colors.bg.elements_bg}
          // color={"blue"}
          align="center"
        >
          <Container
            width="100%"
            height={"08%"}
            justify="space-around"
            color={theme.colors.bg.elements_bg}
            //   color={"blue"}
            align="center"
            direction="row"
          />

          {/* ******************* HEADING TO PASSENGER STATUS ****************************** */}
          <Voice_Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"passenger"}
            caption_3={"1"}
            image_source_1={image_source_4}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "ride_share",
                status_name: "heading_to_passenger",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Ride Share",
                status_label: "Heading to Passenger",
              });
            }}
            status="heading_to_passenger"
            step_number={"1"}
          />

          <Operations_Status_Connector_Line side="right" />
          {/* ******************* CLOSE TO PASSENGER STATUS ****************************** */}
          <Voice_Operations_Status_Step_Component
            caption_1={"Close to"}
            caption_2={"passenger"}
            caption_3={"2"}
            image_source_1={image_source_5}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "ride_share",
                status_name: "close_to_passenger",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Ride Share",
                status_label: "Close to Passenger",
              });
            }}
            status="close_to_passenger"
            step_number={"2"}
          />

          <Operations_Status_Connector_Line side="left" />
          {/* ******************* AT PICKUP LOCATION STATUS ****************************** */}

          <Voice_Operations_Status_Step_Component
            caption_1={"I am"}
            caption_2={"here"}
            caption_3={"3"}
            image_source_1={image_source_6}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            action={() => {
              setTextClip_data_to_upload((prev) => ({
                ...prev,
                operation_name: "ride_share",
                status_name: "at_passenger_location",
              }));
              navigation.navigate("Uploading_Message_View", {
                operation_label: "Ride Share",
                status_label: "I am here",
              });
            }}
            status="at_passenger_location"
            step_number={"3"}
          />

          <Container
            width="100%"
            height={"10%"}
            justify="center"
            color={theme.colors.bg.elements_bg}
            //color={"red"}
            align="center"
            direction="row"
          />
        </Scrollable_Container>
      ) : // </Animated.View>
      null}
    </Flex_Container>
  );
};
