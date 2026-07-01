import React, { useContext } from "react";

import { ExitHeader } from "../../components/headers/exit_header.component.js";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import AccountIcon from "../../../assets/my-icons/account_icon.svg";
import EmailIcon from "../../../assets/my-icons/email_icon.svg";
import ArrowSwitchIcon from "../../components/transformed icons/arrow_switch_icon.js";
import LogOutIcon from "../../../assets/my-icons/logout_exit_out_icon.svg";
import PasswordIcon from "../../../assets/my-icons/password_icon.svg";
import { Menu_Sub_title_Tile } from "../../components/tiles/menu_sub_title.tile.js";
import { Menu_Tile } from "../../components/tiles/menu.tile.js";
import { Button_Go_Back_Header } from "../../components/headers/button_go_back_header.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Menu_Screen({ navigation }) {
  const {
    globalLanguage,
    togglingGlobalLanguage,
    isLoading,
    languageIsLoading,
    loggingOutUser,
    userToDB,
    updatingPINOnDemandAndUpdatingUserAtFB,
    setPin,
    setNew_pin,
    LoadingOverlay,
  } = useContext(GlobalContext);
  const { first_name, last_name, email } = userToDB;

  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      {isLoading || languageIsLoading ? (
        <LoadingOverlay
          caption={
            globalLanguage === "EN"
              ? "Wait! working on it..."
              : " ¡Espera! estámos procesando..."
          }
        />
      ) : (
        <Container
          // color={"lightyellow"}
          width={"100%"}
          height={"100%"}
          align="center"
          justify="flex-start"
          // color={theme.colors.bg.elements_bg}
          color={theme.colors.bg.screens_bg}
        >
          <Button_Go_Back_Header
            action={() => {
              setNew_pin("");
              navigation.goBack();
            }}
            caption="Back"
          />

          <Menu_Sub_title_Tile
            caption={globalLanguage === "EN" ? "Account" : "Pérfil"}
            // variant={"menu_sub_title_text"}
            variant={"dm_sans_bold_24"}
            //   variant="menu_sub_title_text"
          />
          <Container
            color={theme.colors.bg.screens_bg}
            //   color={"green"}
            width={"100%"}
            height={"92%"}
            align="center"
            justify="flex-start"
          >
            <Container
              color={theme.colors.bg.screens_bg}
              width={"100%"}
              height={"21%"}
              align="center"
              justify="flex-start"
              // color={"red"}
            >
              <Spacer position="top" size="small" />
              <Menu_Tile
                Icon={AccountIcon}
                width={"25px"}
                height={"25px"}
                caption={first_name + " " + last_name || "User"}
                color={theme.colors.ui.primary}
              />
              <Spacer position="top" size="small" />
              <Menu_Tile
                // Icon={EmailIcon}
                Icon={EmailIcon}
                width={"35px"}
                height={"35px"}
                caption={email}
                color={theme.colors.ui.primary}
              />
            </Container>
            <Menu_Sub_title_Tile
              caption={
                globalLanguage === "EN"
                  ? "Things of interest"
                  : "Cosas de interés"
              }
              variant={"menu_sub_title_text_2"}
            />
            <Container
              width={"100%"}
              height={"21%"}
              align="center"
              justify="flex-start"
              // color={"purple"}
              color={theme.colors.bg.screens_bg}
            >
              <Spacer position="top" size="small" />
              <Menu_Tile
                Icon={PasswordIcon}
                width={"30px"}
                height={"30px"}
                caption={
                  globalLanguage === "EN"
                    ? "Change your PIN number"
                    : "Cambia tu número PIN"
                }
                color={theme.colors.ui.primary}
                action={() => navigation.navigate("Entering_New_PIN_View")}
              />
              <Spacer position="top" size="small" />
              <Menu_Tile
                Icon={ArrowSwitchIcon}
                width={"30px"}
                height={"30px"}
                //   caption={"English"}
                caption={
                  globalLanguage === "EN"
                    ? "Cambia a español"
                    : "Switch to english"
                }
                color={theme.colors.ui.primary}
                isLoading={isLoading}
                action={async () => {
                  const res = await togglingGlobalLanguage();
                  console.log("RES:", res);
                  if (res.ok) {
                    navigation.goBack();
                  }
                }}
              />
              <Spacer position="top" size="small" />
              <Menu_Tile
                Icon={LogOutIcon}
                width={"30px"}
                height={"30px"}
                caption={globalLanguage === "EN" ? "Sign out" : "Salir"}
                color={theme.colors.ui.primary}
                action={() => loggingOutUser()}
              />
              <Spacer position="top" size="small" />
              <Container
                width={"100%"}
                height={"85%"}
                justify="flex-start"
                align="center"
                color={theme.colors.ui.secondary}
              />
            </Container>
          </Container>
        </Container>
      )}
    </SafeArea>
  );
}
