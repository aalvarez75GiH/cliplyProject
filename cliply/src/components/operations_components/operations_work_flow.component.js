import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { Status_CTA_PNG } from "../calls_to_action/status_cta_png.cta";
import { theme } from "../../infrastructure/theme/index";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers";
import { Spacer } from "../global_components/optimized.spacer.component.js";
import RocketIcon from "../../../assets/my-icons/rocket_icon.svg";
import { Text } from "../../infrastructure/typography/text.component";

import { TextClipsContext } from "../../infrastructure/services/home/text_clips.context";
import { Platform } from "react-native";

export const Operations_Work_flow_Component = ({
  caption_1,
  caption_2,
  image_source_1,
  inverted,
  action,
  status,
  step_number,
}) => {
  const { operation } = useContext(TextClipsContext);
  const navigation = useNavigation();
  return !inverted ? (
    <>
      <Container
        width={Platform.OS === "ios" ? "100%" : "100%"}
        height={Platform.OS === "ios" ? "22%" : "20%"}
        justify="flex-start"
        color={theme.colors.bg.elements_bg}
        // color={"green"}
        align="center"
        direction="row"
      >
        <Spacer position="left" size="medium">
          <Status_CTA_PNG
            caption_1={caption_1}
            caption_2={caption_2}
            action={action}
            inverted={inverted}
            image_source={image_source_1}
            step_number={step_number}
          />
        </Spacer>
        <Spacer position="left" size="small" />
        <Action_Container
          //   width="18%"
          width={Platform.OS === "ios" ? "18%" : "25%"}
          height={"95%"}
          justify="center"
          color={theme.colors.bg.screens_bg}
          //   color={"red"}
          align="center"
          direction="column"
          //   border_radius="10px"
          onPress={() =>
            navigation.navigate("Quickies_Text_Clips_View", {
              operation: operation,
              status: status,
            })
          }
        >
          <RocketIcon width={30} height={30} />
          <Text variant="dm_sans_bold_12">Quickies</Text>
        </Action_Container>
      </Container>
    </>
  ) : (
    <>
      <Container
        // width="100%"
        width={Platform.OS === "ios" ? "100%" : "110%"}
        height={Platform.OS === "ios" ? "22%" : "20%"}
        justify="flex-start"
        color={theme.colors.bg.elements_bg}
        //color={"green"}
        align="center"
        direction="row"
      >
        <Spacer position="left" size="small" />
        <Action_Container
          //   width="18%"
          width={Platform.OS === "ios" ? "18%" : "25%"}
          height={"95%"}
          justify="center"
          color={theme.colors.bg.screens_bg}
          //   color={"red"}
          align="center"
          direction="column"
          onPress={() =>
            navigation.navigate("Quickies_Text_Clips_View", {
              operation: operation,
              status: status,
            })
          }
        >
          <RocketIcon width={30} height={30} />
          <Text variant="dm_sans_bold_12">Quickies</Text>
        </Action_Container>

        <Spacer position="left" size="medium">
          <Status_CTA_PNG
            caption_1={caption_1}
            caption_2={caption_2}
            action={action}
            inverted={inverted}
            image_source={image_source_1}
            step_number={step_number}
          />
        </Spacer>
      </Container>
    </>
  );
};
