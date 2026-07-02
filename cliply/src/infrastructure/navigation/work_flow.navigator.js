import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu_Screen from "../../views/work/menu.view";
import Quickies_Text_Clips_View from "../../views/work/quickies_text_clips.view";
import Operations_Work_Flow_Area from "../../views/work/operations_work_flow_area";

import Messages_by_Status_View from "../../views/work/messages_by_status.view";
import Quick_Voice_Text_Clip from "../../views/work/status_views/quick_voice_text_clip";
import Multiple_Emails_LoginIn_View from "../../views/global_views/multiple_emails_login.view";
import Entering_New_PIN_View from "../../views/global_views/entering_new_pin.view";
import Successful_View from "../../views/global_views/successfull_process.view";
import Delete_Item_View from "../../views/global_views/delete_item.view";

const WorkFlowStack = createNativeStackNavigator();

export const Work_Flow_Navigator = () => {
  return (
    <WorkFlowStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <WorkFlowStack.Screen
        name="Home_View"
        component={Operations_Work_Flow_Area}
      />
      {/* <WorkFlowStack.Screen name="Home_View" component={Work_Flow_View} /> */}

      <WorkFlowStack.Screen name="Menu_View" component={Menu_Screen} />
      <WorkFlowStack.Screen
        name="Messages_by_Status_View"
        component={Messages_by_Status_View}
      />

      <WorkFlowStack.Screen
        name="Quickies_Text_Clips_View"
        component={Quickies_Text_Clips_View}
      />
      <WorkFlowStack.Screen
        name="Quick_Voice_Text_Clip"
        component={Quick_Voice_Text_Clip}
      />

      <WorkFlowStack.Screen
        name="Multiple_Emails_LoginIn_View"
        component={Multiple_Emails_LoginIn_View}
      />
      <WorkFlowStack.Screen
        name="Entering_New_PIN_View"
        component={Entering_New_PIN_View}
      />
      <WorkFlowStack.Screen
        name="Successful_View"
        component={Successful_View}
      />
      <WorkFlowStack.Screen
        name="Delete_Item_View"
        component={Delete_Item_View}
      />
    </WorkFlowStack.Navigator>
  );
};
