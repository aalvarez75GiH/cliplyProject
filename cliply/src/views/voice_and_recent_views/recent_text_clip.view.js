import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container } from "../../components/global_components/containers/general_containers.js";
import { Transcripted_Clips_Tile } from "../../components/tiles/transcripted_clip.tile.js";
import { Transcripted_Message_Tile } from "../../components/tiles/transcripted_message.tile.js";
import { Recent_Message_Created_Tile } from "../../components/tiles/recent_messages_created.tile.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Platform } from "react-native";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Recent_Text_Clip_View = (route) => {
  const { item } = route.route.params;
  const { globalLanguage } = useContext(GlobalContext);
  //   const { message_en, message_es, language_detected, message_id } = item;
  const { language_detected, message_id } = item;
  const navigation = useNavigation();

  const { setTextClip_data_to_upload, textClip_data_to_upload, resetState } =
    useContext(VoiceRecentClipsContext);

  useEffect(() => {
    setTextClip_data_to_upload({
      ...textClip_data_to_upload,
      new_message: item,
    });
  }, []);
  //   console.log("ITEM TO UPLOAD:", JSON.stringify(item, null, 2));
  console.log(
    "TEXT CLIP DATA TO UPLOAD:",
    JSON.stringify(textClip_data_to_upload, null, 2)
  );

  return (
    <>
      <SafeArea background_color={theme.colors.bg.elements_bg}>
        <Container
          width="100%"
          height={"100%"}
          color={theme.colors.bg.screens_bg}
          justify="center"
          align="center"
        >
          <ExitHeader action={() => navigation.goBack()} />
          <Container
            width={"100%"}
            height={"92%"}
            color={theme.colors.bg.screens_bg}
            //color={"green"}
            align="center"
            justify="center"
          >
            <Recent_Message_Created_Tile
              message_en={item.body.en}
              message_es={item.body.es}
              language_detected={language_detected}
              message_id={message_id}
              globalLanguage={globalLanguage}
            />
            <Container
              width={"100%"}
              height={"12%"}
              justify="center"
              align="center"
              direction="column"
              //color={"red"}
              style={{
                position: "absolute",
                top: 450,
              }}
              color={theme.colors.bg.screens_bg}
            >
              {Platform.OS === "ios" ? null : (
                <>
                  <Spacer position="top" size="extraLarge" />
                  <Spacer position="top" size="extraLarge" />
                  <Spacer position="top" size="medium" />
                </>
              )}
              <Spacer position="top" size="large" />
              <Squared_action_CTA_component
                // action={null}
                action={() => navigation.navigate("Saving_text_clip_1")}
                label={
                  globalLanguage === "EN"
                    ? "Save text clip"
                    : "Guardar clip de texto"
                }
                width="95%"
                height={"65%"}
                color={theme.colors.ui.primary}
                text_variant={"dm_sans_bold_16_white"}
              />
              <Spacer position="top" size="medium" />
              <Squared_action_CTA_component
                label={globalLanguage === "EN" ? "Exit" : "Salir"}
                width="95%"
                height={"65%"}
                color={theme.colors.ui.highlight_color}
                text_variant={"dm_sans_bold_16"}
                icon_visible={false}
                action={() => {
                  resetState();
                  navigation.goBack();
                }}
              />
            </Container>
          </Container>
        </Container>
      </SafeArea>
    </>
  );
};
