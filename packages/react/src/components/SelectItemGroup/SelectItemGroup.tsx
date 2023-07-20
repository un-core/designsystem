import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

interface SelectItemGroupProps extends HTMLAttributes<HTMLOptGroupElement> {
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

const SelectItemGroup: React.FC<SelectItemGroupProps> = ({
  children,
  className,
  disabled,
  label,
  ...other
}) => {
  const { prefix } = useSettings();
  const classes = classNames(`${prefix}--select-optgroup`, className);
  return (
    <optgroup className={classes} label={label} disabled={disabled} {...other}>
      {children}
    </optgroup>
  );
};

// SelectItemGroup.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
//   disabled: PropTypes.bool,
//   label: PropTypes.string.isRequired,
// };

// SelectItemGroup.defaultProps = {
//   disabled: false,
//   label: 'Provide label',
// };

export default SelectItemGroup;
