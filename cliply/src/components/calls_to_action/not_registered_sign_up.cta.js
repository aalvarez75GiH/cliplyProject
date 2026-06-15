import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import { Text } from "../../infrastructure/typography/text.component";
import { theme } from "../../infrastructure/theme";

import { GlobalContext } from "../../infrastructure/services/global/global.context";

export const Not_Registered_Sign_Up_CTA = ({ language }) => {
  const navigation = useNavigation();
  const { globalLanguage } = useContext(GlobalContext);
  return (
    <Container
      width={language === "EN" ? "60%" : "70%"}
      height="45%"
      justify="center"
      align="center"
      color="transparent"
      direction="row"
    >
      <Container
        width={globalLanguage === "EN" ? "60%" : "45%"}
        height="30%"
        justify="center"
        align="center"
        color="transparent"
      >
        <Text variant="dm_sans_bold_16">
          {globalLanguage === "EN" ? "Not registered?" : "Sin cuenta?"}
        </Text>
      </Container>
      <Action_Container
        width={language === "EN" ? "30%" : "35%"}
        height="30%"
        justify="center"
        align="center"
        color="transparent"
        onPress={() => {
          // navigation.navigate("Register_User_View_2");
          navigation.navigate("Register_user_View");
        }}
      >
        <Text
          variant="dm_sans_bold_16"
          style={{
            textDecorationLine: "underline",
          }}
        >
          {globalLanguage === "EN" ? "Sign up" : "Regístrate"}
        </Text>
      </Action_Container>
    </Container>
  );
};
