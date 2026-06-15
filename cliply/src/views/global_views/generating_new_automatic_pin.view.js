import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeArea } from "../../components/global_components/safe-area.component";
import { theme } from "../../infrastructure/theme";
import { ExitHeader } from "../../components/headers/exit_header.component";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Squared_action_CTA_component } from "../../components/calls_to_action/squared_action.cta.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Whole_Screen_Loading_Spinner_Component } from "../../components/global_components/whole_screen_loading_spinner.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Generating_New_Automatic_Pin_View({ route }) {
  const navigation = useNavigation();
  const { data, loading_area_caption, language } = route.params;
  const [isPINGenerated, setIsPINgenerated] = React.useState(false);
  const {
    generatingNewRandomPINAndUpdatingUserAtFB,
    automaticPIN,
    isLoading,
    setAutomaticPIN,
    globalLanguage,
  } = useContext(GlobalContext);

  return (
    <SafeArea backGroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <>
          <Whole_Screen_Loading_Spinner_Component
            caption={
              globalLanguage === "EN"
                ? "Generating a PIN number"
                : "Generando un número PIN..."
            }
          />
        </>
      )}
      {!isLoading && (
        <>
          <ExitHeader
            action={() => {
              setAutomaticPIN("");
              navigation.goBack();
            }}
          />
          <Container
            width="100%"
            height={"100%"}
            // color={"lightblue"}
            color={theme.colors.bg.elements_bg}
            justify="center"
            align="center"
          >
            <Container
              width="100%"
              height={"50%"}
              //   color={"red"}
              color={theme.colors.bg.elements_bg}
              justify="center"
              align="center"
            >
              {!isLoading && automaticPIN.length === 0 && (
                <>
                  <Text variant="dm_sans_bold_22">
                    {globalLanguage === "EN"
                      ? "Tap generate new PIN"
                      : "Genéra un nuevo PIN"}
                  </Text>
                  <Spacer position="top" size="large" />
                </>
              )}

              {!isLoading && automaticPIN.length > 0 && (
                <>
                  <Text variant="dm_sans_bold_22">
                    {globalLanguage === "EN"
                      ? "This is your new PIN number"
                      : "Este es tu nuevo número PIN"}
                  </Text>
                  <Spacer position="top" size="small" />
                  <Text variant="dm_sans_bold_40" style={{ marginTop: 20 }}>
                    {automaticPIN}
                  </Text>
                  <Spacer position="top" size="small" />
                  <Text variant="dm_sans_bold_18">
                    {globalLanguage === "EN"
                      ? "We sent it to your email as well"
                      : "Te lo enviamos a tu correo electrónico"}
                  </Text>
                </>
              )}
            </Container>
            <Container
              width="100%"
              height={"50%"}
              //   color={"blue"}
              color={theme.colors.bg.elements_bg}
              justify="flex-end"
              align="center"
            >
              {!isPINGenerated && (
                <Squared_action_CTA_component
                  label={
                    globalLanguage === "EN"
                      ? "Generate new PIN"
                      : "Generar nuevo PIN"
                  }
                  icon_visible={false}
                  height="15%"
                  action={async () => {
                    try {
                      const res =
                        await generatingNewRandomPINAndUpdatingUserAtFB();

                      if (res?.ok) {
                        if (res.next) {
                          console.log("DATA WE PASS TO NEXT VIEW:", res.data);
                          navigation.navigate(res.next, {
                            data: res.data,
                            action_type: "regenerate_pin",
                            loading_area_caption: loading_area_caption, // Ensure 'data' is defined
                          });
                        } else {
                          console.log(
                            "res.ok is true, setting isPINgenerated to true"
                          );
                          setIsPINgenerated(true);
                        }
                      } else {
                        console.log("res.ok is false or undefined");
                      }
                    } catch (error) {
                      console.error("Error generating new PIN:", error);
                    }
                  }}
                />
              )}
              {isPINGenerated && (
                <Squared_action_CTA_component
                  label={globalLanguage === "EN" ? "Back" : "Atrás"}
                  icon_visible={false}
                  height="15%"
                  action={() => {
                    setIsPINgenerated(false);
                    setAutomaticPIN("");
                    navigation.goBack();
                  }}
                />
              )}
              <Spacer position="bottom" size="large" />
              <Spacer position="bottom" size="extraLarge" />
            </Container>
          </Container>
        </>
      )}
    </SafeArea>
  );
}
