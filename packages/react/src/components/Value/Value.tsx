import React from "react";
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

/** Value are typically used to show KPI values and additional information. */
type ValueProps = PropsWithChildren<{
  value?: React.ReactNode;
  secondaryValue?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}>;

const Value: React.FC<ValueProps> = ({
  value,
  secondaryValue,
  className,
  title,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--value`, className);
  return (
    <div className={classes} {...other}>
      <h4 className={`${prefix}--value__title`}>{title}</h4>
      <div className={`${prefix}--value__primary-value`}>{value}</div>
      <div className={`${prefix}--value__secondary-value`}>
        {secondaryValue}
      </div>
    </div>
  );
};

export default Value;
