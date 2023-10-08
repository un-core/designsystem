import React, { ComponentType, useState } from "react";
import classNames from "classnames";

import WrapperDefault from "../Wrapper";
import useSettings from "../../hooks/useSettings";
import { ScreenSize } from "../../utils";
import MainNavigationContext from "./MainNavigationContext";
import MobileButtonDefault, { MobileButtonProps } from "./MobileButton";
import { WrapperProps } from "../Wrapper/Wrapper";

/** The Main Navigation is a Horizontal Menu which consists of multiple clickable items placed at the top of the page. The navigation stays unchanged when browswing through the site and is present on every page. The currently selected item is usually highlighted. */

interface MainNavigationProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * The Logo can be either a string or a component
   */
  logo?: string | React.ReactNode;
  /**
   * Specify the max-width on desktop devices (same as \`Wrapper\` component)
   */
  pageWidth?: ScreenSize;
  /*
   * The replaceable components to be used for the main navigation. MobileButton(prefix, toggleMenu): accepts a React.ReactNode which will be used as the mobile button. Wrapper: accepts a React.ReactNode which will be used as the wrapper.
   */
  components?: {
    Wrapper?: ComponentType<WrapperProps>;
    MobileButton?: ComponentType<MobileButtonProps>;
  };
  /**
   * Specify the max-width on mobile devices (same as \`Wrapper\` component)
   */
  mobilePageWidth?: ScreenSize;
  /**
   * A line will be placed above the navigation
   */
  line: boolean;
  /**
   * Additional className for the `Wrapper`
   */
  wrapperClassName?: string;
  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className?: string;
  /**
   * Defines an `id` for the component.
   */
  id?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  children,
  components: componentsOverride = {},
  className,
  id,
  logo,
  line = false,
  mobilePageWidth,
  pageWidth,
}) => {
  const { prefix } = useSettings();
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  const onChangeSub = (
    action: string,
    i?: string,
    e?: React.SyntheticEvent
  ) => {
    if (e) e.preventDefault();

    if (action === "close") {
      setActiveMenuItem(null);
    } else if (action === "toggle") {
      const newI = activeMenuItem === null || activeMenuItem !== i ? i : null;
      if (newI !== undefined) setActiveMenuItem(newI);
    }
  };

  const toggleMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  // const triggerSubNavigation = () => {
  //   setActiveMenuItem(undefined);
  // };

  // const handleClickOutside = () => {
  //   setActiveMenuItem(undefined);
  // };

  const wrapperClasses = classNames(
    `${prefix}--main-navigation`,
    { [`${prefix}--main-navigation--line`]: line },
    className
  );

  const listClasses = classNames(`${prefix}--main-navigation__list`, {
    [`${prefix}--main-navigation__list--open`]: openMobileMenu,
  });

  const components = {
    Wrapper: WrapperDefault,
    MobileButton: MobileButtonDefault,
    ...componentsOverride,
  };

  const Wrapper = components.Wrapper as React.FC<WrapperProps>;
  const MobileButton = components.MobileButton as React.FC<MobileButtonProps>;

  return (
    <div id={id} className={wrapperClasses}>
      <MainNavigationContext.Provider
        value={{ activeMenuItem, openMobileMenu, toggleMenu, onChangeSub }}
      >
        <Wrapper
          pageWidth={pageWidth}
          mobilePageWidth={mobilePageWidth}
          className={`${prefix}--main-navigation__wrapper`}
        >
          <div className={`${prefix}--main-navigation__logo-wrapper`}>
            <MobileButton
              toggleMenu={toggleMenu}
              prefix={prefix}
              openMobileMenu={openMobileMenu}
            >
              Menu
            </MobileButton>
            <div className={`${prefix}--main-navigation__logo`}>{logo}</div>
          </div>
          <ul className={listClasses}>{children}</ul>
        </Wrapper>
      </MainNavigationContext.Provider>
    </div>
  );
};

MainNavigation.displayName = "MainNavigation";

export default MainNavigation;
