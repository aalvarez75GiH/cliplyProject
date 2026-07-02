import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import MicIcon from "../../../assets/my-icons/micIcon.svg";
import { Snack_Bar_Component } from "../others/snack_bar.component.js";

import { Spacer } from "../global_components/optimized.spacer.component.js";
import { Outlined_CTA } from "../calls_to_action/outlined.cta.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Messages_By_Status_header = ({ snackbar }) => {
  const { setSelectedItemId } = useContext(TextClipsContext);

  const { globalLanguage } = useContext(GlobalContext);

  const navigation = useNavigation();
  return (
    <Container
      width="100%"
      height="12%"
      align="flex-start"
      direction="row"
      justify="center"
      color={theme.colors.bg.elements_bg}
    >
      <Action_Container
        width="35%"
        height="100%"
        // color={"blue"}
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="center"
        style={{ paddingRight: "5%" }}
        onPress={() => navigation.navigate("Quick_Voice_Text_Clip")}
      >
        <Spacer position="left" size="large">
          <MicIcon width={30} height={30} fill={theme.colors.ui.primary} />
        </Spacer>
      </Action_Container>
      <Container
        width="35%"
        height="100%"
        //color={"red"}
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="flex-end"
        style={{ paddingRight: "5%" }}
      ></Container>

      <Container
        width="40%"
        height="100%"
        color={theme.colors.bg.elements_bg}
        justify="center"
        align="center"
        border_radius={100}
      >
        <Outlined_CTA
          width={"60%"}
          height={"45%"}
          label={globalLanguage === "EN" ? "Back" : "Atrás"}
          // border_radius={100}
          border_width="2px"
          label_variant="dm_sans_bold_14"
          action={() => {
            // setNextStep(nextStepInitialState);
            setSelectedItemId(null);
            navigation.popToTop("Home_View");
          }}
        />
      </Container>
    </Container>
  );
};
