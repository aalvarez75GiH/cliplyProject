import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { HomeHeader } from "../headers/home_header.component.js";
import { Transcripted_Clips_Tile } from "../tiles/transcripted_clip.tile.js";
import { Squared_action_CTA_component } from "../calls_to_action/squared_action.cta.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";
import ArrowIcon from "../../../assets/my-icons/arrow_next_icon.svg";
import { Text } from "../../infrastructure/typography/text.component.js";

export const Type_message_process_area_2 = ({
  message_en,
  message_es,
  language_detected,
  action_1,
  action_2,
  globalLanguage,
  route_name,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <HomeHeader />
      <Spacer position="top" size="extraLarge" />
      <Container
        width={"100%"}
        height={"80%"}
        color={theme.colors.bg.screens_bg}
        //color={"#FAD"}
        justify="center"
        align="center"
      >
        <Container
          width={"100%"}
          height={"60%"}
          color={theme.colors.bg.screens_bg}
          //color={"purple"}
          align="center"
          justify="flex-end"
        >
          <Transcripted_Clips_Tile
            message_en={message_en}
            message_es={message_es}
            language_detected={language_detected}
            width="95%"
            height="70%"
            globalLanguage={globalLanguage}
            route_name={route_name}
          />
        </Container>

        <Container
          width={"100%"}
          height={"20%"}
          justify="flex-start"
          align="center"
          direction="column"
          color={theme.colors.bg.screens_bg}
        >
          <Spacer position="top" size="medium" />
          <Squared_action_CTA_component
            label={globalLanguage === "EN" ? "Exit" : "Salir"}
            width="95%"
            height={"40%"}
            color={theme.colors.ui.highlight_color}
            text_variant={"dm_sans_bold_16"}
            icon_visible={false}
            action={action_2}
          />
          <Text variant="dm_sans_bold_14" style={{ padding: 10 }}>
            {globalLanguage === "EN"
              ? "Note: this message was saved on recent"
              : " Nota: este mensaje se guardó en recientes"}
          </Text>
        </Container>
      </Container>
      <Container
        width={"100%"}
        height={"10%"}
        justify="space-between"
        align="center"
        color={theme.colors.bg.screens_bg}
      ></Container>
    </>
  );
};
