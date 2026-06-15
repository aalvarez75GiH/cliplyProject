/*Eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext } from "react";
import "react-native-get-random-values";

import { GlobalContext } from "../global/global.context.js";

import { Spacer } from "../../../components/global_components/optimized.spacer.component.js";
import { Stored_Clips_Tile } from "../../../components/tiles/stored_clip.tile.js";
import { Quickies_Tile } from "../../../components/tiles/quickies.tile.js";
import { update_Text_Clips_Used_Count_Request } from "./text_clips.requests.js";

export const TextClipsContext = createContext();

export const TextClipsContextProvider = ({ children }) => {
  const {
    userToDB,
    globalLanguage,
    isUserDataLoading,
    gettingUserDataOnDifferentOperations,
  } = useContext(GlobalContext);

  const nextStepInitialState = {
    status_view: "Clips_by_Status_View_1",
    operation_name: "food_delivery",
    operation_id: "ac33dc0e-27df-4bec-8390-f63049cc0737",
    status_name: "heading_to_pickup/shop",
    caption: "Heading to pickup/shop",
    bottom_bar_caption:
      globalLanguage === "EN" ? "Next stop" : "Próxima parada",
  };
  const nextStepInitialState_RS = {
    status_view: "Clips_by_Status_View_1",
    operation_name: "ride_share",
    operation_id: "c98742b6-74a7-4625-b3fb-ab1bb8a0d4b6",
    status_name: "heading_to_passenger",
    caption: "Heading to passenger",
    bottom_bar_caption:
      globalLanguage === "EN" ? "Next stop" : "Próxima parada",
  };
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [introAdded, setIntroAdded] = useState(false);
  const [operation, setOperation] = useState("food_delivery");
  const [nextStep, setNextStep] = useState(nextStepInitialState);
  const [nextStepRS, setNextStepRS] = useState(nextStepInitialState_RS);
  const [dataForUsedCountUpdate, setDataForUsedCountUpdate] = useState(null);
  const [specificTextClipData, setSpecificTextClipData] = useState(null);

  const resetNextStepState = (bottom_bar_caption) => {
    if (
      bottom_bar_caption === "Restart" ||
      bottom_bar_caption === "Reiniciar"
    ) {
      navigation.navigate("Home_View");
      setNextStep(nextStepInitialState);
    } else {
      navigation.navigate(nextStep.status_view, nextStep);
    }
  };

  // const [intro, setIntro] = useState("");

  const { user_id } = userToDB || {}; // Ensure userToDB is not undefined or null
  // console.log("USER ID TO DB AT HOME CONTEXT:", user_id);

  const updatingTextClipsUsedCount = async (usedCountDataForUpdate) => {
    try {
      const response = await update_Text_Clips_Used_Count_Request(
        usedCountDataForUpdate
      );
      if (response.status === 201) {
        gettingUserDataOnDifferentOperations(user_id);
      } else {
        console.log("Failed to update text clips used count:", response.status);
      }
    } catch (error) {}
  };

  console.log(
    "SPECIFIC TEXT CLIP DATA IN TEXT CLIPS CONTEXT:",
    specificTextClipData
  );
  const renderStoredMessagesTile = ({ item }) => {
    return (
      <Spacer position="bottom" size="medium">
        <Stored_Clips_Tile
          item={item}
          globalLanguage={globalLanguage}
          setIsLoading={setIsLoading}
          selectedItemId={selectedItemId}
          onSelect={setSelectedItemId}
          isLoading={isLoading}
          specificTextClipData={specificTextClipData}
          setSpecificTextClipData={setSpecificTextClipData}
        />
      </Spacer>
    );
  };
  const renderQuickiesTile = ({ item }) => {
    return (
      <Spacer position="bottom" size="medium">
        <Quickies_Tile
          item={item}
          globalLanguage={globalLanguage}
          setIsLoading={setIsLoading}
          selectedItemId={selectedItemId}
          onSelect={setSelectedItemId}
          isLoading={isLoading}
        />
      </Spacer>
    );
  };

  return (
    <TextClipsContext.Provider
      value={{
        renderStoredMessagesTile,
        setSelectedItemId,
        isLoading,
        setIsLoading,
        introAdded,
        setIntroAdded,
        renderQuickiesTile,
        nextStep,
        setNextStep,
        nextStepInitialState,
        nextStepRS,
        setNextStepRS,
        resetNextStepState,
        operation,
        setOperation,
        updatingTextClipsUsedCount,
        setDataForUsedCountUpdate,
        isUserDataLoading,
        gettingUserDataOnDifferentOperations,
        specificTextClipData,
        setSpecificTextClipData,
      }}
    >
      {children}
    </TextClipsContext.Provider>
  );
};
