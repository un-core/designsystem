import * as React from "react";
import classNames from "classnames";

interface ModuleHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional CSS class to apply to the header. This allows for additional
   * styling to be applied on top of the default styles. @style
   */
  className?: string;
  /**
   * Optional filter element to be included in the header. This can be used
   * to incorporate interactive elements like dropdowns, search inputs, etc.,
   * providing additional functionality to the header component. @functionality
   */
  filter?: React.ReactNode;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  filter,
  children,
  className,
  ...other
}) => {
  const wrapperClasses = classNames("wfp--module__header", className);

  return (
    <div className={wrapperClasses} {...other}>
      <h1 className="wfp--module__title">{children}</h1>
      {filter && <div className="wfp--module__filter">{filter}</div>}
    </div>
  );
};

export default ModuleHeader;
