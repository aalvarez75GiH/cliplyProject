import React from "react";

import { Text } from "../../infrastructure/typography/text.component.js";
import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

export const Menu_Sub_title_Tile = ({ caption, variant }) => {
  return (
    <>
      <Spacer position="top" size="medium" />
      <Container
        color={theme.colors.bg.elements_bg}
        width={"100%"}
        height={"12%"}
        align="flex-start"
        justify="center"
      >
        <Spacer position="left" size="extraLarge">
          <Text variant={variant}>{caption}</Text>
        </Spacer>
      </Container>
    </>
  );
};
