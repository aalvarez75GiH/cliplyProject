import React, { useState, useContext } from "react";

import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { Two_Rounded_Ctas_Belt } from "../../components/belts/two_semi_rounded_ctas_belt.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Voice_Operations_Status_Area } from "./voice_recents_operations_area.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";
import { Button_Go_Back_Header } from "../../components/headers/button_go_back_header.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Selecting_Operation_And_Status_View({ navigation }) {
  const { operation, setOperation } = useContext(TextClipsContext);
  const { setTextClip_data_to_upload, textClip_data_to_upload } = useContext(
    VoiceRecentClipsContext
  );
  const { globalLanguage } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const togglingOperation = (op) => {
    setIsLoading(true);
    setOperation(
      operation === "food_delivery" ? "ride_share" : "food_delivery"
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  console.log(
    "TEXT CLIP DATA TO UPLOAD AT SELECTING OPERATION STATUS:",
    JSON.stringify(textClip_data_to_upload, null, 2)
  );

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height={"100%"}
        color={theme.colors.bg.screens_bg}
        justify="center"
        align="center"
      >
        <Button_Go_Back_Header
          action={() => navigation.goBack()}
          caption="Back"
        />
        <Spacer position="top" size="small" />
        <Container
          width="100%"
          height={"12%"}
          justify="center"
          align="flex-start"
          color={theme.colors.bg.elements_bg}
          //color={"red"}
        >
          {operation === "food_delivery" && (
            <>
              <Spacer position="left" size="extraLarge">
                <Text_Tile
                  caption_1={"Select the status"}
                  caption_2={"where you want to save the text clip"}
                  color={theme.colors.ui.highlight_color_2}
                  // color={"#0D965B"}
                  width={"100%"}
                  height={"100%"}
                />
              </Spacer>
            </>
          )}

          {operation === "ride_share" && (
            <>
              <Spacer position="left" size="extraLarge">
                <Text_Tile
                  caption_1={"Select the status"}
                  caption_2={"where you want to save the text clip"}
                  color={theme.colors.ui.highlight_color_2}
                  // color={"#5C8FD6"}
                  height={"100%"}
                />
              </Spacer>
            </>
          )}
        </Container>
        <Spacer position="top" size="small" />
        <Two_Rounded_Ctas_Belt
          action_1={togglingOperation}
          action_2={togglingOperation}
          cta_active_color={theme.colors.ui.primary}
          cta_not_active_color={theme.colors.ctas.tertiary}
          cta_caption_active_variant="dm_sans_bold_14_white"
          cta_caption_not_active_variant="dm_sans_bold_14_disable_not_active"
          operation={operation}
          border_radius="30px"
        />

        <Voice_Operations_Status_Area
          operation={operation}
          isLoading={isLoading}
          setTextClip_data_to_upload={setTextClip_data_to_upload}
          textClip_data_to_upload={textClip_data_to_upload}
        />
      </Container>
    </SafeArea>
  );
}
