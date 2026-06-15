// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React from "react";

import { Text } from "../../infrastructure/typography/text.component";

import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import { Spacer } from "../global_components/optimized.spacer.component";

export const Status_CTA_component = ({
  Icon,
  caption1,
  caption2,
  width,
  height,
  action,
  icon_bg_color,
}) => {
  return (
    <Action_Container
      width={"255px"}
      height={"125px"}
      justify="center"
      align="center"
      color={theme.colors.bg.screens_bg}
      //   color={"red"}
      direction="row"
      onPress={action}
      //   border={`2px solid ${theme.colors.ui.primary}`}
      border_radius={"10px"}
    >
      <Container
        width={"33%"}
        height={"90%"}
        color={theme.colors.ctas.tertiary}
        // color={"blue"}
        justify="center"
        align="center"
      >
        <Container
          width={"70px"}
          height={"70px"}
          justify="center"
          align="center"
          color={icon_bg_color ? icon_bg_color : theme.colors.bg.elements_bg}
          //   color={"green"}
          direction="row"
          border_radius={"40px"}
        >
          <Icon width={width} height={height} />
        </Container>
      </Container>
      <Container
        border_radius={"10px"}
        width={"63%"}
        height={"90%"}
        color={theme.colors.ctas.tertiary}
        // color={"red"}
        align="flex-start"
      >
        <Spacer position="left" size="medium">
          <Text variant="dm_sans_bold_18">{caption1}</Text>
          <Text variant="dm_sans_bold_18">{caption2}</Text>
        </Spacer>
      </Container>

      {/* <Text variant="stages_ctas_white">1</Text> */}
    </Action_Container>
  );
};
