import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { theme } from "../../infrastructure/theme";
import {
  Action_Container,
  Container,
} from "../../components/global_components/containers/general_containers";
import { Spacer } from "../../components/global_components/optimized.spacer.component";

import { Scrollable_Container } from "../../components/global_components/containers/general_containers";
import { Flex_Container } from "../../components/global_components/containers/general_containers";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component";
import { Operations_Status_Connector_Line } from "../../components/global_components/operations_status_connector_line.component";
import { Operations_Status_Step_Component } from "../../components/operations_components/old_operations_status_step.component";
import { Text } from "../../infrastructure/typography/text.component";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";

export const Work_Flow_Area = ({ operation, isLoading }) => {
  const navigation = useNavigation();
  const {
    nextStep,
    nextStepRS,
    setDataForUsedCountUpdate,
    setSpecificTextClipData,
  } = useContext(TextClipsContext);

  const { userToDB, globalLanguage } = useContext(GlobalContext);
  const { user_id } = userToDB || {}; // Ensure userToDB is not undefined or null

  const image_source_2 = require("../../../assets/illustrations/at restaurant-shopping.png");
  const image_source_5 = require("../../../assets/illustrations/close to passenger.png");
  const OPERATION_ID_FOOD_DELIVERY = "ac33dc0e-27df-4bec-8390-f63049cc0737";
  const OPERATION_ID_RIDE_SHARE = "c98742b6-74a7-4625-b3fb-ab1bb8a0d4b6";

  return (
    <Scrollable_Container
      width="100%"
      height={"67%"}
      justify="center"
      //color={"lightblue"}
      align="center"
      color={theme.colors.bg.screens_bg}
    >
      {isLoading && (
        <Container
          width="100%"
          height={"81%"}
          color={"lightblue"}
          justify="center"
          align="center"
        >
          <Loading_Spinner_area />
        </Container>
      )}
      {/* ************************* FOOD DELIVERY/GROCERIES *************************************** */}
      <Action_Container
        width="100%"
        height={"50%"}
        // color={"red"}
        color={"transparent"}
        justify="center"
        align="center"
        direction="row"
        onPress={() => {
          const specificTextClipData = {
            user_id: user_id,
            operation_id: OPERATION_ID_FOOD_DELIVERY,
            operation_name: "food_delivery",
          };

          navigation.navigate(nextStep.status_view, {
            ...nextStep,
            specificTextClipData, // Pass the data directly to the next screen
          });

          setSpecificTextClipData(specificTextClipData);
        }}
      >
        <Container
          width="50%"
          height={"85%"}
          // color={"green"}
          color={"transparent"}
          justify="center"
          align="center"
        >
          <Container
            width="100%"
            height={"70%"}
            // color={"brown"}
            color={"transparent"}
            justify="center"
            align="center"
            style={{ overflow: "hidden" }}
          >
            <Image
              source={image_source_2}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: 1024 / 650,
                borderRadius: 0,
              }}
              contentFit="cover"
            />
          </Container>
          <Container
            width="100%"
            height="45%"
            justify="center"
            align="center"
            color="black"
            direction="column"
          >
            <Text variant="dm_sans_bold_16_white">
              {globalLanguage === "EN" ? "Food/Groceries" : "Delivery"}{" "}
            </Text>
            <Text variant="dm_sans_bold_16_white">
              {globalLanguage === "EN" ? "deliveries" : "Compras"}
            </Text>
          </Container>
        </Container>

        <Container
          width="40%"
          height={"98%"}
          // color={"purple"}
          color={"#CEE3DA"}
          justify="center"
          align="center"
        >
          <Container width="70%" color="transparent">
            <Text
              variant="dm_sans_bold_16"
              style={{
                textAlign: "center",
                paddingTop: 5,
                color: "#0A7346",
              }}
            >
              {globalLanguage === "EN"
                ? "Tap here if you have a food or groceries delivery order"
                : "Presiona aqui si tienes un pedido de comida"}
            </Text>
          </Container>
        </Container>
        <Spacer position="bottom" size="large" />
      </Action_Container>

      {/* ************************* SPLITTER *************************************** */}
      <Container
        width="100%"
        height={"2%"}
        // color={"yellow"}
        color={"transparent"}
        align="center"
        justify="flex-end"
      >
        <Spacer position="top" size="small"></Spacer>
        <Container width="90%" height={"10%"} color={"#898989"} />
      </Container>

      {/* ************************* RIDE SHARE *************************************** */}
      <Action_Container
        width="100%"
        height={"50%"}
        // color={"green"}
        color={"transparent"}
        justify="center"
        align="center"
        direction="column"
        // onPress={() => navigation.navigate(nextStepRS.status_view, nextStepRS)}
        onPress={() => {
          const specificTextClipData = {
            user_id: user_id,
            operation_id: OPERATION_ID_RIDE_SHARE,
            operation_name: "ride_share",
          };

          navigation.navigate(nextStepRS.status_view, {
            ...nextStepRS,
            specificTextClipData, // Pass the data directly to the next screen
          });

          setSpecificTextClipData(specificTextClipData);
        }}
      >
        <Container
          width="100%"
          height={"50%"}
          // color={"pink"}
          color={"transparent"}
          justify="center"
          align="center"
          direction="row"
        >
          <Container
            width="15%"
            height={"100%"}
            // color={"yellow"}
            color={"transparent"}
            justify="center"
            align="center"
          />

          <Container
            width="92%"
            height={"100%"}
            // color={"blue"}
            color={"transparent"}
            justify="center"
            align="center"
            direction="row"
          >
            <Container
              // width="186px"
              // height={"178px"}
              width="45%"
              height={"100%"}
              color={"transparent"}
              // color={"red"}
              justify="center"
              align="center"
              style={{ overflow: "hidden" }}
            >
              <Image
                source={image_source_5}
                style={{
                  width: "80%",
                  height: "110%",
                  aspectRatio: 1024 / 850,
                  borderRadius: 0,
                }}
                contentFit="cover"
              />
            </Container>
            <Container
              // width="186px"
              // height={"178px"}
              width="55%"
              height={"100%"}
              // color={"lightblue"}
              color={theme.colors.ui.primary}
              justify="center"
              align="center"
              style={{ overflow: "hidden" }}
            >
              <Text variant="dm_sans_bold_16_white">
                {globalLanguage === "EN" ? "Ride share" : "Rides pasajeros"}
              </Text>
              {/* <Text variant="dm_sans_bold_14_white">text clips flow</Text> */}
            </Container>
            <Container
              width="15%"
              height={"100%"}
              // color={"yellow"}
              color={"transparent"}
              justify="center"
              align="center"
            />
          </Container>
        </Container>

        {/* ******************************************************** */}

        <Container
          width="100%"
          height={"40%"}
          // color={"purple"}
          // color={"#D4DDEA"}
          color={"transparent"}
          justify="center"
          align="center"
        >
          <Container
            width="100%"
            height={"100%"}
            // color={"pink"}
            color={"transparent"}
            justify="center"
            align="center"
            direction="row"
          >
            <Container
              width="5%"
              height={"100%"}
              color={"transparent"}
              // color={"brown"}
              justify="center"
              align="center"
            />
            <Spacer position="left" size="small" />
            <Container
              width="92%"
              height={"100%"}
              color={"#D4DDEA"}
              //color={"red"}
              // color={"transparent"}
              justify="center"
              align="center"
            >
              <Text
                variant="dm_sans_bold_16"
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  color: "#265697",
                }}
              >
                {globalLanguage === "EN"
                  ? "Tap here if you have a ride share"
                  : "Presiona aqui si tienes un viaje"}
              </Text>
            </Container>
            <Container
              width="5%"
              height={"100%"}
              // color={"yellow"}
              color={"transparent"}
              justify="center"
              align="center"
            />
          </Container>
        </Container>
      </Action_Container>
    </Scrollable_Container>
  );
};
