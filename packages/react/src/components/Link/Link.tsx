/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import useSettings from '../../hooks/useSettings';

interface LinkProps {
  href?: string;
  inline?: boolean;
  className?: string;
  disabled?: boolean;
  visited?: boolean;
  size?: 'sm' | 'md' | 'lg';
  renderIcon?: React.JSXElementConstructor<any>;
  target?: string;
  onClick?: () => void;
}

const Link = React.forwardRef<
  HTMLAnchorElement | HTMLParagraphElement,
  PropsWithChildren<LinkProps>
>(
  (
    {
      children,
      className,
      href,
      disabled,
      inline,
      visited,
      renderIcon: Icon,
      size,
      target,
      ...other
    },
    ref
  ) => {
    const { prefix } = useSettings();

    const classNames = classnames(`${prefix}--link`, className, {
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--inline`]: inline,
      [`${prefix}--link--visited`]: visited,
      [`${prefix}--link--${size}`]: size,
    });

    const Tag = disabled ? 'p' : 'a';
    const rel = target === '_blank' ? 'noopener' : undefined;
    return (
      <Tag
        href={disabled ? undefined : href}
        className={classNames}
        rel={rel}
        ref={ref}
        {...other}>
        {children}
        {!inline && Icon && (
          <div className={`${prefix}--link__icon`}>
            <Icon />
          </div>
        )}
      </Tag>
    );
  }
);

export default Link;
