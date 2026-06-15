// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import React, { useContext } from "react";

import { Text } from "../../infrastructure/typography/text.component";
import RightArrowIcon from "../../../assets/my-icons/arrow_next_icon.svg";

import { theme } from "../../infrastructure/theme/index";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers";
import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";

export const Add_intro_CTA = ({ introAdded, setIntroAdded }) => {
  const { operation } = useContext(TextClipsContext);
  console.log("operation at Quickie", operation);
  return (
    <Container
      width="100%"
      height={"12%"}
      justify="center"
      align="center"
      color={theme.colors.bg.elements_bg}
    >
      <Action_Container
        width="95%"
        height="60%"
        color={
          introAdded
            ? theme.colors.ui.success
            : theme.colors.ui.highlight_color_2
        }
        onPress={() => setIntroAdded(!introAdded)}
      >
        <Text
          variant={introAdded ? "dm_sans_bold_16_white" : "dm_sans_bold_16"}
          // variant={"dm_sans_bold_16_white"}
        >
          Add intro: "Hey, your driver here"
        </Text>
      </Action_Container>
    </Container>
  );
};
