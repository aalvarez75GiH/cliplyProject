// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../infrastructure/typography/text.component";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import QuickIcon from "../../../assets/my-icons/time_icon.svg";
import { Spacer } from "../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { GlobalContext } from "../../infrastructure/services/global/global.context";
import LeftArrow from "../../../assets/my-icons/arrow_back_icon.svg";

export const Back_Bottom_Bar = ({ language, action, isSelected }) => {
  const { operation } = useContext(TextClipsContext);
  console.log("operation at Quickie", operation);
  const navigation = useNavigation();

  const { globalLanguage } = useContext(GlobalContext);
  return (
    <Action_Container
      width="100%"
      height="10%"
      justify="center"
      align="center"
      color={theme.colors.bg.elements_bg}
      direction="row"
      onPress={() => navigation.goBack()}
    >
      <Container
        width="20%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        onPress={() => null}
      >
        <LeftArrow width={24} height={24} fill={theme.colors.ui.primary} />
      </Container>
      <Container
        width="80%"
        height="100%"
        justify="center"
        align="center"
        direction="row"
        color={theme.colors.bg.elements_bg}
      >
        <Text variant="dm_sans_bold_16">
          {globalLanguage === "EN" ? "Back" : "Atajos"}
        </Text>
        <Spacer position="left" size="extraLarge" />
        <Spacer position="left" size="extraLarge" />
        <Spacer position="left" size="small" />
      </Container>
    </Action_Container>
  );
};
