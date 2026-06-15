import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

import { Text } from "../../infrastructure/typography/text.component.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";

export const Menu_Tile = ({
  Icon,
  width,
  height,
  caption,
  color,
  action,
  isLoading = false,
}) => {
  // console.log("IS LOADING AT TILE:", isLoading);

  return (
    <>
      {isLoading && (
        <Container
          width="100%"
          height="50%"
          align="center"
          direction="row"
          justify="center"
          color={theme.colors.bg.elements_bg}
          // color={"#FAD"}
        >
          <ActivityIndicator size="small" color="#000000" />
        </Container>
      )}
      {!isLoading && (
        <Action_Container
          width="100%"
          height="50%"
          align="center"
          justify="center"
          direction="row"
          color={theme.colors.bg.elements_bg}
          onPress={action}
        >
          <Container
            width="20%"
            height="100%"
            align="center"
            justify="center"
            color={theme.colors.bg.elements_bg}
            // color={"green"}
          >
            <Icon width={width} height={height} fill={color} />
          </Container>
          <Container
            width="80%"
            height="100%"
            align="flex-start"
            justify="center"
            color={theme.colors.bg.elements_bg}
            //color={"blue"}
          >
            <Text variant="dm_sans_bold_18">{caption}</Text>
          </Container>
        </Action_Container>
      )}
    </>
  );
};
