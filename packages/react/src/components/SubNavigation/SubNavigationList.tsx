import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationListProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationList
   */
  children?: React.ReactNode;
}

export const SubNavigationList = ({
  children,
  className,
  ...other
}: SubNavigationListProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__list`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
