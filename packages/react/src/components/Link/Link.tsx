import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

export interface LinkProps extends React.ComponentPropsWithRef<"a"> {
  /**
   * Provide the content for the link element
   */
  children?: React.ReactNode;
  /**
   * Adds an underline to the link element to better indicate that it is clickable in continuous text. @design
   */
  inline?: boolean;
  /**
   * Disables the link element. @design
   */
  disabled?: boolean;
  /**
   * Provide the href for the link element
   */
  href?: string;
  /**
   * Indicates that the link has been visited.
   */
  visited?: boolean;
  /**
   * Choose a size for the link element @design
   */
  size?: "sm" | "md" | "lg";
  /**
   * Use an icon with the link element @design
   */
  icon?: React.ReactNode | React.ComponentType | React.ElementType;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      children,
      className,
      href,
      disabled,
      inline,
      visited,
      icon,
      size,
      ...other
    } = props;

    const { prefix } = useSettings();

    const classes = classNames(`${prefix}--link`, className, {
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--inline`]: inline,
      [`${prefix}--link--visited`]: visited,
      [`${prefix}--link--${size}`]: size,
      [`${prefix}--link--icon`]: icon,
    });

    const rel = other.target === "_blank" ? "noopener" : undefined;
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        rel={rel}
        ref={ref}
        aria-disabled={disabled}
        {...other}
      >
        {children}
        {icon && React.isValidElement(icon) ? (
          <span className={`${prefix}--link__icon`}>{icon}</span>
        ) : icon ? (
          <props.icon />
        ) : null}
      </a>
    );
  }
);
/*
const Linkd = React.forwardRef<HTMLButtonElement, LinkProps>((props, ref) => {
  const {
    children,
    className,
    href,
    disabled,
    inline,
    visited,
    icon: Icon,
    size,
    ...other
  } = props;

  const { prefix } = useSettings();

  const classes = classNames(`${prefix}--link`, className, {
    [`${prefix}--link--disabled`]: disabled,
    [`${prefix}--link--inline`]: inline,
    [`${prefix}--link--visited`]: visited,
    [`${prefix}--link--${size}`]: size,
  });

  //const Tag = disabled ? 'p' : 'a';
  //const TagEl = Tag as 'button' | 'link';

  const rel = other.target === '_blank' ? 'noopener' : undefined;
  return (
    <a
      href={disabled ? undefined : href}
      className={classes}
      rel={rel}
      ref={ref}
      //{...other}
    >
      {children}
      {!inline && Icon && (
        <div className={`${prefix}--link__icon`}>
          <Icon />
        </div>
      )}
    </a>
  );
});*/

Link.displayName = "Link";

export default Link;
