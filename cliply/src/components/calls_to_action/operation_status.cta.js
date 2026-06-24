import React from "react";
import { Image } from "expo-image";

import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";

import ChevronArrowIcon from "../../../assets/my-icons/chevron-right.svg";
import { Spacer } from "../global_components/optimized.spacer.component";

export const Operation_Status_CTA = ({
  caption_1,
  caption_2,
  action,
  inverted = false,
  radius = 16,
  image_source,
  operation,
}) => {
  const isFoodDelivery = operation === "food_delivery";

  const textColor = isFoodDelivery
    ? theme.colors.ui.food_delivery_theme_color
    : theme.colors.ui.ride_share_theme_color;

  const bgColor = isFoodDelivery
    ? theme.colors.ui.food_delivery_gradient_color
    : theme.colors.ui.ride_share_gradient_color;
  const TextSide = () => (
    <Container
      width="50%"
      height="100%"
      justify="center"
      align="center"
      color="transparent"
      direction="column"
      style={{ paddingHorizontal: 16 }}
    >
      <Text
        variant="dm_sans_bold_20_white"
        style={{
          color: textColor,
          textAlign: "center",
          lineHeight: 26,
        }}
      >
        {caption_1}
      </Text>

      {caption_2 !== "" && (
        <Container
          width="100%"
          height="32px"
          direction="row"
          align="center"
          justify="center"
          color="transparent"
          style={{ marginTop: 0 }}
        >
          <Text
            variant="dm_sans_bold_20_white"
            style={{
              color: textColor,
              textAlign: "center",
              lineHeight: 26,
            }}
          >
            {caption_2}
          </Text>

          <Spacer position="left" size="medium">
            <ChevronArrowIcon
              width={12}
              height={12}
              color={textColor}
              style={{ marginLeft: 8 }}
            />
          </Spacer>
        </Container>
      )}
    </Container>
  );

  const ImageSide = ({ left }) => (
    <Container
      width="50%"
      height="100%"
      color={theme.colors.ui.primary}
      justify="center"
      align="center"
      direction="row"
      style={{ overflow: "hidden" }}
      border_radius_top_left={left ? 24 : 0}
      border_radius_top_right={left ? 0 : 24}
      border_radius_bottom_left={left ? 24 : 0}
      border_radius_bottom_right={left ? 0 : 24}
    >
      <Image
        source={image_source}
        style={{
          width: left ? "120%" : "130%",
          height: "100%",
          aspectRatio: left ? 750 / 550 : 800 / 550,
          borderRadius: radius,
          borderTopLeftRadius: left ? 24 : 0,
          borderBottomLeftRadius: left ? 24 : 0,
          borderTopRightRadius: left ? 0 : 24,
          borderBottomRightRadius: left ? 0 : 24,
        }}
        contentFit="cover"
      />
    </Container>
  );

  return (
    <Action_Container
      width="100%"
      height="100%"
      justify="center"
      align="center"
      color={bgColor}
      direction="row"
      onPress={action}
      style={{ overflow: "hidden" }}
      border_radius_top_left={24}
      border_radius_top_right={24}
      border_radius_bottom_left={24}
      border_radius_bottom_right={24}
    >
      {!inverted ? (
        <>
          <ImageSide left />
          <TextSide />
        </>
      ) : (
        <>
          <TextSide />
          <ImageSide left={false} />
        </>
      )}
    </Action_Container>
  );
};
