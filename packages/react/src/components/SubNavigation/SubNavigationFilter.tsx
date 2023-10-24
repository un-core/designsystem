import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationFilterProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationFilter
   */
  children?: React.ReactNode;
}

export const SubNavigationFilter = ({
  children,
  className,
  ...other
}: SubNavigationFilterProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__filter`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
