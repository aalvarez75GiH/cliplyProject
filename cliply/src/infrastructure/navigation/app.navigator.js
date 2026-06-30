import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Type_Message_Navigator } from "./type_message.navigator";
import { Work_Flow_Navigator } from "./work_flow.navigator";
import { Talk_and_Paste_navigator } from "./talk_and_paste.navigator";

import KeyBoardIcon from "../../../assets/my-icons/keyboard.svg";
import MessagesIcon from "../../../assets/my-icons/Messages_icon.svg";
import MicIcon from "../../../assets/my-icons/micIcon.svg";

import { GlobalContext } from "../services/global/global.context";
const Tab = createBottomTabNavigator();

const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => navigation.navigate(route.name),
});

export const AppNavigator = () => {
  const { globalLanguage } = React.useContext(GlobalContext);
  return (
    <Tab.Navigator
      // tabBar={(props) => <ConditionalTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "#898989",
        tabBarInactiveTintColor: "#000000",
        headerShown: false,
        tabBarBackground: undefined,
        tabBarStyle: Platform.select({
          ios: {
            height: 90,
            paddingTop: 14, // Increase height for larger icons
            backgroundColor: "#FFFFFF", // Transparent background for blur effect
          },
          default: {
            height: 100,
            paddingTop: 14, // Increase height for larger icons
            backgroundColor: "#FFFFFF", // Transparent background for blur effect
          },
        }),

        tabBarLabelStyle: {
          fontSize: 12, // Increase font size
          fontWeight: "bold", // Optional: Make it bold
          paddingTop: 5, // Adjust padding for better spacing
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Work_Flow_Navigator}
        listeners={tabBarListeners}
        options={{
          title: globalLanguage === "EN" ? "Work" : "Trabajo",
          tabBarIcon: ({ color }) => (
            <MessagesIcon width={30} height={30} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Talk&Paste"
        // component={Messages_Navigator}
        component={Talk_and_Paste_navigator}
        listeners={tabBarListeners}
        options={{
          title: globalLanguage === "EN" ? "Talk & Paste" : "Habla & pega",
          tabBarIcon: ({ color }) => (
            <MicIcon width={25} height={25} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Type & translate"
        component={Type_Message_Navigator}
        listeners={tabBarListeners}
        options={{
          title: globalLanguage === "EN" ? "Translate" : "Traduce",
          tabBarIcon: ({ color }) => (
            <KeyBoardIcon width={25} height={25} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
