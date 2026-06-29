import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Talk_and_paste_View from "../../views/talk_and_paste_views/talk_and_paste.view";
import Menu_Screen from "../../views/work/menu.view"; // Assuming this is the correct import for the menu screen
import { Recent_Messages_View } from "../../views/talk_and_paste_views/recent_messages.view";
// import { Recent_Text_Clip_View } from "../../views/voice_and_recent_views/recent_text_clip.view";
import Delete_Item_View from "../../views/global_views/delete_item.view";
import Selecting_Operation_And_Status_View from "../../views/voice_and_recent_views/selecting_operation_and_status_to_save_text_clip.view";
import Uploading_Text_Clip_View from "../../views/voice_and_recent_views/uploading_text_clip.view";
import Added_Item_View from "../../views/global_views/added_item.view";
import Temporary_Recent_Messages_View from "../../views/talk_and_paste_views/temporary_recent_messages.view";

const TalkStack = createNativeStackNavigator();

export const Talk_and_Paste_navigator = () => {
  return (
    <TalkStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TalkStack.Screen
        //name="Voice_and_recent_View"
        name="Talk_and_paste_View"
        component={Talk_and_paste_View}
      />
      <TalkStack.Screen name="Menu_View" component={Menu_Screen} />
      <TalkStack.Screen
        name="Recent_Text_Clip_View"
        component={Recent_Messages_View}
      />
      <TalkStack.Screen name="Delete_Item_View" component={Delete_Item_View} />
      <TalkStack.Screen
        name="Saving_text_clip_1"
        component={Selecting_Operation_And_Status_View}
      />
      <TalkStack.Screen
        name="Uploading_text_clip"
        component={Uploading_Text_Clip_View}
      />
      <TalkStack.Screen
        name="Temporary_Recent_Messages_View"
        component={Temporary_Recent_Messages_View}
      />
      <TalkStack.Screen name="Added_item" component={Added_Item_View} />
    </TalkStack.Navigator>
  );
};
