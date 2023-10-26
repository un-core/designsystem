import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationLinkProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationLink
   */
  children?: React.ReactNode;
}

export const SubNavigationLink = ({
  children,
  className,
  ...other
}: SubNavigationLinkProps) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--sub-navigation__link`, className);

  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};
