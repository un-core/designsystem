import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationTitleProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationTitle
   */
  children?: React.ReactNode;
}

export const SubNavigationTitle = ({
  children,
  className,
  ...other
}: SubNavigationTitleProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__title`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
