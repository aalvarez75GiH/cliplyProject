import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Type_Message_View from "../../views/type_message_views/type_message.view";
import Text_Clips_View from "../../views/text_clips_views/text_clips.view";
import Selecting_Operation_And_Status_View from "../../views/voice_and_recent_views/selecting_operation_and_status_to_save_text_clip.view";

const TypeStack = createNativeStackNavigator();

export const Type_Message_Navigator = () => {
  return (
    <TypeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TypeStack.Screen
        name="Type_Message_View"
        component={Type_Message_View}
      />
      <TypeStack.Screen name="Recents_View" component={Text_Clips_View} />
      <TypeStack.Screen
        name="Saving_text_clip_1"
        component={Selecting_Operation_And_Status_View}
      />
    </TypeStack.Navigator>
  );
};
