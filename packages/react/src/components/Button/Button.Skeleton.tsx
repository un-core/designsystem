import * as React from "react";
import classNames from "classnames";

interface ButtonSkeletonProps {
  small?: boolean;
  href?: string;
}

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  small = false,
  href,
}) => {
  const buttonClasses = classNames({
    "wfp--skeleton": true,
    "wfp--btn": true,
    "wfp--btn--sm": small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...commonProps} type="button" />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

export default ButtonSkeleton;
