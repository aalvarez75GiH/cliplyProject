import React, { useContext } from "react";
import { Snackbar } from "react-native-paper";
import { Platform } from "react-native";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context";
import { Text } from "../../infrastructure/typography/text.component";

export const Snack_Bar_Component = ({
  snackbar,
  bottom_ios,
  bottom_android,
  duration = Number.POSITIVE_INFINITY,
  minHeight = 80,
  minWidth = "90%",
}) => {
  const { hideSnackbar } = useContext(GlobalContext);
  return (
    <Snackbar
      visible={snackbar.visible}
      onDismiss={hideSnackbar}
      duration={duration}
      style={{
        minHeight: minHeight,
        minWidth: minWidth,
        backgroundColor: snackbar.bgColor,
        marginHorizontal: 12,
        marginBottom: 0,
      }}
      wrapperStyle={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: Platform.OS === "ios" ? bottom_ios : bottom_android,
        margin: 0,
        padding: 0,
        zIndex: 9999,
        elevation: 9999,
      }}
    >
      <Container
        direction="row"
        justify="space-between"
        align="center"
        width="100%"
        color={theme.colors.ui.success}
      >
        <Text variant="dm_sans_bold_16_white">{snackbar.message}</Text>

        <Action_Container
          color={theme.colors.ui.success}
          width="auto"
          onPress={() => {
            hideSnackbar();

            setTimeout(() => {
              if (snackbar.onAction) {
                snackbar.onAction();
              }
            }, 100);
          }}
          // onPress={() => {
          //   if (snackbar.onAction) {
          //     snackbar.onAction();
          //   } else {
          //     hideSnackbar();
          //   }
          // }}
        >
          <Text
            variant="dm_sans_bold_16_white"
            style={{ textDecorationLine: "underline" }}
          >
            {snackbar.actionLabel}
          </Text>
        </Action_Container>
      </Container>
    </Snackbar>
  );
};
