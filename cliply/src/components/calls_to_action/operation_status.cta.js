import React from "react";
import { Platform } from "react-native";
import { Image } from "expo-image";

import { Text } from "../../infrastructure/typography/text.component";

import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import { Spacer } from "../global_components/optimized.spacer.component";
import { Circular_Step_Indicator } from "../global_components/small_circular_step_indicator.component";

export const Operation_Status_CTA = ({
  caption_1,
  caption_2,
  action,
  inverted = false,
  aspectRatio = 990 / 650,
  radius = 16,
  image_source,
  step_number,
  operation,
}) => {
  console.log("Operation_Status_CTA rendered with operation:", operation);
  const isFoodDelivery = operation === "food_delivery";
  return !inverted ? (
    <Action_Container
      width="100%"
      height="100%"
      justify="center"
      align="center"
      color={
        isFoodDelivery
          ? theme.colors.ui.food_delivery_gradient_color
          : theme.colors.ui.ride_share_gradient_color
      }
      direction="row"
      onPress={action}
    >
      <Container
        width="50%"
        height="100%"
        color={theme.colors.ui.primary} // Fallback to "red" if theme is undefined
        justify="center"
        align="center"
        //color="red"
        direction="row"
        style={{ overflow: "hidden" }}
      >
        <Image
          source={image_source}
          style={{
            width: "120%",
            height: "100%",
            // aspectRatio,
            aspectRatio: 800 / 550,
            borderRadius: radius,
            borderRadiusTopLeft: 0,
            borderRadiusBottomLeft: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          contentFit="cover"
        />
      </Container>
      <Container
        width="50%"
        height="100%"
        justify="center"
        align="center"
        color="transparent"
        //color="pink"
        direction="colum"
      >
        <Spacer position="bottom" size="medium" />
        <Spacer position="left" size="medium">
          <Text
            variant="dm_sans_bold_20_white"
            style={{
              color: isFoodDelivery
                ? theme.colors.ui.food_delivery_theme_color
                : theme.colors.ui.ride_share_theme_color,
            }}
          >
            {caption_1}
          </Text>
          {caption_2 !== "" && (
            <Text
              variant="dm_sans_bold_20_white"
              style={{
                color: isFoodDelivery
                  ? theme.colors.ui.food_delivery_theme_color
                  : theme.colors.ui.ride_share_theme_color,
              }}
            >
              {caption_2}
            </Text>
          )}
        </Spacer>
        <Spacer position="bottom" size="large" />
      </Container>
    </Action_Container>
  ) : (
    <Action_Container
      width="100%"
      height="100%"
      justify="center"
      align="center"
      color={
        isFoodDelivery
          ? theme.colors.ui.food_delivery_gradient_color
          : theme.colors.ui.ride_share_gradient_color
      }
      direction="row"
      onPress={action}
    >
      <Container
        width="50%"
        height="100%"
        justify="center"
        align="center"
        color="transparent"
        //color="pink"
        direction="colum"
      >
        <Spacer position="bottom" size="medium" />
        <Spacer position="left" size="medium">
          <Text
            variant="dm_sans_bold_20_white"
            style={{
              color: isFoodDelivery
                ? theme.colors.ui.food_delivery_theme_color
                : theme.colors.ui.ride_share_theme_color,
            }}
          >
            {caption_1}
          </Text>
          {caption_2 !== "" && (
            <Text
              variant="dm_sans_bold_20_white"
              style={{
                color: isFoodDelivery
                  ? theme.colors.ui.food_delivery_theme_color
                  : theme.colors.ui.ride_share_theme_color,
              }}
            >
              {caption_2}
            </Text>
          )}
        </Spacer>
        <Spacer position="bottom" size="large" />
      </Container>
      <Container
        width="50%"
        height="100%"
        color={theme.colors.ui.primary} // Fallback to "red" if theme is undefined
        justify="center"
        align="center"
        //color="red"
        direction="row"
        style={{ overflow: "hidden" }}
      >
        <Image
          source={image_source}
          style={{
            width: "130%",
            height: "100%",
            aspectRatio: 800 / 550,
            borderRadius: radius,
            borderRadiusTopLeft: 0,
            borderRadiusBottomLeft: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          contentFit="cover"
        />
      </Container>
    </Action_Container>
  );
};
