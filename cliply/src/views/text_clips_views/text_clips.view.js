import React, { useState, useContext } from "react";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { Two_Rounded_Ctas_Belt } from "../../components/belts/two_semi_rounded_ctas_belt.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";

import { Operations_Status_Area } from "./text clips operations areas/operations_status.area.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";

export default function Text_Clips_View({ navigation }) {
  const { operation, setOperation } = useContext(TextClipsContext);
  // const [operation, setOperation] = useState("food_delivery");
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

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height={"100%"}
        color={theme.colors.bg.screens_bg}
        justify="center"
        align="center"
      >
        <HomeHeader action={() => navigation.navigate("Menu_View")} />
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
              <Spacer position="left" size="small">
                <Text_Tile
                  caption_1={"Text clips"}
                  caption_2={"by your status in the delivery order"}
                  color={theme.colors.ui.highlight_color_2}
                  // color={"#0D965B"}
                  height={"100%"}
                />
              </Spacer>
            </>
          )}

          {operation === "ride_share" && (
            <>
              <Spacer position="left" size="small">
                <Text_Tile
                  caption_1={"Text clips"}
                  caption_2={"by your status in the ride share"}
                  color={theme.colors.ui.highlight_color_2}
                  // color={"#5C8FD6"}
                  height={"100%"}
                />
              </Spacer>
            </>
          )}
        </Container>
        <Spacer position="top" size="small" />

        <Operations_Status_Area operation={operation} isLoading={isLoading} />
      </Container>
    </SafeArea>
  );
}
