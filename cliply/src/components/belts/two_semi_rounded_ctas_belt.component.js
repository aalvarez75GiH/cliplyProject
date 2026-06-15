import React from "react";

import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import {
  Action_Container,
  Container,
} from "../../../src/components/global_components/containers/general_containers";

export const Two_Rounded_Ctas_Belt = ({
  action_1,
  action_2,
  cta_active_color,
  cta_not_active_color,
  cta_caption_active_variant,
  cta_caption_not_active_variant,
  operation,
  border_radius = "30px",
}) => {
  return (
    <Container
      width={"100%"}
      height={"10%"}
      justify="space-around"
      align="center"
      direction="row"
      color={theme.colors.bg.elements_bg}
      margin_top={"0.7%"}
    >
      <Action_Container
        width={"40%"}
        height={"65%"}
        // color={theme.colors.ui.primary}
        color={
          operation === "food_delivery"
            ? cta_active_color
            : cta_not_active_color
        }
        border_radius={border_radius}
        onPress={action_1}
      >
        {/* <Text variant="dm_sans_bold_14_white">Food Delivery</Text> */}
        <Text
          variant={
            operation === "food_delivery"
              ? cta_caption_active_variant
              : cta_caption_not_active_variant
          }
        >
          Food Delivery
        </Text>
      </Action_Container>
      <Action_Container
        width={"40%"}
        height={"65%"}
        // color={theme.colors.ui.primary}
        color={
          operation === "ride_share" ? cta_active_color : cta_not_active_color
        }
        border_radius={border_radius}
        onPress={action_2}
      >
        <Text
          variant={
            operation === "ride_share"
              ? cta_caption_active_variant
              : cta_caption_not_active_variant
          }
        >
          Ride Share
        </Text>
      </Action_Container>
    </Container>
  );
};
