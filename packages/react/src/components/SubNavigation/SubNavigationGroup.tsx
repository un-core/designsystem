import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SubNavigationGroupProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Specify a the content of the SubNavigationGroup
   */
  children?: React.ReactNode;
  /**
   * Specify the number of columns
   */
  columns?: number;
  /**
   * The title of the SubNavigationGroup
   */
  title?: React.ReactNode;
}

export const SubNavigationGroup = ({
  children,
  columns,
  className,
  title,
  ...other
}: SubNavigationGroupProps) => {
  const { prefix } = useSettings();
  const classes = classNames(
    `${prefix}--sub-navigation__group`,
    {
      className,
    },
    { [`${prefix}--sub-navigation__group--columns`]: columns }
  );

  return (
    <div className={classes} {...other}>
      {title && (
        <h3 className={`${prefix}--sub-navigation__group__title`}>{title}</h3>
      )}
      <div>{children}</div>
    </div>
  );
};
