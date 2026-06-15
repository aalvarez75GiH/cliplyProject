import React, { useState, useContext } from "react";
import { FlatList } from "react-native";

import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Text } from "../../infrastructure/typography/text.component.js";
import { Text_Tile } from "../../components/tiles/text.tile.js";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { ExitHeader } from "../../components/headers/exit_header.component.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Multiple_Emails_LoginIn_View({ navigation, route }) {
  const { data, action_type, loading_area_caption } = route.params;
  const {
    globalLanguage,
    renderEmailForLoginTile,
    errorInAuthentication,
    isLoading,
    setFirst_name,
    setLast_name,
    login_action_for_multiple_emails,
    generate_PIN_action_for_multiple_emails,
  } = useContext(GlobalContext);
  const action =
    action_type === "login"
      ? login_action_for_multiple_emails
      : action_type === "regenerate_pin"
      ? generate_PIN_action_for_multiple_emails
      : null;

  return (
    <SafeArea backgroundColor={theme.colors.bg.elements_bg}>
      {isLoading && (
        <>
          <Container
            width={"100%"}
            height={"40%"}
            justify="center"
            align="center"
            color={theme.colors.bg.elements_bg}
          />
          <Loading_Spinner_area
            color={theme.colors.bg.elements_bg}
            height="10%"
          />
          <Container
            width={"100%"}
            height={"10%"}
            justify="center"
            align="center"
            // color="red"
            color={theme.colors.bg.elements_bg}
          >
            <Text variant="dm_sans_bold_18">{loading_area_caption}</Text>
          </Container>
        </>
      )}
      {!isLoading && (
        <Container
          width={"100%"}
          height={"100%"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          color={theme.colors.bg.elements_bg}
          // color="yellow"
        >
          <Container
            width="100%"
            height="100%"
            color={theme.colors.bg.screens_bg}
            justify="flex-start"
            align="center"
            //   color="lightblue"
          >
            <ExitHeader
              action={() => {
                setFirst_name("");
                setLast_name("");
                navigation.goBack();
              }}
            />
            <Spacer position="top" size="small" />

            <Text_Tile
              caption_1={
                globalLanguage === "EN"
                  ? "Select the email"
                  : "Seleccione el correo"
              }
              caption_2={
                globalLanguage === "EN"
                  ? "you want to log in with"
                  : "con el que desea iniciar sesión"
              }
              color={theme.colors.ui.highlight_color_2}
              // color={"#0D965B"}
              height={"10%"}
            />
            <Spacer position="top" size="small" />
            <Container
              width={"100%"}
              height={"70%"}
              color={theme.colors.bg.screens_bg}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={data}
                //   renderItem={(item) => renderEmailForLoginTile(item, pin)}
                renderItem={({ item }) =>
                  renderEmailForLoginTile({
                    item,
                    action,
                  })
                }
                keyExtractor={(item, id) => {
                  return item.toString() + id.toString();
                }}
              />
            </Container>

            <Spacer position="top" size="small" />
            <Spacer position="top" size="small" />
            <Spacer position="top" size="small" />
            {errorInAuthentication && (
              <Text
                variant="dm_sans_bold_12_error_cancel"
                style={{ textAlign: "center", paddingHorizontal: 20 }}
              >
                {errorInAuthentication}
              </Text>
            )}
          </Container>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
        </Container>
      )}
    </SafeArea>
  );
}
