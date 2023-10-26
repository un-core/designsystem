import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationContent
   */
  children?: React.ReactNode;
}

export const SubNavigationContent = ({
  children,
  className,
  ...other
}: SubNavigationContentProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__content`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
