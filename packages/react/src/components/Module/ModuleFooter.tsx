import * as React from "react";
import classNames from "classnames";

interface ModuleFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {
  /**
   * Optional CSS class to apply to the header. This allows for additional
   * styling to be applied on top of the default styles. @style
   */
  className?: string;
}

const ModuleFooter: React.FC<ModuleFooterProps> = ({
  children,
  className,
  ...other
}) => {
  const wrapperClasses = classNames("wfp--module__footer", className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

export default ModuleFooter;
