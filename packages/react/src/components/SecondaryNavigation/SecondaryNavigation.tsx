import * as React from "react";
import classNames from "classnames";
import Wrapper from "../Wrapper";
import useSettings from "../../hooks/useSettings";

/** The SecondaryNavigation shows the page title and and optional tab navigation. */
export interface SecondaryNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  /**
   * Specify the max-width on desktop devices (same as \`Wrapper\` component)
   */
  pageWidth?: "sm" | "md" | "lg" | "full";
  /**
   * The CSS class name to be placed on the wrapping element
   */
  wrapperClassName?: string;
  id?: string;
  additional?: React.ReactNode;
}

export function SecondaryNavigation({
  additional,
  children,
  className,
  id,
  pageWidth,
  ...other
}: SecondaryNavigationProps) {
  const { prefix } = useSettings();

  const wrapperClasses = classNames(
    `${prefix}--secondary-navigation`,
    className
  );

  return (
    <div id={id} className={wrapperClasses} {...other}>
      <Wrapper
        pageWidth={pageWidth}
        className={`${prefix}--secondary-navigation__wrapper`}
      >
        <div className={`${prefix}--secondary-navigation__list`}>
          {children}
        </div>
        {additional && (
          <div className={`${prefix}--secondary-navigation__additional`}>
            {additional}
          </div>
        )}
      </Wrapper>
    </div>
  );
}

SecondaryNavigation.displayName = "SecondaryNavigation";
