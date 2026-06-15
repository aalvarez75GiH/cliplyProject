import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import SuccessIcon from "../../../assets/my-icons/success_icon.svg";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
export default function Added_Item_View({ route }) {
  const navigation = useNavigation();
  const { globalLanguage } = useContext(GlobalContext);

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        // color={"lightyellow"}
        width={"100%"}
        height={"100%"}
        align="center"
        justify="center"
        // color={theme.colors.bg.elements_bg}
        color={theme.colors.bg.screens_bg}
      >
        <Container
          width={"100%"}
          height={"92%"}
          align="center"
          justify="center"
          color={theme.colors.bg.elements_bg}
        >
          <SuccessIcon width={80} height={80} />
          <Spacer position="top" size="medium" />
          <Text variant="dm_sans_bold_20">
            {globalLanguage === "EN"
              ? "Text clip saved successfully!!"
              : " Clip de téxto guardado con éxito!!"}
          </Text>
        </Container>
        <Squared_action_CTA_component
          label={globalLanguage === "EN" ? "Back" : "Regresar"}
          action={() => {
            navigation.popToTop();
          }}
          icon_visible={false}
          height="8%"
        />
      </Container>
    </SafeArea>
  );
}
