import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

export interface SelectItemProps extends HTMLAttributes<HTMLOptionElement> {
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

const SelectItem: React.FC<SelectItemProps> = ({
  className,
  value,
  disabled,
  hidden,
  text,
  ...other
}) => {
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
      hidden={hidden}>
      {text}
    </option>
  );
};

SelectItem.displayName = 'SelectItem';

export default SelectItem;
