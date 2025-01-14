import * as React from "react";
import classNames from "classnames";
import { ChevronRight } from "@wfp/icons-react";
import useSettings from "../../hooks/useSettings";
import { IIcon } from "../../utils";

interface ItemProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /**
   * Provide the title for the item contet
   */
  title?: React.ReactNode;
  /**
   * Provide the description for the item content
   */
  children?: React.ReactNode;
  /**
   * Provide the icon for the item content
   */
  icon?: React.ReactNode | IIcon;
  // button?: React.ReactNode;
  /**
   * Provide a kind to use different appearances.
   */
  kind?: "undefined" | "horizontal" | "large";
  /**
   * Provide a wrap to use different borders.
   */
  wrapper?: "undefined" | "sidebar" | "repeater";
  showAdditionalIcon?: boolean;
  subContent?: React.ReactNode;
  hint?: React.ReactNode;
  //className?: string;
  active?: boolean;
  additional?: React.ReactNode;
  image?: React.ReactNode;
  noImage?: boolean;
  unread?: boolean;
}
/** The item component to show entries inside a list, like a sidebar or an overview page. */
const Item: React.FC<ItemProps> = React.forwardRef(
  (
    {
      active,
      additional,
      children,
      className,
      subContent,
      image,
      hint,
      noImage,
      unread,
      showAdditionalIcon,
      title,
      kind = "large",
      wrapper = "none",
      ...other
    },
    ref
  ) =>
    //TODO:  ref
    {
      const { prefix } = useSettings();

      const classes = classNames(
        {
          [`${prefix}--item`]: true,
          [`${prefix}--item--${kind}`]: kind,
          [`${prefix}--item--${wrapper}`]: wrapper,
          [`${prefix}--item--active`]: active,
          [`${prefix}--item--unread`]: unread,
        },
        className
      );
      return (
        <div className={classes} {...other} ref={ref}>
          {image ? (
            <div className={`${prefix}--item__image`}>{image}</div>
          ) : noImage ? (
            <div
              className={`${prefix}--item__image ${prefix}--item__image-empty`}
            ></div>
          ) : null}

          {title && (
            <div className={`${prefix}--item__title-wrapper`}>
              <h2 className={`${prefix}--item__title`}>{title}</h2>
            </div>
          )}
          {additional && (
            <div className={`${prefix}--item__additional`}>
              {additional}
              {showAdditionalIcon && (
                <ChevronRight className={`${prefix}--item__additional-icon`} />
              )}
            </div>
          )}
          {children && (
            <div className={`${prefix}--item__text`}>{children}</div>
          )}
          {subContent && (
            <div className={`${prefix}--item__sub-content`}>{subContent}</div>
          )}
          {hint && <div className={`${prefix}--item__hint`}>{hint}</div>}
          {unread && <div className={`${prefix}--item__unread`} />}
        </div>
      );
    }
);

export default Item;
