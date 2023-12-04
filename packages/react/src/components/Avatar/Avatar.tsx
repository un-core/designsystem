import * as React from "react";
import { User as UserIcon } from "@wfp/icons-react";
import useSettings from "../../hooks/useSettings";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Provide the alt text for the image.
   */
  alt?: string;
  /**
   * Specify the type of Tag @design
   */
  missingImage?: "avatar" | "letter";
  /**
   * Url to an avatar image The size of the image is 25px * 25px.
   * Provide at least 50px * 50px to support HiDPI displays.
   */
  image?: string;
  /**
   * The username which will be displayed in the avatar.
   */
  name?: string;
  /**
   * Additional props for the UserIcon component
   */
  userIconProps?: React.ComponentProps<typeof UserIcon>;
}

/**
 * Avatar is used to display a user image or icon.
 */

function Avatar({
  alt,
  image,
  missingImage,
  name,
  userIconProps,
  ...other
}: AvatarProps) {
  const { prefix } = useSettings();

  if (!image && missingImage === "avatar") {
    return (
      <UserIcon
        fill="#ffffff"
        width="14"
        height="14"
        description={alt}
        className={`${prefix}--user__icon ${prefix}--user__icon--empty`}
        {...userIconProps}
      />
    );
  } else if (image === undefined && missingImage === "letter") {
    return (
      <svg
        id="Layer_1"
        className={`${prefix}--user__icon ${prefix}--user__icon--empty ${prefix}--user__icon--letter`}
        x="0px"
        y="0px"
        viewBox="0 0 25 25"
        height="25px"
        width="25px"
      >
        <text x="50%" y="57%" dominantBaseline="middle" textAnchor="middle">
          {name && name.toUpperCase()[0]}
        </text>
      </svg>
    );
  } else {
    return (
      <div className={`${prefix}--user__icon`} {...other}>
        <img alt={alt} src={image} />
      </div>
    );
  }
  return null;
}

Avatar.displayName = "Avatar";

export default Avatar;
