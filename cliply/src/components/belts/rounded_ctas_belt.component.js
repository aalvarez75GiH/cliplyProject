import React from "react";

import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import {
  Action_Container,
  Container,
} from "../../../src/components/global_components/containers/general_containers";

export const Rounded_Ctas_Belt = ({ action_1 }) => {
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
        width={"28%"}
        height={"50%"}
        color={theme.colors.ui.primary}
        border_radius={"25px"}
        onPress={action_1}
      >
        <Text variant="semi_rounded_ctas_white">Recents</Text>
      </Action_Container>
      <Action_Container
        width={"28%"}
        height={"50%"}
        color={theme.colors.ui.primary}
        border_radius={"25px"}
        onPress={null}
      >
        <Text variant="semi_rounded_ctas_white">Top 5</Text>
      </Action_Container>
      <Action_Container
        width={"28%"}
        height={"50%"}
        color={theme.colors.ui.primary}
        border_radius={"25px"}
        onPress={null}
      >
        <Text variant="semi_rounded_ctas_white">Stats</Text>
      </Action_Container>
    </Container>
  );
};
