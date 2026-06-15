import React from "react";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../infrastructure/theme";
import { Container } from "../../../components/global_components/containers/general_containers";
import { Spacer } from "../../../components/global_components/optimized.spacer.component";

import { Scrollable_Container } from "../../../components/global_components/containers/general_containers";
import { Flex_Container } from "../../../components/global_components/containers/general_containers";
import { Loading_Spinner_area } from "../../../components/global_components/global_loading_spinner_area.component";
import { Operations_Status_Connector_Line } from "../../../components/global_components/operations_status_connector_line.component";
import { Operations_Status_Step_Component } from "../../../components/operations_components/operations_status_step.component";

export const Operations_Status_Area = ({ operation, isLoading }) => {
  const navigation = useNavigation();

  const image_source_1 = require("../../../../assets/illustrations/heading_to_pickup.png");
  const image_source_2 = require("../../../../assets/illustrations/at restaurant-shopping.png");
  const image_source_3 = require("../../../../assets/illustrations/heading to drop off.png");
  const image_source_4 = require("../../../../assets/illustrations/heading to passenger.png");
  const image_source_5 = require("../../../../assets/illustrations/close to passenger.png");
  const image_source_6 = require("../../../../assets/illustrations/at pickUp location.png");

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
          {/* <Spacer position="top" size="small" /> */}
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
          <Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"pickup/shop"}
            caption_3={"1"}
            image_source_1={image_source_1}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            inverted={false}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "food_delivery",
                status_name: "heading_to_pickup/shop",
                caption: "Heading to pickup/shop",
              })
            }
            status="heading_to_pickup_shop"
            step_number={"1"}
          />

          {/* <Operations_Status_Connector_Line side="right" /> */}

          {/* ******************* PICKING UP/SHOPPING STATUS ****************************** */}
          <Operations_Status_Step_Component
            caption_1={"Picking up"}
            caption_2={"Shopping"}
            caption_3={"2"}
            image_source_1={image_source_2}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            inverted={true}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "food_delivery",
                status_name: "picking_up/shopping",
                caption: "Picking up / Shopping",
              })
            }
            status="picking_up_shopping"
            step_number={"2"}
          />

          <Operations_Status_Connector_Line side="left" />

          {/* ******************* HEADING TO DROP OFF STATUS ****************************** */}
          <Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"drop off"}
            caption_3={"3"}
            image_source_1={image_source_3}
            step_indicator_color={theme.colors.ui.food_delivery_op_color}
            inverted={false}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "food_delivery",
                status_name: "heading_to_drop_off",
                caption: "Heading to drop off",
              })
            }
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
          <Operations_Status_Step_Component
            caption_1={"Heading to"}
            caption_2={"Passenger"}
            caption_3={"1"}
            image_source_1={image_source_4}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            inverted={false}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "ride_share",
                status_name: "heading_to_passenger",
                caption: "Heading to Passenger",
              })
            }
            status="heading_to_passenger"
            step_number={"1"}
          />

          <Operations_Status_Connector_Line side="right" />
          {/* ******************* CLOSE TO PASSENGER STATUS ****************************** */}
          <Operations_Status_Step_Component
            caption_1={"Close to"}
            caption_2={"Passenger"}
            caption_3={"2"}
            image_source_1={image_source_5}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            inverted={true}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "ride_share",
                status_name: "close_to_passenger",
                caption: "Close to Passenger",
              })
            }
            status="close_to_passenger"
            step_number={"2"}
          />

          <Operations_Status_Connector_Line side="left" />
          {/* ******************* AT PICKUP LOCATION STATUS ****************************** */}

          <Operations_Status_Step_Component
            caption_1={"At pickup"}
            caption_2={"location"}
            caption_3={"3"}
            image_source_1={image_source_6}
            step_indicator_color={theme.colors.ui.ride_share_op_color}
            inverted={false}
            action={() =>
              navigation.navigate("Clips_by_Operations_And_Status_View", {
                operation_name: "ride_share",
                status_name: "at_passenger_location",
                caption: "At Passengers location",
              })
            }
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
      ) : null}
    </Flex_Container>
  );
};
