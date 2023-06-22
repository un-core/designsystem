import * as React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

type AnchorNavigationProps = PropsWithChildren<{
  /**
   * The `title` is represented in the header
   */
  title?: string;
  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className?: string;
}>;

const AnchorNavigation: React.FC<AnchorNavigationProps> = ({
  title,
  children,
  className,
  ...other
}) => {
  const { prefix } = useSettings();
  const wrapperClasses = classNames(`${prefix}--anchor-navigation`, className);
  return (
    <div className={wrapperClasses} {...other}>
      <div className={`${prefix}--anchor-header-title`}>{title}</div>
      <div className={`${prefix}--anchor-content`}>{children}</div>
    </div>
  );
};

export default AnchorNavigation;
