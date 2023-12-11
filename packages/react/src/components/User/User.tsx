import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
import Avatar from "../Avatar";

export interface UserProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The alt-text of the avatar
   */
  alt?: string;
  /**
   * Sets the max-width of the user name to 130px and shows an ellipsis
   */
  ellipsis?: boolean;
  /**
   * Additional description under the Name will also increase the size
   * of the Avatar use &lt;List kind="simple" small /&gt; as default content
   */
  description?: React.ReactNode;
  /**
   * Optional components to replace the default ones, the Icon component is used for the avatar
   */
  components?: { Icon: React.ReactNode };
  /**
   * Extended Description column
   */
  extendedDescription?: React.ReactNode;
  /**
   * Selects the generated empty icon if no image is provided.
   * Can be `avatar` or `letter`.
   */
  missingImage?: "avatar" | "letter";
  /**
   * Url to an avatar image The size of the image is 25px * 25px.
   * Provide at least 50px * 50px to support HiDPI displays.
   */
  image?: string;
  /**
   * Show the name next to the avatar
   */
  showName?: boolean;
  /**
   * The CSS class name for the user.
   */
  className?: string;
  /**
   * Shows a smaller version of the user
   */
  small?: boolean;
  /**
   * The username which will be displayed. Usually `Firstname Lastname`.
   */
  name?: string;
}
/** The User is used inside the MainNavigation and form, and can display an avatar and username. */
const User: React.FC<UserProps> = (props) => {
  const {
    className,
    children,
    components = {},
    description,
    ellipsis,
    extendedDescription,
    showName,
    small,
    name,
    missingImage,
    ...other
  } = props;
  const { prefix } = useSettings();

  const defaultComponents = { Avatar };

  const allComponents = {
    ...defaultComponents,
    ...components,
  };

  const classes = classNames(`${prefix}--user`, className, {
    [`${prefix}--user--has-description`]: description,
    [`${prefix}--user--has-extended-description`]: extendedDescription,
  });

  const titleClasses = classNames({
    [`${prefix}--user__title`]: true,
    [`${prefix}--user__title--ellipsis`]: ellipsis,
    [`${prefix}--user__title--small`]: small,
  });

  return (
    <div className={classes} {...other}>
      <allComponents.Avatar {...props} missingImage={missingImage} />
      {showName && (
        <span className={titleClasses}>
          <span>{name}</span>
          {description && (
            <div className={`${prefix}--user__description`}>{description}</div>
          )}
        </span>
      )}
      {children}
      {extendedDescription && (
        <div className={`${prefix}--user__extended-description`}>
          {extendedDescription}
        </div>
      )}
    </div>
  );
};

export default User;
