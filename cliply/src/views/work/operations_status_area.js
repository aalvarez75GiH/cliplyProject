import React from "react";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../infrastructure/theme";
import { Container } from "../../components/global_components/containers/general_containers";
import { Spacer } from "../../components/global_components/optimized.spacer.component";

import { Scrollable_Container } from "../../components/global_components/containers/general_containers";
import { Flex_Container } from "../../components/global_components/containers/general_containers";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component";
import { Operations_Status_Connector_Line } from "../../components/global_components/operations_status_connector_line.component";
import { Voice_Operations_Status_Step_Component } from "../../components/operations_components/voice_operations_status_step.component";
import { Operations_Status_Step_Component } from "../../components/operations_components/operations_status_step.component";
import { Operations_Status_Tile } from "../../components/tiles/operation_status.tile";

import { GlobalContext } from "../../infrastructure/services/global/global.context";

export const Operations_Status_Area = ({ operation, isLoading }) => {
  const navigation = useNavigation();

  const image_source_1 = require("../../../assets/illustrations/heading_to_pickup.png");
  const image_source_2 = require("../../../assets/illustrations/at-restaurant.png");
  const image_source_3 = require("../../../assets/illustrations/heading to drop off.png");
  const image_source_4 = require("../../../assets/illustrations/heading to passenger.png");
  const image_source_5 = require("../../../assets/illustrations/close to passenger.png");
  const image_source_6 = require("../../../assets/illustrations/at pickUp location.png");
  const { globalLanguage, userToDB } = React.useContext(GlobalContext);
  const { user_id } = userToDB || {};

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
        <Scrollable_Container
          width="100%"
          // height={"85%"}
          justify="flex-start"
          color={theme.colors.bg.elements_bg}
          // color={"blue"}
          align="center"
        >
          <Spacer position="top" size="small" />

          {/* ******************* FOOD DELIVERY OPERATION ****************************** */}
          {/* ******************* HEADING TO PICK UP STATUS ****************************** */}
          <Operations_Status_Tile
            caption_1={"Heading to"}
            caption_2={"pickup"}
            caption_3={"1"}
            image_source_1={image_source_1}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                status_name: "heading_to_pickup_shop",
                specificTextClipData,
              });
            }}
            status="heading_to_pickup_shop"
            step_number={"1"}
          />
          {/* <Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"pickup"}
            caption_3={"1"}
            image_source_1={image_source_1}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                status_name: "heading_to_pickup_shop",
                specificTextClipData,
              });
            }}
            status="heading_to_pickup_shop"
            step_number={"1"}
          /> */}

          <Spacer position="top" size="medium" />
          {/* <Operations_Status_Connector_Line side="right" /> */}

          {/* ******************* PICKING UP/SHOPPING STATUS ****************************** */}
          <Operations_Status_Tile
            caption_1={"Picking up"}
            caption_2={"Order"}
            caption_3={"2"}
            image_source_1={image_source_2}
            step_indicator_color={theme.colors.ui.food_delivery_theme_color}
            // action={() => null}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
                operation_name: "food_delivery",
                status_name: "picking_up_shopping",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                status_name: "picking_up_shopping",
                specificTextClipData, // Pass the data directly to the next screen
              });
            }}
            status="picking_up_shopping"
            step_number={"2"}
            inverted={true}
          />
          {/* <Operations_Status_Step_Component
            caption_1={"Picking up"}
            caption_2={"Order"}
            caption_3={"2"}
            image_source_1={image_source_2}
            step_indicator_color={theme.colors.ui.food_delivery_theme_color}
            // action={() => null}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
                operation_name: "food_delivery",
                status_name: "picking_up_shopping",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                status_name: "picking_up_shopping",
                specificTextClipData, // Pass the data directly to the next screen
              });
            }}
            status="picking_up_shopping"
            step_number={"2"}
            inverted={true}
          /> */}

          <Spacer position="top" size="medium" />
          {/* <Operations_Status_Connector_Line side="left" /> */}

          {/* ******************* HEADING TO DROP OFF STATUS ****************************** */}
          <Operations_Status_Tile
            caption_1={"Heading to"}
            caption_2={"drop off"}
            caption_3={"3"}
            image_source_1={image_source_3}
            step_indicator_color={theme.colors.ui.food_delivery_theme_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
                operation_name: "food_delivery",
                status_name: "heading_to_drop_off",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                specificTextClipData, // Pass the data directly to the next screen
                status_name: "heading_to_drop_off",
              });
            }}
            status="heading_to_drop_off"
            step_number={"3"}
          />
          {/* <Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"drop off"}
            caption_3={"3"}
            image_source_1={image_source_3}
            step_indicator_color={theme.colors.ui.food_delivery_theme_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_FOOD_DELIVERY,
                operation_name: "food_delivery",
                status_name: "heading_to_drop_off",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "food_delivery",
                specificTextClipData, // Pass the data directly to the next screen
                status_name: "heading_to_drop_off",
              });
            }}
            status="heading_to_drop_off"
            step_number={"3"}
          /> */}

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
        <Scrollable_Container
          width="100%"
          justify="flex-start"
          color={theme.colors.bg.elements_bg}
          // color={"blue"}
          align="center"
        >
          {/* ******************* HEADING TO PASSENGER STATUS ****************************** */}
          <Operations_Status_Tile
            caption_1={"Heading to"}
            caption_2={"passenger"}
            caption_3={"1"}
            image_source_1={image_source_4}
            step_indicator_color={theme.colors.ui.ride_share_theme_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_RIDE_SHARE,
                operation_name: "ride_share",
                status_name: "heading_to_passenger",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "ride_share",
                specificTextClipData, // Pass the data directly to the next screen
                status_name: "heading_to_passenger",
              });
            }}
            status="heading_to_passenger"
            step_number={"1"}
          />
          <Spacer position="top" size="medium" />

          {/* ******************* CLOSE TO PASSENGER STATUS ****************************** */}
          <Operations_Status_Tile
            caption_1={"Close to"}
            caption_2={"passenger"}
            caption_3={"2"}
            image_source_1={image_source_5}
            step_indicator_color={theme.colors.ui.ride_share_theme_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_RIDE_SHARE,
                operation_name: "ride_share",
                status_name: "close_to_passenger",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "ride_share",
                specificTextClipData, // Pass the data directly to the next screen
                status_name: "close_to_passenger",
              });
            }}
            status="close_to_passenger"
            step_number={"2"}
            inverted={true}
          />
          <Spacer position="top" size="medium" />
          {/* ******************* AT PICKUP LOCATION STATUS ****************************** */}

          <Operations_Status_Tile
            caption_1={"I am"}
            caption_2={"here"}
            caption_3={"3"}
            image_source_1={image_source_6}
            step_indicator_color={theme.colors.ui.ride_share_theme_color}
            action={() => {
              const specificTextClipData = {
                user_id: user_id,
                operation_id: process.env.OPERATION_ID_RIDE_SHARE,
                operation_name: "ride_share",
                status_name: "at_passenger_location",
              };
              navigation.navigate("Text_Clips_by_Status_View", {
                operation_name: "ride_share",
                specificTextClipData, // Pass the data directly to the next screen
                status_name: "at_passenger_location",
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
