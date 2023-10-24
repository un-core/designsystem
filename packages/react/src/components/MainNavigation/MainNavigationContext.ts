/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

export interface MainNavigationContextType {
  /**
   * Callback when the user clicks on a sub menu item
   */
  onChangeSub: (action: string, i?: string, e?: any) => void;
  /**
   * The active menu item
   */
  activeMenuItem?: string | null;
  /**
   * Whether the mobile menu is open
   */
  openMobileMenu: boolean;
  /**
   * Toggle the mobile menu
   */
  toggleMenu: () => void;
}

const MainNavigationContext = React.createContext<MainNavigationContextType>({
  onChangeSub: (e) => e,
  activeMenuItem: null,
  openMobileMenu: false,
  toggleMenu: () => {},
});
export default MainNavigationContext;
