import * as React from 'react';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'onChange'> {
  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText?: React.ReactNode;
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
  /**
   * The CSS class name to be placed on the wrapping element
   */
  wrapperClassName?: string;
  /**
   *
   * @param event | The event triggering the change
   * @param checked | The new value of the checkbox
   * @param customId | The id of the checkbox
   */
  onChange?(
    event: React.ChangeEvent<HTMLInputElement>,
    checked?: boolean,
    customId?: string
  ): void;
}

const Checkbox: React.FC<PropsWithChildren<CheckboxProps>> = React.forwardRef(
  function Checkbox(
    {
      className,
      id,
      labelText,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange = () => {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      indeterminate,
      hideLabel,
      wrapperClassName,
      title = '',
      ...other
    },
    ref
  ) {
    const { prefix } = useSettings();
    const labelClasses = classNames(`${prefix}--checkbox-label`, className);
    const innerLabelClasses = classNames(`${prefix}--checkbox-label-text`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    const wrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--checkbox-wrapper`,
      wrapperClassName
    );

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          onChange={(evt) => {
            onChange(evt, evt.target.checked, id);
          }}
          className={`${prefix}--checkbox`}
          id={id || other.name}
          ref={
            ref /*(el) => {
            if (el) {
              if (indeterminate) {
                el.indeterminate = indeterminate;
              }
            }
            if (typeof ref === 'function') {
              ref(el);
            } else if (Object(ref) === ref) {
              ref.current = el;
            }
          }*/
          }
        />
        <label
          htmlFor={id || other.name}
          className={labelClasses}
          title={title || undefined}>
          <span className={innerLabelClasses}>{labelText}</span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
