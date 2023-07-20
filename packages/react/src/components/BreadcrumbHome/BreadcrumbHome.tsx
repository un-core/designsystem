import * as React from 'react';
import classNames from 'classnames';
import { Home } from '@un/icons-react';
import useSettings from '../../hooks/useSettings';

interface BreadcrumbHomeProps {
  /**
   * Specify an optional text for the `Home` Icon
   */
  hometext?: React.ReactNode;
  /**
   * Specify an optional className to be added to the `Home` Icon
   */
  className?: string;
}

const BreadcrumbHome: React.FC<BreadcrumbHomeProps> = ({
  className,
  hometext,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--breadcrumb-home`, className);
  return (
    <Home
      //icon={iconHome}
      fill="#0b77c2"
      width="14"
      height="14"
      description={hometext}
      className={classes}
      {...other}
    />
  );
};

export default BreadcrumbHome;
