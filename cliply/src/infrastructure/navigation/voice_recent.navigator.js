import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Voice_and_recent_View from "../../views/voice_and_recent_views/voice_and_recent.view";
import Menu_Screen from "../../views/work/menu.view"; // Assuming this is the correct import for the menu screen
import { Recent_Text_Clip_View } from "../../views/voice_and_recent_views/recent_text_clip.view";
import Delete_Item_View from "../../views/global_views/delete_item.view";
import Selecting_Operation_And_Status_View from "../../views/voice_and_recent_views/selecting_operation_and_status_to_save_text_clip.view";
import Uploading_Text_Clip_View from "../../views/voice_and_recent_views/uploading_text_clip.view";
import Added_Item_View from "../../views/global_views/added_item.view";
const VoiceStack = createNativeStackNavigator();

export const Voice_and_recent_navigator = () => {
  return (
    <VoiceStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <VoiceStack.Screen
        name="Voice_and_recent_View"
        component={Voice_and_recent_View}
      />
      <VoiceStack.Screen name="Menu_View" component={Menu_Screen} />
      <VoiceStack.Screen
        name="Recent_Text_Clip_View"
        component={Recent_Text_Clip_View}
      />
      <VoiceStack.Screen name="Delete_Item_View" component={Delete_Item_View} />
      <VoiceStack.Screen
        name="Saving_text_clip_1"
        component={Selecting_Operation_And_Status_View}
      />
      <VoiceStack.Screen
        name="Uploading_text_clip"
        component={Uploading_Text_Clip_View}
      />
      <VoiceStack.Screen name="Added_item" component={Added_Item_View} />
    </VoiceStack.Navigator>
  );
};
