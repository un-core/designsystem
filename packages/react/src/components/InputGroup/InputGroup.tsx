import React, { PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';
import RadioButton from '../RadioButton';
import warning from 'warning';
import useSettings from '../../hooks/useSettings';

/**
 * InputGroup allows you to organize and arange multiple input elements.
 */

interface InputGroupProps {
  children?: React.ReactNode;
  controlled?: boolean;
  defaultSelected?: string | number;
  valueSelected?: boolean;
  hideLabel?: boolean;
  helperText?: React.ReactNode;
  labelText?: React.ReactNode;
  disabled?: boolean;
  vertical?: boolean;
  className?: string;
  wrapperClassName?: string;
  name?: string;
  onChange?: (first?: any, name?: string, evt?: any) => void;
}

const InputGroup: React.FC<PropsWithChildren<InputGroupProps>> = (props) => {
  const { prefix } = useSettings();

  const {
    children,
    disabled,
    labelText,
    helperText,
    controlled,
    vertical,
    hideLabel,
    className = `${prefix}--input-group`,
    wrapperClassName,
    valueSelected,
    defaultSelected,
  } = props;

  const [prevValueSelected, setPrevValueSelected] = useState<any>(
    valueSelected || defaultSelected
  );
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    if (valueSelected !== prevValueSelected) {
      setPrevValueSelected(valueSelected);
      setSelected(valueSelected || defaultSelected);
    }
  }, [valueSelected, defaultSelected]);

  //   static getDerivedStateFromProps({ valueSelected, defaultSelected }, state) {
  //     const { prevValueSelected } = state;
  //     return prevValueSelected === valueSelected
  //       ? null
  //       : {
  //           selected: valueSelected || defaultSelected,
  //           prevValueSelected: valueSelected,
  //         };
  //   }

  const getRadioButtons = () => {
    const children = React.Children.map(props.children, (radioButton) => {
      if (!React.isValidElement(radioButton)) {
        return radioButton;
      }
      const { value, ...other } = radioButton.props;
      /* istanbul ignore if */
      if (radioButton.props.hasOwnProperty.call('checked')) {
        warning(
          false,
          `Instead of using the checked property on the RadioButton, set
            the defaultSelected property or valueSelected property on the InputGroup.`
        );
      }

      return (
        <RadioButton
          {...other}
          name={props.name}
          key={value}
          value={value}
          onChange={handleChange}
          checked={value === selected}
        />
      );
    });

    return children;
  };

  const handleChange = (newSelection, value, evt) => {
    if (newSelection !== selected) {
      setSelected(newSelection);
      props.onChange && props.onChange(newSelection, props.name, evt);
    }
  };
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const wrapperClasses = classNames(`${prefix}--form-item`, {
    [`${prefix}--input-group__vertical`]: vertical,
    wrapperClassName,
  });

  const label = labelText ? (
    <span className={labelClasses}>{labelText}</span>
  ) : null;

  const helper = helperText ? (
    <div className={`${prefix}--form__helper-text`}>{helperText}</div>
  ) : null;

  return (
    <div className={wrapperClasses}>
      <div className={className} data-disabled={disabled}>
        {label}
        {helper}
        <div className={`${prefix}--input-group-inside`}>
          {controlled ? getRadioButtons() : children}
        </div>
      </div>
    </div>
  );
};

// InputGroup.propTypes = {
//   /**
//    * Provide a collection of <RadioButton> components to render in the group
//    */
//   children: PropTypes.node,

//   /**
//    * Provide an optional className to be applied to the container node
//    */
//   className: PropTypes.string,

//   /**
//    * Specify the <RadioButton> to be selected by default
//    */
//   defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

//   /**
//    * Specify the name of the underlying `input` nodes
//    */
//   name: PropTypes.string,

//   /**
//    * Provide an optional `onChange` hook that is called whenever the value of
//    * the group changes
//    */
//   onChange: PropTypes.func,

//   /**
//    * Specify the value that is currently selected in the group
//    */
//   valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

//   /**
//    * Specify whether the elements should be displayed vertically.
//    */

//   vertical: PropTypes.bool,

//   /**
//    * Specify whether you want the underlying label to be visually hidden
//    */

//   hideLabel: PropTypes.bool,
//   /**
//    * Provide text that is used alongside the control label for additional help
//    */

//   helperText: PropTypes.node,

//   /**
//    * Provide the text that will be read by a screen reader when visiting this
//    * control
//    */
//   labelText: PropTypes.node,
// };

// InputGroup.defaultProps = {
//   onChange: /* istanbul ignore next */ () => {},
//   controlled: false,
// };

export default InputGroup;
