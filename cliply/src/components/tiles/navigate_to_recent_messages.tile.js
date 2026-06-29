import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import {
  Action_Container,
  Container,
} from "../global_components/containers/general_containers.js";
import ChevronRightArrow from "../../../assets/my-icons/chevron-right.svg";

export const Navigate_to_Recent_Messages_Tile = () => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Action_Container
      width="100%"
      height={screenHeight * 0.07}
      onPress={() => navigation.navigate("Listing_Recent_Messages_View")}
    >
      <LinearGradient
        colors={["#F3E2A6", "#EBD89A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: screenHeight * 0.075,
          flexDirection: "row",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#E8D794",
        }}
      >
        <Container
          width="90%"
          height="100%"
          justify="center"
          align="flex-start"
          color="transparent"
          style={{ paddingLeft: 24 }}
        >
          <Text variant="dm_sans_bold_18">Recent messages</Text>
          <Text variant="dm_sans_bold_14">Open your recent messages</Text>
        </Container>

        <Container
          width="10%"
          height="100%"
          justify="center"
          align="center"
          color="transparent"
        >
          <ChevronRightArrow width={20} height={20} />
        </Container>
      </LinearGradient>
    </Action_Container>
  );
};
