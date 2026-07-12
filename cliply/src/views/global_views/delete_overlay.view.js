import React, { useLayoutEffect, useContext, useEffect } from "react";

import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container } from "../../components/global_components/containers/general_containers";
import { SafeArea } from "../../components/global_components/safe-area.component";
import { Spacer } from "../../components/global_components/optimized.spacer.component";
import { Text } from "../../infrastructure/typography/text.component";
import { ExitHeader } from "../../components/headers/exit_header.component";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta";
import { Global_activity_indicator } from "../../components/global_components/global_activity_indicator_screen.component";

import { GlobalContext } from "../../infrastructure/services/global/global.context";

export default function Delete_Overlay_View() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { coming_from, dataNeededToDeleteTextClip, item_to_delete_label } =
    route.params || {};
  // const { t } = useTranslation();

  const {
    delete_one_recent_clip,
    deleteStoredTextClip,
    deletedStatus,
    setDeletedStatus,
    isLoading,
    globalLanguage,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (deletedStatus) {
      setDeletedStatus(false);

      navigation.popToTop();
    }
  }, [deletedStatus, navigation]);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runWithMinimumDelay = async (task, minDelay = 600) => {
    const start = Date.now();

    await task();

    const elapsed = Date.now() - start;
    const remaining = minDelay - elapsed;

    if (remaining > 0) {
      await wait(remaining);
    }
  };

  return (
    <SafeArea background_color={"transparent"} style={{ flex: 1 }}>
      {/* Full-screen backdrop */}
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)" }}>
        {/* Tap outside to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()} />

        {/* Bottom sheet pinned to bottom */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "50%",
          }}
        >
          {/* Prevent closing when tapping inside the sheet */}
          <Pressable style={{ flex: 1 }} onPress={() => {}}>
            {isLoading && <Global_activity_indicator />}
            {!isLoading && (
              <Container
                width="100%"
                height="100%"
                color={theme.colors.bg.elements_bg}
                //color={"red"}
                justify="flex-start"
                align="center"
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  overflow: "hidden",
                }}
              >
                <Spacer position="top" size="extraLarge" />
                <ExitHeader label="" action={() => navigation.goBack()} />
                <Spacer position="top" size="extraLarge" />
                <Container
                  width="100%"
                  height="10%"
                  color={theme.colors.bg.elements_bg}
                  justify="center"
                  align="flex-start"
                >
                  <Spacer position="left" size="extraLarge">
                    <Text variant="dm_sans_bold_20">
                      Are you sure about deleting this
                    </Text>
                    <Text variant="dm_sans_bold_20">
                      {item_to_delete_label}?
                    </Text>
                  </Spacer>
                </Container>
                <Spacer position="top" size="extraLarge" />
                <Container
                  width="100%"
                  height="15%"
                  // color={"green"}
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                  color={theme.colors.bg.elements_bg}
                >
                  <Container
                    width="5%"
                    height="100%"
                    color={theme.colors.bg.elements_bg}
                    // color={"green"}
                  />
                  <Regular_CTA
                    caption={"Yes, delete it"}
                    width="40%"
                    height="100%"
                    color={theme.colors.ui.error}
                    caption_variant="dm_sans_bold_16_white"
                    action={() =>
                      coming_from === "Recent_Message_Created_Tile"
                        ? delete_one_recent_clip(dataNeededToDeleteTextClip)
                        : deleteStoredTextClip(dataNeededToDeleteTextClip)
                    }
                  />
                </Container>

                <Container color={theme.colors.bg.elements_bg} />
              </Container>
            )}
          </Pressable>
        </View>
      </View>
    </SafeArea>
  );
}
