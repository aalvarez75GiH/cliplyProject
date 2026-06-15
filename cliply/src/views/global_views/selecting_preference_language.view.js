import React, { useContext, useEffect } from "react";
import { Platform } from "react-native";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { HomeHeader } from "../../components/headers/home_header.component.js";
import { Outlined_CTA } from "../../components/calls_to_action/outlined.cta.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Preference_Language_View({ route }) {
  const { data } = route.params;
  console.log("DATA PASSED TO PREFERENCE LANGUAGE VIEW:", data);
  const user_id = data.user_id;
  console.log("USER ID PASSED TO PREFERENCE LANGUAGE VIEW:", user_id);
  const {
    checkAuthentication,
    logAsyncStorage,
    settingPreferenceLanguage,
    isLoading,
  } = useContext(GlobalContext);
  const navigation = useNavigation();

  // useEffect(() => {
  //   checkAuthentication();
  //   logAsyncStorage();
  // }, []);

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <Whole_Screen_Loading_Spinner_Component caption="We are setting up your language..." />
        // <Loading_Spinner_area color={theme.colors.bg.elements_bg} />
      )}
      {!isLoading && (
        <Container
          width={"100%"}
          height={"100%"}
          justify={"flex-start"}
          align={"center"}
          color={theme.colors.bg.elements_bg}
          //   color="red"
        >
          <Container
            width={"100%"}
            height={Platform.OS === "ios" ? "100%" : "100%"}
            color={theme.colors.bg.elements_bg}
          >
            <Text variant="dm_sans_bold_18">
              Choose your preference language
            </Text>
            {/* <Text variant="dm_sans_bold_18">{user_from_back_end.first_name}</Text> */}
            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
            <Spacer position="top" size="large" />
            <Outlined_CTA
              label="English"
              action={async () => {
                try {
                  const res = await settingPreferenceLanguage({
                    language: "EN",
                    user_id: user_id,
                  });
                  console.log("RES FROM SETTING PREFERENCE LANGUAGE:", res);
                  if (res?.ok && res?.next) navigation.navigate(res.next);
                } catch (error) {
                  console.error("Error in settingPreferenceLanguage:", error);
                }
                // const res = await settingPreferenceLanguage({
                //   language: "EN",
                //   user_id: user_id,
                // });
                // console.log("RES FROM SETTING PREFERENCE LANGUAGE:", res);
                // if (res?.ok && res?.next) navigation.navigate(res.next);
              }}
              width={"60%"}
              height={"10%"}
              label_variant="dm_sans_bold_16"
              border_radius="50px"
              border_width="2px"
            />
            <Spacer position="top" size="large" />
            <Outlined_CTA
              label="Español"
              action={async () => {
                const res = await settingPreferenceLanguage({
                  language: "ES",
                  user_id: user_id,
                });
                console.log("RES FROM SETTING PREFERENCE LANGUAGE:", res);
                if (res?.ok && res?.next) navigation.navigate(res.next);
              }}
              width={"60%"}
              height={"10%"}
              label_variant="dm_sans_bold_16"
              border_radius="50px"
              border_width="2px"
            />
          </Container>
        </Container>
      )}
    </SafeArea>
  );
}
