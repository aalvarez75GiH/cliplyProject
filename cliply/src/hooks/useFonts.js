// hooks/useFonts.ts
import { useFonts } from "expo-font";

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    "DM-Sans-Regular": require("../../assets/fonts/DMSans-Regular.ttf"),
    "DM-Sans-Bold": require("../../assets/fonts/DMSans-Bold.ttf"),
    "DM-Sans-semiBold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
  });

  return fontsLoaded;
}
