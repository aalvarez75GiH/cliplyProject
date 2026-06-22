import React from "react";
import { useRoute } from "@react-navigation/native";

import { Container } from "../../components/global_components/containers/general_containers.js";
import { Transcripted_Clips_Tile } from "../../components/tiles/transcripted_clip.tile.js";
import { Transcripted_Message_Tile } from "../../components/tiles/transcripted_message.tile.js";

import { theme } from "../../infrastructure/theme/index.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import { Text } from "../../infrastructure/typography/text.component.js";

export const Transcripted_Message_View = ({
  message_en,
  message_es,
  language_detected,
  action_1,
  action_2,
  globalLanguage,
}) => {
  const route = useRoute();

  return (
    <>
      <Container
        width={"100%"}
        height={"90%"}
        color={theme.colors.bg.screens_bg}
        //color={"green"}
        align="center"
        justify="center"
      >
        <Container
          width={"100%"}
          height={"60%"}
          color={theme.colors.bg.screens_bg}
          //color={"purple"}
          align="center"
          justify="flex-end"
        >
          <Transcripted_Message_Tile
            message_en={message_en}
            message_es={message_es}
            language_detected={language_detected}
            width="95%"
            height="60%"
            globalLanguage={globalLanguage}
            route_name={route.name}
            onAction={action_2}
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
          <Squared_action_CTA_component
            label={globalLanguage === "EN" ? "Exit" : "Salir"}
            width="95%"
            height={"35%"}
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
    </>
  );
};
