import React, { useState, useContext } from "react";
import { Platform } from "react-native";

import { Text } from "../../infrastructure/typography/text.component.js";
import { Container } from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";
export const Uploading_text_clip_Tile = ({
  textClip_data_to_upload,
  operation_label,
  status_label,
}) => {
  //   *******************************************************
  const [language, setLanguage] = useState(null);
  const { globalLanguage } = useContext(GlobalContext);
  const { new_message, user_id, operation_name, status_name } =
    textClip_data_to_upload;
  const { original_message, message_id, body } = new_message;
  const { en, es } = body;
  console.log(
    " NEW MESSAGE AT UPLOADING TILE:",
    JSON.stringify(new_message, null, 2)
  );

  return (
    <>
      <Container
        width={Platform.OS === "ios" ? "400px" : "100%"}
        height="300px"
        align="center"
        justify="flex-start"
        color={theme.colors.bg.screens_bg}
        // color={"brown"}
        style={{
          shadowColor: "#000", // iOS shadow color
          shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
          shadowOpacity: 0.25, // iOS shadow opacity
          shadowRadius: 3.84, // iOS shadow radius
          elevation: 5, // Android shadow
        }}
      >
        <Container
          width="100%"
          height="20%"
          align="center"
          justify="flex-start"
          direction="row"
          color={theme.colors.bg.elements_bg}
          //color={"green"}
        >
          <Spacer position="top" size="extraLarge">
            <Spacer position={"left"} size="large">
              <Text variant={"dm_sans_bold_22"}>
                {globalLanguage === "EN" ? "Text clip:" : "Clip de téxto"}
              </Text>
            </Spacer>
          </Spacer>
        </Container>
        <Container
          width="100%"
          height="40%"
          align="flex-start"
          justify="center"
          direction="row"
          color={theme.colors.bg.elements_bg}
          //color={"blue"}
        >
          <Container
            width="93%"
            height="100%"
            align="center"
            justify="center"
            direction="row"
            color={theme.colors.bg.elements_bg}
            //color={"red"}
          >
            <Text variant={"dm_sans_regular_18"}>
              {globalLanguage === "EN" ? en : es}
            </Text>
          </Container>
        </Container>
        {/* ***************** FOOTER  ************************** */}
        <Spacer position={"top"} size="small" />
        {/* <Spacer position={"top"} size="small"> */}
        <Container
          width={Platform.OS === "ios" ? "400px" : "100%"}
          height="40%"
          align="flex-start"
          direction="row"
          color={theme.colors.bg.elements_bg}
          //color={"lightblue"}
          justify="space-around"
        >
          <Container
            width="30%"
            height="70%"
            align="flex-start"
            justify="center"
            direction="column"
            color={theme.colors.bg.elements_bg}
            //color={"blue"}
          >
            <Spacer position={"left"} size="large">
              <Text variant={"dm_sans_bold_18"}>
                {globalLanguage === "EN" ? "Type:" : "Tipo"}
              </Text>
            </Spacer>
            <Spacer position={"left"} size="large">
              <Text variant={"dm_sans_bold_18"}>Status:</Text>
            </Spacer>
          </Container>
          <Container
            width="70%"
            height="70%"
            align="flex-start"
            justify="center"
            direction="column"
            color={theme.colors.bg.elements_bg}
            //color={"yellow"}
          >
            <Spacer position={"left"} size="large">
              <Text variant={"dm_sans_regular_16"}>{operation_label}</Text>
            </Spacer>
            <Spacer position={"left"} size="large">
              <Text variant={"dm_sans_regular_16"}>{status_label}</Text>
            </Spacer>
          </Container>
        </Container>
        {/* </Spacer> */}
      </Container>
    </>
  );
};
