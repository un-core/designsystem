import * as React from "react";
// import Icon from '../Icon';
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import { ChevronLeft } from "@wfp/icons-react";
import useSettings from "../../hooks/useSettings";

type SidebarProps = PropsWithChildren<{
  /**
   The `active` prop show the content section when an item is clicked. It's useful in mobile view 
 */
  active?: boolean | string | number;
  /**
   The Sidebar is usually where the sidebar items will be. 
   `<SidebarHeader/>` can be called in `Sidebar` and example search can be used in here
 */
  sidebar?: React.ReactNode;
  /**
     The sidebarMobileHeader is shwon when view is in mobile version. 
     `<SidebarBackButton/>` can used in the `sidebarMobileHeader` prop
  */
  sidebarMobileHeader?: React.ReactNode;
  className?: string;
}>;

const Sidebar: React.FC<SidebarProps> = ({
  active,
  children,
  className,
  // sidebarMobileHeader,
  sidebar,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(
    `${prefix}--sidebar-content__container`,
    className,
    {
      [`${prefix}--sidebar-content__container--active`]: active,
    }
  );

  return (
    <div className={classes} {...other}>
      <div className={`${prefix}--sidebar-item-content`}>{sidebar}</div>
      <div className={`${prefix}--content-section`}>{children}</div>
    </div>
  );
};

export interface SidebarHeaderProps {
  /**
   Disable the default padding of the SidebarHeader
 */
  noPadding?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  children,
  noPadding,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sidebar-content__header`, className, {
    [`${prefix}--sidebar-content__header--no-padding`]: noPadding,
  });

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

type SidebarContentHeaderProps = PropsWithChildren<{
  className?: string;
}>;

const SidebarContentHeader: React.FC<SidebarContentHeaderProps> = ({
  className,
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  const mobileClasses = classNames(
    `${prefix}--sidebar-content-mobile-header`,
    className,
    {}
  );

  return (
    <div className={mobileClasses} {...other}>
      {children}
    </div>
  );
};

type SidebarContentBodyProps = PropsWithChildren<{
  className?: string;
}>;

const SidebarContentBody: React.FC<SidebarContentBodyProps> = ({
  className,
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(
    `${prefix}--sidebar-content__children`,
    className,
    {}
  );

  return (
    <div id="scroll-container" className={classes} {...other}>
      {children}
    </div>
  );
};

interface SidebarScrollProps {
  children?: React.ReactNode;
}

const SidebarScroll: React.FC<SidebarScrollProps> = ({
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  return (
    <div className={`${prefix}--sidebar-content__scroll`} {...other}>
      {children}
    </div>
  );
};

interface SidebarBackButtonProps {
  children?: React.ReactNode;
}

const SidebarBackButton: React.FC<SidebarBackButtonProps> = ({
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  return (
    <div className={`${prefix}--sidebar-content__back-button`} {...other}>
      <ChevronLeft />
      {children}
    </div>
  );
};

export {
  Sidebar,
  SidebarHeader,
  SidebarContentHeader,
  SidebarContentBody,
  SidebarScroll,
  SidebarBackButton,
};
