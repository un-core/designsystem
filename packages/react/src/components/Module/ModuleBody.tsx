import * as React from "react";
import classNames from "classnames";

interface ModuleBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional CSS class to apply to the body of the module. This allows for additional
   * styling to be applied on top of the default styles. @style
   */
  className?: string;
  /**
   * Specify whether the content within the ModuleBody should be centered. This can be
   * used to align content such as text or images in the center of the component for
   * visual appeal. @layout
   */
  centered?: boolean;
  /**
   * Specify whether the ModuleBody should have no padding. This can be useful for
   * scenarios where edge-to-edge content display is needed within the module. @layout
   */
  noPadding?: boolean;
}

const ModuleBody: React.FC<ModuleBodyProps> = ({
  children,
  className,
  centered,
  noPadding,
  ...other
}) => {
  const wrapperClasses = classNames("wfp--module__content", className, {
    "wfp--module__content--centered": centered,
    "wfp--module__content--no-padding": noPadding,
  });

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

export default ModuleBody;
