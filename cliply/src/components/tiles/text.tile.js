import React, { useContext } from "react";

import { Text } from "../../infrastructure/typography/text.component.js";
import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Text_Tile = ({
  caption_1,
  caption_2,
  color,
  width = "100%",
  height = "20%",
}) => {
  const { globalLanguage } = useContext(GlobalContext);
  return (
    <>
      <Container
        width={width}
        height={height}
        color={theme.colors.bg.screens_bg}
        //color={"blue"}
        direction="row"
      >
        <Container
          width={"80%"}
          height="90%"
          // color="yellow"
          justify="center"
          align="flex-start"
          //   color={theme.colors.bg.elements_bg}
          color={color}
        >
          <Spacer position="left" size="extraLarge">
            <Text variant="dm_sans_bold_20">{caption_1}</Text>
            <Text variant="dm_sans_bold_14">{caption_2}</Text>
          </Spacer>
        </Container>
        <Container width="30%" height="90%" color={color}></Container>
      </Container>
    </>
  );
};
