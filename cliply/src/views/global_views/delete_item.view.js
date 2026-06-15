import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExitHeader } from "../../components/headers/exit_header.component.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Delete_Plus_Label_CTA } from "../../components/calls_to_action/delete_plus_label.cta.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import SuccessIcon from "../../../assets/my-icons/success_icon.svg";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Delete_Item_View({ route }) {
  const { dataNeededToDeleteTextClip, item_to_delete_label, coming_from } =
    route.params;

  const {
    delete_one_recent_clip,
    deleteStoredTextClip,
    deletedStatus,
    setDeletedStatus,
    isLoading,
    globalLanguage,
  } = useContext(GlobalContext);

  const navigation = useNavigation();

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      {!deletedStatus && (
        <Container
          // color={"lightyellow"}
          width={"100%"}
          height={"100%"}
          align="center"
          justify="flex-start"
          // color={theme.colors.bg.elements_bg}
          color={theme.colors.bg.screens_bg}
        >
          <ExitHeader />

          <Container
            color={theme.colors.bg.elements_bg}
            //color={"lightyellow"}
            width={"100%"}
            height={"92%"}
            align="center"
            justify="center"
          >
            <Delete_Plus_Label_CTA
              action_1={() =>
                coming_from === "Recent_Text_Clip_Tile"
                  ? delete_one_recent_clip(dataNeededToDeleteTextClip)
                  : deleteStoredTextClip(dataNeededToDeleteTextClip)
              }
              action_2={() => navigation.goBack()}
              item_to_delete_label={item_to_delete_label}
              isLoading={isLoading}
            />
          </Container>
        </Container>
      )}
      {deletedStatus && (
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
                ? "Deleted successfully..."
                : "Eliminado con éxito..."}
            </Text>
          </Container>
          <Squared_action_CTA_component
            label={globalLanguage === "EN" ? "Back" : "Regresar"}
            action={() => {
              setDeletedStatus(false);
              navigation.popToTop();
            }}
            icon_visible={false}
            height="8%"
          />
        </Container>
      )}
    </SafeArea>
  );
}
