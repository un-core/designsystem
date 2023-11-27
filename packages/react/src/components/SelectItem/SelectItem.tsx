import React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";

interface SelectItemProps extends React.ComponentPropsWithRef<"option"> {
  /**
   * Specify the value of the <SelectItem>
   */
  value?: string | number;
  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;
  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden?: boolean;
  /**
   * Provide the contents of your <SelectItem>
   */
  text: string;
}

function SelectItem({
  className,
  value,
  disabled,
  hidden,
  text,
  ...other
}: SelectItemProps) {
  const { prefix } = useSettings();
  const selectItemClasses = classNames({
    [`${prefix}--select-option`]: true,
    [`${className}`]: className,
  });

  return (
    <option
      {...other}
      className={selectItemClasses}
      value={value}
      disabled={disabled}
      hidden={hidden}
    >
      {text}
    </option>
  );
}

SelectItem.displayName = "SelectItem";

export default SelectItem;
