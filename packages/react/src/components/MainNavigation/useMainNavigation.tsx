import { useContext } from "react";

import MainNavigationContext, {
  MainNavigationContextType,
} from "./MainNavigationContext";

/** The useMainNavigation() is a hook to access the current state of the MainNavigation and manipulate it. */

function useMainNavigation(): MainNavigationContextType {
  const settings = useContext(MainNavigationContext);

  return settings;
}

useMainNavigation.displayName = "useMainNavigation";

export default useMainNavigation;
