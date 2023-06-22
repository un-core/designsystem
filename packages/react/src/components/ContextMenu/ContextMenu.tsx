import * as React from 'react';
import Tooltip from '../Tooltip';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

/** Context menu are used as navigational elements. They should contain commands that apply to the target object. */
type ContextMenuProps = PropsWithChildren<{
  /**
   * Provide content to display when contextMenu is clicked
   */
  content?: React.ReactNode;
  /**
   * Provide a href prop as an alternative to onClick
   */
  href?: string;
  /**
   * Inline links are used within a sentence or paragraph and are styled with an underline. They should not be paired with an icon.
   */
  inline?: boolean;
  /**
   * Provide a custom className
   */
  className?: string;
}>;

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  className,
  content,
  /* href,
  inline,
  trigger = 'click',
  ...other*/
}) => {
  const { prefix } = useSettings();
  const classes = classNames(
    {
      [`${prefix}--context-menu`]: true,
    },
    className
  );

  return (
    <Tooltip className={classes} content={content} noPadding trigger="click">
      {children}
    </Tooltip>
  );
};

type ContextMenuGroupProps = PropsWithChildren<{
  className?: string;
}>;

const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({
  className,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(
    {
      [`${prefix}--context-menu__group`]: true,
    },
    className
  );

  return <div className={classes} {...other} />;
};

interface ContextMenuItemProps extends React.ComponentPropsWithRef<'div'> {
  className?: string;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  className,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(
    {
      [`${prefix}--context-menu__item`]: true,
    },
    className
  );

  return <div className={classes} {...other} />;
};

export { ContextMenu, ContextMenuItem, ContextMenuGroup };
