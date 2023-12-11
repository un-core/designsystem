import * as React from "react";
import classNames from "classnames";
import { Cross, Check } from "@wfp/icons-react";

//export interface ListItemProps
// extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
export interface ListItemProps
  extends Omit<React.ComponentPropsWithRef<"li">, "title"> {
  /**
   * Specify the kind of icon to use in the list item. Options are 'checkmark' or 'cross'.
   * This provides a visual cue about the nature or status of the list item. @design
   */
  kind?: "checkmark" | "cross";
  /**
   * Specify whether the list item should be a small variant. Useful for denser lists
   * or when space is a constraint. @size
   */
  small?: boolean;
  /**
   * Content to be displayed as the title of the list item. This can be simple text or
   * a React node for more complex content. @content
   */
  title?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  title,
  kind,
  ...other
}) => {
  const classes = classNames("wfp--list__element", className, {
    "wfp--list-item--checkmark": kind === "checkmark",
    "wfp--list-item--cross": kind === "cross",
  });
  return (
    <li className={classes} {...other}>
      {kind === "cross" && <Cross className="wfp--list-item__icon" />}
      {kind === "checkmark" && <Check className="wfp--list-item__icon" />}
      {title && <span className="wfp--list__element__title">{title}</span>}
      <span className="wfp--list__element__content">{children}</span>
    </li>
  );
};

export default ListItem;
