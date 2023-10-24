import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationItemProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationItem
   */
  children?: React.ReactNode;
}

export const SubNavigationItem = ({
  children,
  className,
  ...other
}: SubNavigationItemProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__item`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
