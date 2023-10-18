import { useContext } from "react";
import { AppContextInterface, WFPCoreContext } from "./WFPCoreProvider";

export default function useTheme(): AppContextInterface {
  const settings = useContext(WFPCoreContext);
  return settings;
}
