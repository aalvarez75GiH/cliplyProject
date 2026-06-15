import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Voice_and_recent_navigator } from "./voice_recent.navigator";
import { Type_Message_Navigator } from "./type_message.navigator";
import { Work_Flow_Navigator } from "./work_flow.navigator";

import KeyBoardIcon from "../../../assets/my-icons/keyboard.svg";
import MessagesIcon from "../../../assets/my-icons/Messages_icon.svg";
import MicIcon from "../../../assets/my-icons/micIcon.svg";
import { Status_Next_Step_Bottom_Bar } from "../../components/bottom_bars/status_next_step.bar";

import { GlobalContext } from "../services/global/global.context";
const Tab = createBottomTabNavigator();

const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => navigation.navigate(route.name),
});

const getActiveRouteName = (route) => {
  if (!route) return undefined;
  // Try the helper first
  const focused = getFocusedRouteNameFromRoute(route);
  if (focused) return focused;

  // Fallback: walk nested state (works on RN v6)
  let r = route;
  while (r && r.state && r.state.routes && r.state.index != null) {
    r = r.state.routes[r.state.index];
  }
  return r?.name;
};

// const ConditionalTabBar = (props) => {
//   const currentTabRoute = props.state.routes[props.state.index];
//   const nestedName = getActiveRouteName(currentTabRoute);

//   const BottomBar =
//     (currentTabRoute.name === "Home" &&
//       nestedName === "Clips_by_Status_View_1") ||
//     nestedName === "Clips_by_Status_View_2" ||
//     nestedName === "Clips_by_Status_View_3" ||
//     nestedName === "Quickies_Text_Clips_View";

//   if (BottomBar) {
//     // render your custom bar instead of the default one
//     return <Status_Next_Step_Bottom_Bar />;
//   }

//   return <BottomTabBar {...props} />;
// };

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
        name="Messages"
        // component={Messages_Navigator}
        component={Voice_and_recent_navigator}
        listeners={tabBarListeners}
        options={{
          title:
            globalLanguage === "EN" ? "Create & recent" : "Créar & recientes",
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
