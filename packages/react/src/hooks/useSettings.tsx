import { useContext } from "react";

import { defaultWFPContext } from "../components/WFPCoreSettings/defaults";
import {
  AppContextInterface,
  WFPCoreContext,
} from "../components/WFPCoreSettings/WFPCoreProvider";

export default function useSettings(): AppContextInterface {
  const settings = useContext(WFPCoreContext);
  if (settings?.initialized === false) {
    console.warn("useSettings: WFPCoreContext not initialized");
  }

  if (settings === undefined) {
    return defaultWFPContext;
  }

  return settings;
}
