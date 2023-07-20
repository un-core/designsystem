import * as React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

type AuthLayoutProps = PropsWithChildren<{
  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className?: string;
  /**
   * The image is set as background on the left section when provided
   */
  image?: React.ReactNode;
  /**
   * This usually consist of `<BackgroundContent/>` if you wish to provide content and background color instead of an image
   */
  backgroundContent?: React.ReactNode;
}>;

const AuthLayout: React.FC<AuthLayoutProps> = ({
  image,
  backgroundContent,
  children,
  className,
  ...other
}) => {
  const { prefix } = useSettings();
  const style = image
    ? {
        backgroundImage: `url(${image})`,
      }
    : {};

  const wrapperClasses = classNames(`${prefix}--auth-background-wrapper`, {
    [`${prefix}--auth-background-image`]: image,
    [`${className}`]: className,
  });

  return (
    <div className={`${prefix}--auth-wrapper`} {...other}>
      <div className={wrapperClasses} style={style}>
        {backgroundContent}
      </div>
      <div className={`${prefix}--auth-content-wrapper`}>{children}</div>
    </div>
  );
};

type BackgroundContentProps = React.ComponentPropsWithRef<'div'>;

const BackgroundContent: React.FC<BackgroundContentProps> = ({
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  return (
    <div {...other} className={`${prefix}--auth-background-content`}>
      {children}
    </div>
  );
};

export { BackgroundContent, AuthLayout };
