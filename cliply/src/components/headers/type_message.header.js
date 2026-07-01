import React from "react";
import { useNavigation } from "@react-navigation/native";

import PencilIcon from "../../../assets/my-icons/pencil.svg";
import { Text } from "../../infrastructure/typography/text.component.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import MicIcon from "../../../assets/my-icons/micIcon.svg";
import { Spacer } from "../global_components/optimized.spacer.component.js";
import ExitIcon from "../../../assets/my-icons/exit_icon.svg";
import TranslateIcon from "../../../assets/my-icons/translate_icon.svg";

export const Type_Message_Header = ({ label = "", globalLanguage }) => {
  const navigation = useNavigation();
  return (
    <>
      <Container
        width="100%"
        height="8%"
        align="flex-start"
        direction="row"
        justify="center"
        color={theme.colors.bg.elements_bg}
      >
        <Container
          width="20%"
          height="100%"
          color={theme.colors.bg.elements_bg}
          //color={"blue"}
          justify="center"
          align="flex-end"
          style={{ paddingRight: "5%" }}
        ></Container>
        <Container
          width="70%"
          height="100%"
          //color={"green"}
          color={theme.colors.bg.elements_bg}
          onPress={() => navigation.navigate("Home")}
        >
          <Text variant="dm_sans_bold_18">
            {globalLanguage === "EN"
              ? "Translate message & create"
              : "Tradúce y crea mensaje"}
          </Text>
        </Container>
        <Container
          width="20%"
          height="100%"
          color={theme.colors.bg.elements_bg}
          //color={"pink"}
          onPress={() => navigation.navigate("Home")}
          justify="center"
          align="flex-start"
        >
          {/* <PencilIcon width={30} height={30} fill={"#B2B2B2"} /> */}
          <Spacer position="left" size="large">
            <TranslateIcon width={25} height={25} fill={"#B2B2B2"} />
          </Spacer>
        </Container>
      </Container>
      <Container
        width="100%"
        height="0.4%"
        color={theme.colors.bg.screens_bg}
      ></Container>
    </>
  );
};
