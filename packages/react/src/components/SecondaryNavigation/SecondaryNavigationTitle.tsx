import * as React from "react";
import classNames from "classnames";

import useSettings from "../../hooks/useSettings";

export interface SecondaryNavigationTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SecondaryNavigationTitle({
  className,
  children,
}: SecondaryNavigationTitleProps) {
  const { prefix } = useSettings();

  const wrapperClasses = classNames(
    `${prefix}--secondary-navigation__title`,
    className
  );
  return <h1 className={wrapperClasses}>{children}</h1>;
}

SecondaryNavigationTitle.displayName = "SecondaryNavigationTitle";
