import React, { useContext } from "react";

import { Action_Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../infrastructure/typography/text.component.js";

import { Spacer } from "../global_components/optimized.spacer.component.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const Email_For_Login_Tile = ({ item, action }) => {
  console.log("DATA PASSED TO EMAIL FOR LOGIN TILE:", item);
  const navigation = useNavigation();
  const { globalLanguage } = useContext(GlobalContext);
  return (
    <>
      <Action_Container
        width="410px"
        height="100px"
        justify="center"
        align="flex-start"
        // color={"blue"}
        color={theme.colors.bg.elements_bg}
        onPress={async () => {
          const final_res = await action(item);
          console.log("FINAL RES AT EMAIL FOR LOGIN TILE:", final_res);
          if (final_res?.next_view && final_res?.action_type === "login") {
            navigation.navigate(final_res.next_view, {
              data: final_res.data, // Ensure 'data' is defined
            });
          }
          if (
            final_res?.next_view &&
            final_res?.action_type === "regenerate_pin"
          ) {
            navigation.navigate(final_res.next_view, {
              label:
                globalLanguage === "EN"
                  ? "We have sent you an email with your new PIN"
                  : "Te hemos enviado un correo electrónico con tu nuevo PIN",
              cta_label:
                globalLanguage === "EN"
                  ? "Back to Login"
                  : "Volver al inicio de sesión",
            });
          }
        }}
      >
        <Spacer position="left" size="extraLarge">
          <Text variant="dm_sans_bold_20">{item}</Text>
        </Spacer>
      </Action_Container>
    </>
  );
};
