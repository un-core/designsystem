import React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

/** A toggle is used to quickly switch between two possible states. They are commonly used for “on/off” switches */
type ToggleProps = PropsWithChildren<{
  defaultToggled?: boolean;
  toggled?: boolean;
  labelA: string;
  labelB: string;
  onToggle?: (
    value: boolean,
    htmlFor: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  className?: string;
  id?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;

const Toggle: React.FC<ToggleProps> = ({
  className,
  defaultToggled,
  toggled,
  onChange,
  onToggle,
  id,
  name,
  labelA,
  labelB,
  ...other
}) => {
  const { prefix } = useSettings();
  let input;
  const wrapperClasses = classNames(className, {
    [`${prefix}--form-item`]: true,
  });

  // const checkedProps = {};

  // if (typeof toggled !== 'undefined') {
  //   checkedProps.checked = toggled;
  // } else {
  //   checkedProps.defaultChecked = defaultToggled;
  // }

  const htmlFor = id ? id : name;

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        checked={toggled}
        defaultChecked={defaultToggled}
        type="checkbox"
        id={htmlFor}
        className={`${prefix}--toggle`}
        onChange={(evt) => {
          onChange && onChange(evt);
          onToggle && onToggle(input.checked, htmlFor, evt);
        }}
        ref={(el) => {
          input = el;
        }}
      />

      <label className={`${prefix}--toggle__label`} htmlFor={htmlFor}>
        <span className={`${prefix}--toggle__text--left`}>{labelA}</span>
        <span className={`${prefix}--toggle__appearance`} />
        <span className={`${prefix}--toggle__text--right`}>{labelB}</span>
      </label>
    </div>
  );
};

export default Toggle;
