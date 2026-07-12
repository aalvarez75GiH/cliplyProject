import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Talk_and_paste_View from "../../views/talk_and_paste_views/talk_and_paste.view";
import Menu_Screen from "../../views/work/menu.view"; // Assuming this is the correct import for the menu screen
import Recent_Message_View from "../../views/talk_and_paste_views/recent_message.view";
import Selecting_Operation_And_Status_View from "../../views/talk_and_paste_views/selecting_operation_and_status_to_save_text_clip.view";
import Uploading_Message_View from "../../views/talk_and_paste_views/uploading_message.view";
import Added_Item_View from "../../views/global_views/added_item.view";
import Listing_Recent_Messages_View from "../../views/talk_and_paste_views/listing_recent_messages.view";
import Delete_Overlay_View from "../../views/global_views/delete_overlay.view";

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
        name="Recent_Message_View"
        component={Recent_Message_View}
      />
      <TalkStack.Screen
        name="Delete_Overlay_View"
        component={Delete_Overlay_View}
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <TalkStack.Screen
        name="Saving_message_to_status"
        component={Selecting_Operation_And_Status_View}
      />
      <TalkStack.Screen
        name="Uploading_Message_View"
        component={Uploading_Message_View}
      />
      <TalkStack.Screen
        name="Listing_Recent_Messages_View"
        component={Listing_Recent_Messages_View}
      />
      <TalkStack.Screen name="Added_item" component={Added_Item_View} />
    </TalkStack.Navigator>
  );
};
