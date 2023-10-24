import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationHeaderProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationHeader
   */
  children?: React.ReactNode;
}

export const SubNavigationHeader = ({
  children,
  className,
  ...other
}: SubNavigationHeaderProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__header`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
