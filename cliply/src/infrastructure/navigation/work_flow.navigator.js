import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Text_Clips_View from "../../views/text_clips_views/text_clips.view";
import Menu_Screen from "../../views/work/menu.view";
import Quickies_Text_Clips_View from "../../views/work/quickies_text_clips.view";
import Work_Flow_View from "../../views/work/work_flow.view";
import Operations_Work_Flow_Area from "../../views/work/operations_work_flow_area";

import Text_Clips_by_Status_View from "../../views/work/text_clips_by_status.view";
// import Text_Clips_by_Status_View_1 from "../../views/work/status_views/status_1.view";
// import Text_Clips_by_Status_View_2 from "../../views/work/status_views/status_2.view";
// import Text_Clips_by_Status_View_3 from "../../views/work/status_views/status_3.view";
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
        name="Text_Clips_by_Status_View"
        component={Text_Clips_by_Status_View}
      />
      {/* <WorkFlowStack.Screen
        name="Clips_by_Status_View_1"
        component={Text_Clips_by_Status_View_1}
      />
      <WorkFlowStack.Screen
        name="Clips_by_Status_View_2"
        component={Text_Clips_by_Status_View_2}
      />
      <WorkFlowStack.Screen
        name="Clips_by_Status_View_3"
        component={Text_Clips_by_Status_View_3}
      /> */}
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
