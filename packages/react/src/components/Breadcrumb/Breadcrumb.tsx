import React from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

/**
 * The breadcrumb is a secondary navigation pattern that helps a user understand the hierarchy among levels and navigate back through them. */
interface BreadcrumbProps {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  className,
  ...other
}) => {
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
