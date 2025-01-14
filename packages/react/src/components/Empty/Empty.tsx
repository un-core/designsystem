import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
// import { IIcon } from '../../utils';

interface EmptyProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /**
   * The content to be rendered in the empty state. @design
   */
  children?: React.ReactNode;
  /**
   * The title to be rendered in the empty state.
   */
  title?: React.ReactNode;
  /**
   * The kind of empty state to be rendered. @design
   */
  kind?: "undefined" | "large";
  /**
   * The icon to be rendered in the empty state. @design
   */
  icon?: React.ReactNode;
  /**
   * The button to be rendered in the empty state. @design
   */
  button?: React.ReactNode;
  /**
   * The CSS class name to be appended to the top-level node.
   */
  className?: string;
  /**
   * The replaceable components to be used for the empty state.
   */
  components?: { Icon: React.ReactNode; Text: React.ReactNode };
}

const Icon = ({ icon }: EmptyProps) => {
  const { prefix } = useSettings();
  if (!icon) return null;
  return <div className={`${prefix}--empty__icon`}>{icon}</div>;
};

const Text = ({ title, children }: EmptyProps) => {
  const { prefix } = useSettings();
  return (
    <div className={`${prefix}--empty__text`}>
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

/** The Empty component can be used whenever a section should indicate that there is no content available. This can be the case for a empty list table or search results. */
const Empty = ({
  button,
  children,
  className,
  components,
  icon,
  title,
  kind = "large",
  ...other
}: EmptyProps) => {
  const { prefix } = useSettings();

  const classes = classNames(
    {
      [`${prefix}--empty`]: true,
      [`${prefix}--empty--${kind}`]: kind,
    },
    className
  );

  const defaultComponents = { Icon, Text };

  const allComponents = {
    ...defaultComponents,
    ...components,
  };

  const IconComponent = allComponents.Icon as React.FC<EmptyProps>;
  const TextComponent = allComponents.Text as React.FC<EmptyProps>;

  return (
    <div className={classes} {...other}>
      <IconComponent icon={icon} />
      <TextComponent title={title} children={children} />
      <div className={`${prefix}--empty__button`}>{button}</div>
    </div>
  );
};

Empty.displayName = "Empty";

export default Empty;
