import React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SelectItemGroupProps extends React.ComponentPropsWithRef<"optgroup"> {
  /**
   * Provide the contents of your <SelectItemGroup>
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;
  /**
   * Specify whether the <SelectItemGroup> should be disabled
   */
  disabled?: boolean;
  /**
   * Specify the label to be displayed
   */
  label: string;
}

function SelectItemGroup({
  children,
  className,
  disabled,
  label,
  ...other
}: SelectItemGroupProps) {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--select-optgroup`, className);
  return (
    <optgroup className={classes} label={label} disabled={disabled} {...other}>
      {children}
    </optgroup>
  );
}

export default SelectItemGroup;
