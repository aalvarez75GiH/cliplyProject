// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../infrastructure/typography/text.component";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import { Spacer } from "../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";

import NextArrowIcon from "../../../assets/my-icons/arrow_next_icon.svg";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";

export const Status_Next_Step_Bottom_Bar = () => {
  const {
    nextStep,
    setNextStep,
    nextStepInitialState,
    setDataForUsedCountUpdate,
    setSpecificTextClipData,
  } = useContext(TextClipsContext);

  const { userToDB } = useContext(GlobalContext);
  const { user_id } = userToDB || {}; // Ensure userToDB is not undefined or null

  const navigation = useNavigation();

  const resetNextStepState = (bottom_bar_caption) => {
    if (
      bottom_bar_caption === "Restart" ||
      bottom_bar_caption === "Reiniciar"
    ) {
      setNextStep(nextStepInitialState);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home_View" }],
      });
    } else {
      //   navigation.navigate(nextStep.status_view, nextStep);
      const specificTextClipData = {
        operation_id:
          nextStep.operation_name === "food_delivery"
            ? "ac33dc0e-27df-4bec-8390-f63049cc0737"
            : "c98742b6-74a7-4625-b3fb-ab1bb8a0d4b6",
        operation_name:
          nextStep.operation_name === "food_delivery"
            ? "food_delivery"
            : "ride_share",
        user_id: user_id,
      };

      navigation.navigate(nextStep.status_view, {
        ...nextStep,
        specificTextClipData, // Pass the data directly to the next screen
      });

      setSpecificTextClipData(specificTextClipData);
    }
  };
  //   const { globalLanguage } = useContext(GlobalContext);
  return (
    <Action_Container
      width="100%"
      height="10%"
      justify="center"
      align="center"
      color={theme.colors.ui.food_delivery_theme_color}
      direction="row"
      onPress={() => resetNextStepState(nextStep.bottom_bar_caption)}
    >
      <Container
        width="80%"
        height="100%"
        justify="center"
        align="center"
        direction="row"
        // color={theme.colors.bg.elements_bg}
        color={
          nextStep.operation_name === "food_delivery"
            ? theme.colors.ui.food_delivery_theme_color
            : theme.colors.ui.ride_share_theme_color
        }
      >
        <Spacer position="left" size="extraLarge" />
        <Spacer position="left" size="extraLarge" />
        <Spacer position="left" size="large" />

        <Text variant="dm_sans_bold_16_white">
          {nextStep.bottom_bar_caption}
        </Text>
      </Container>
      <Container
        width="20%"
        height="100%"
        color={
          nextStep.operation_name === "food_delivery"
            ? theme.colors.ui.food_delivery_theme_color
            : theme.colors.ui.ride_share_theme_color
        }
        //color={"blue"}
        onPress={() => null}
      >
        {nextStep.bottom_bar_caption !== "Restart" &&
          nextStep.bottom_bar_caption !== "Reiniciar" && (
            <NextArrowIcon
              width={24}
              height={24}
              fill={theme.colors.ui.secondary}
            />
          )}
      </Container>
    </Action_Container>
  );
};
