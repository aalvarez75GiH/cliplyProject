import React, { useState, useContext, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../../infrastructure/typography/text.component.js";
import { EN_ES_CTA_component } from "../../calls_to_action/en_es.cta.js";
import {
  Container,
  Action_Container,
} from "../../global_components/containers/general_containers.js";
import CopyPaste_icon from "../../../../assets/my-icons/copy_paste.svg";
import { theme } from "../../../infrastructure/theme/index.js";
import SuccessIcon from "../../../../assets/my-icons/success_icon.svg";
import { Snack_Bar_Component } from "../../others/snack_bar.component.js";
import { Spacer } from "../../global_components/optimized.spacer.component.js";
import { Footer_1 } from "./footer_1.component.js";

import { GlobalContext } from "../../../infrastructure/services/global/global.context.js";

export const Translated_message_Tile = ({
  message_en,
  message_es,
  language_detected,
  width = "95%",
  height = "45%",
  message_id = null,
  globalLanguage,
  // route_name,
  onAction,
}) => {
  //   *******************************************************
  const navigation = useNavigation();
  // const [language, setLanguage] = useState(null);
  const [language, setLanguage] = useState(globalLanguage);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    setLanguage(globalLanguage);
  }, [globalLanguage]);

  const { userToDB, showSuccessSnackbar, snackbar } = useContext(GlobalContext);

  const { user_id } = userToDB;

  const updatedSpecificTextClipData = {
    user_id: user_id,
    message_id: message_id,
  };

  const toggleLanguage = async () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "ES" : "EN"));
    await Clipboard.setStringAsync(language === "EN" ? message_es : message_en);
  };

  const copy_message_action = async () => {
    setCopiedMessage(true);
    await Clipboard.setStringAsync(language === "EN" ? message_en : message_es);
    showSuccessSnackbar("Message copied", null, "");
  };

  const unCopy_message_action = async () => {
    setCopiedMessage(false);
    // setIsLoading(true);
    // setTimeout(async () => {
    await Clipboard.setStringAsync("");
    setLanguage(language_detected);
    // setIsLoading(false);
    // }, 300);
  };

  const routes_names_to_hide_delete_option = [
    "Type_Message_View",
    "Voice_and_recent_View",
    "Quick_Voice_Text_Clip",
  ];

  //   *******************************************************

  return (
    <>
      <Container
        width={width}
        height={height}
        align="center"
        justify="center"
        color={theme.colors.bg.elements_bg}
        style={{
          shadowColor: "#000", // iOS shadow color
          shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
          shadowOpacity: 0.25, // iOS shadow opacity
          shadowRadius: 3.84, // iOS shadow radius
          elevation: 5, // Android shadow
          position: "absolute",
          top: 90,
          bottom: 20,
        }}
      >
        <Action_Container
          width="100%"
          height="70%"
          align="center"
          justify="center"
          direction="row"
          color={theme.colors.bg.elements_bg}
          onPress={() => copy_message_action()}
        >
          {/* ***************** MESSAGE CONTENT  *********** */}
          {
            <Container
              width="90%"
              height="90%"
              align="center"
              justify="center"
              direction="row"
              color={theme.colors.bg.elements_bg}
            >
              <Text variant={"dm_sans_bold_18_centered"}>
                {language === null
                  ? globalLanguage === "EN"
                    ? message_en
                    : message_es
                  : null}
                {language === "EN" ? message_en : null}
                {language === "ES" ? message_es : null}
              </Text>
            </Container>
          }
        </Action_Container>
        {/* ***************** FOOTER 1 *********** */}
        <Footer_1
          language={language}
          toggleLanguage={toggleLanguage}
          copy_message_action={copy_message_action}
          updatedSpecificTextClipData={updatedSpecificTextClipData}
          globalLanguage={globalLanguage}
          routes_names_to_hide_delete_option={
            routes_names_to_hide_delete_option
          }
        />
        <Snack_Bar_Component
          snackbar={snackbar}
          bottom_ios={-25}
          bottom_android={-45}
          minHeight={60}
          minWidth={"100%"}
          duration={1000}
        />
      </Container>
    </>
  );
};
