import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export function usePreloadImages() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      await Promise.all(
        sources.map((src) => Asset.fromModule(src).downloadAsync())
      );
      setReady(true);
    })();
  }, [sources]);
  return ready;
}
