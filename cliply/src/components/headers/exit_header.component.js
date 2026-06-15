import React from "react";
import { useNavigation } from "@react-navigation/native";

import ExitIcon from "../../../assets/my-icons/exit_icon.svg";
import { Text } from "../../infrastructure/typography/text.component.js";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";

export const ExitHeader = ({ label = "", action }) => {
  const navigation = useNavigation();
  return (
    <Container
      width="100%"
      height="8%"
      align="flex-start"
      direction="row"
      justify="center"
      color={theme.colors.bg.elements_bg}
    >
      <Container
        width="80%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="flex-end"
        style={{ paddingRight: "5%" }}
      >
        <Text variant="logo_caption">{label}</Text>
      </Container>
      <Action_Container
        width="20%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        onPress={action}
      >
        <ExitIcon width={20} height={20} fill={"#000000"} />
      </Action_Container>
    </Container>
  );
};
