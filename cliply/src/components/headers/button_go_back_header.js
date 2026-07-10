import React from "react";

import ExitIcon from "../../../assets/my-icons/exit_icon.svg";
import ArrowBackIcon from "../../../assets/my-icons/arrow_back_icon.svg";
import { Text } from "../../infrastructure/typography/text.component.js";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Outlined_CTA } from "../calls_to_action/outlined.cta.js";

export const Button_Go_Back_Header = ({
  action,
  caption = "",
  width = "100%",
  height = "8%",
  color = theme.colors.bg.elements_bg,
}) => {
  return (
    <Container
      width={width}
      height={height}
      align="flex-start"
      direction="row"
      justify="center"
      color={color}
    >
      <Container
        width="70%"
        height="100%"
        color={"transparent"}
        justify="center"
        align="flex-end"
        style={{ paddingRight: "5%" }}
      ></Container>
      <Container
        width="30%"
        height="100%"
        color={"transparent"}
        onPress={action}
      >
        <Outlined_CTA
          width={"65%"}
          height={"70%"}
          label={caption}
          border_width="2px"
          label_variant="dm_sans_bold_14"
          action={action}
        />
      </Container>
    </Container>
  );
};
