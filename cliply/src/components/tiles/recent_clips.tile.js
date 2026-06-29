import React from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../infrastructure/typography/text.component.js";
import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

export const Recent_clips_Tile = ({ item, globalLanguage, date_formatted }) => {
  //   *******************************************************
  //   const { summary_en, summary_es, message_id, specific } = item;
  const { summary, specific } = item;
  console.log("ITEM:", JSON.stringify(item, null, 2));

  const navigation = useNavigation();
  //   *******************************************************

  return (
    <>
      <Spacer position="left" size="small">
        <Action_Container
          // width={Platform.OS === "ios" ? "100%" : "90%"}
          width={Platform.OS === "ios" ? "99%" : "99%"}
          height="130px"
          align="center"
          justify="flex-start"
          color={theme.colors.bg.elements_bg}
          //color={"#FFE299"}
          //color={"red"}
          style={{
            shadowColor: "#000", // iOS shadow color
            shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
            shadowOpacity: 0.25, // iOS shadow opacity
            shadowRadius: 3.84, // iOS shadow radius
            elevation: 5, // Android shadow
          }}
          onPress={() =>
            navigation.navigate("Recent_Message_View", {
              item,
            })
          }
        >
          <Container
            width="100%"
            height="50%"
            align="center"
            justify="center"
            direction="row"
            color={theme.colors.bg.elements_bg}
            //color={"#FFE299"}
          >
            <Container
              width="100%"
              height="100%"
              align="flex-end"
              justify="center"
              direction="row"
              color={theme.colors.bg.elements_bg}
              //color={"red"}
            >
              {globalLanguage === "ES" && (
                <Text
                  variant="dm_sans_bold_24"
                  numberOfLines={1}
                  style={{ textAlign: "right" }}
                >
                  "{summary.es}"
                </Text>
              )}
              {globalLanguage === "EN" && (
                <Text
                  variant="dm_sans_bold_24"
                  numberOfLines={1}
                  style={{ textAlign: "right" }}
                >
                  "{summary.en}"
                </Text>
              )}
            </Container>
          </Container>

          <Container
            width="100%"
            height="50%"
            align="center"
            justify="space-around"
            color={theme.colors.bg.elements_bg}
            //   color={"blue"}
            direction="row"
          >
            {specific === "specific" ? (
              <Container
                width="20%"
                height="40%"
                align="center"
                justify="center"
                color={theme.colors.ui.primary}
                //color={"purple"}
              >
                <Text
                  variant="dm_sans_bold_12_white"
                  style={{ textAlign: "right" }}
                >
                  Specific
                </Text>
              </Container>
            ) : (
              <Container
                width="20%"
                height="100%"
                align="center"
                justify="center"
                //color={"purple"}
                color={theme.colors.bg.elements_bg}
              />
            )}
            <Spacer position="left" size="small" />
            <Container
              width="30%"
              height="100%"
              align="center"
              justify="center"
              color={theme.colors.bg.elements_bg}
            >
              <Text
                variant="dm_sans_bold_12_disable_not_active"
                numberOfLines={1}
                style={{ textAlign: "right", textDecorationLine: "underline" }}
              >
                View
              </Text>
            </Container>
            <Container
              width="30%"
              height="100%"
              align="center"
              justify="center"
              //            color={"lightblue"}
              color={theme.colors.bg.elements_bg}
            >
              <Text
                variant="dm_sans_bold_12_disable_not_active"
                //numberOfLines={1}
                style={{ textAlign: "right", textDecorationLine: "underline" }}
              >
                {date_formatted}
              </Text>
            </Container>
          </Container>
        </Action_Container>
      </Spacer>
    </>
  );
};
