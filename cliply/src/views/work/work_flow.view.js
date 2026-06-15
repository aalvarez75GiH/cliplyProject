import React, { useState, useContext, useEffect } from "react";

import { HomeHeader } from "../../components/headers/home_header.component.js";
import { Two_Rounded_Ctas_Belt } from "../../components/belts/two_semi_rounded_ctas_belt.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Work_Flow_Area } from "./work_flow_area.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Work_Flow_View({ navigation }) {
  const { operation, setOperation } = useContext(TextClipsContext);
  // const [operation, setOperation] = useState("food_delivery");
  const [isLoading, setIsLoading] = useState(false);
  const { logAsyncStorage, globalLanguage } = useContext(GlobalContext);
  useEffect(() => {
    logAsyncStorage();
  }, []);
  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      {isLoading && (
        <>
          <Container
            width={"100%"}
            height={"40%"}
            justify="center"
            align="center"
            color={theme.colors.bg.elements_bg}
          />
          <Loading_Spinner_area
            color={theme.colors.bg.elements_bg}
            height="10%"
          />
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            // color="red"
            color={theme.colors.bg.elements_bg}
          >
            <Text variant="dm_sans_bold_18">
              Wait, we are loading your information
            </Text>
            <Spacer position="bottom" size="small" />
          </Container>
        </>
      )}
      {!isLoading && (
        <Container
          width="100%"
          height={"100%"}
          color={theme.colors.bg.screens_bg}
          justify="center"
          align="center"
        >
          <HomeHeader action={() => navigation.navigate("Menu_View")} />

          <Spacer position="top" size="small" />
          <Container
            width="100%"
            height={"12%"}
            justify="center"
            align="flex-start"
            color={theme.colors.bg.elements_bg}
            //color={"red"}
          >
            <>
              <Spacer position="left" size="small">
                <Text_Tile
                  caption_1={
                    globalLanguage === "EN"
                      ? "Select your work flow"
                      : "Selecciona tu opción"
                  }
                  caption_2={
                    globalLanguage === "EN"
                      ? "to start sending text clips"
                      : "para empezar a enviar clips de texto"
                  }
                  color={theme.colors.ui.highlight_color_2}
                  // color={"#0D965B"}
                  height={"100%"}
                />
              </Spacer>
            </>
          </Container>
          <Spacer position="top" size="small" />

          <Work_Flow_Area operation={operation} isLoading={isLoading} />
        </Container>
      )}
    </SafeArea>
  );
}
