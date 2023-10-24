import React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

/**
 * The breadcrumb is a secondary navigation pattern that helps a user understand the hierarchy among levels and navigate back through them. */
interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children?: React.ReactNode;
}

const Breadcrumb = ({ children, className, ...other }: BreadcrumbProps) => {
  const { prefix } = useSettings();
  const classes = classNames(className, {
    [`${prefix}--breadcrumb`]: true,
    [`${prefix}--breadcrumb--no-trailing-slash`]: true,
  });
  return (
    <div className={classes} {...other}>
      {children}
    </div>
  );
};

export default Breadcrumb;
