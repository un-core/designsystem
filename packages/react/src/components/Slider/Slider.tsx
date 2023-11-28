/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
import Input, { InputProps, useInput } from "../Input";
import TextInput from "../TextInput";
import { UseInputProps } from "../Input/useInput";

/** Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value. */
interface SliderProps extends InputProps, React.ComponentPropsWithRef<"input"> {
  /**
   * Specify an optional className to be applied to the form-item node
   */
  formItemClassName?: string;
  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;
  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;
  /**
   * The minimum value.
   */
  min: number;
  /**
   * The label associated with the minimum value.
   */
  minLabel?: string;
  /**
   * The maximum value.
   */
  max: number;
  /**
   * The label associated with the maximum value.
   */
  maxLabel?: string;
  /**
   * The callback to format the label associated with the minimum/maximum value.
   */
  formatLabel?: () => void;
  /**
   * The `name` attribute of the `<input>`.
   */

  name?: string;
  /**
   * The `type` attribute of the `<input>`.
   */
  inputType?: string;
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput?: string;
  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse.
   */
  step?: number;
  /**
   * Specify the value of the input, if undefined or null the value is empty
   */
  value?: number | "";
  /**
   * `true` to hide the number input box.
   */
  hideTextInput?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Use the width of the parent element
   */
  fullWidth?: boolean;
  /**
   * `true` to hide the controls on slider.
   */
  hideControls?: boolean;
}

const defaultFormatLabel = (value, label) => {
  return typeof label === "function"
    ? label(value)
    : `${value}${label ? label : ""}`;
};

const Slider: React.FC<SliderProps> = React.forwardRef((props, ref) => {
  const {
    ariaLabelInput,
    className,
    disabled,
    formatLabel = defaultFormatLabel,
    fullWidth,
    id,
    inputType,
    hideLabel,
    hideControls,
    hideTextInput,
    min,
    minLabel,
    max,
    maxLabel,
    step = 1,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    //onClick = () => {},
    helperText,
    ...other
  } = props;

  const { prefix } = useSettings();

  const initialValue = props.value;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const newInputRef = React.useRef(null);
  const _inputRef = ref ? ref : newInputRef;

  const handleChange = (evt) => {
    if (!disabled) {
      evt.persist();
      evt.imaginaryTarget = _inputRef;
      if (evt.target.value > max) {
        setValue(max);
        onChange(/*max, */ evt);
      } /* else if (evt.target.value < min) {
        setValue(evt.target.value);
        onChange(parseFloat(min), evt);
      }*/ else {
        setValue(evt.target.value);
        onChange(/*parseFloat(evt.target.value), */ evt);
      }
    }
  };

  const numberInputClasses = classNames(
    `${prefix}--slider--wrapper`,
    className,
    {
      [`${prefix}--slider--helpertext`]: helperText,
      [`${prefix}--slider--nolabel`]: hideLabel,
      [`${prefix}--slider--nocontrols`]: hideControls,
    }
  );

  const sliderContainerClasses = classNames(`${prefix}--slider-container`, {
    [`${prefix}--slider-container--full-width`]: fullWidth,
  });

  const newProps = {
    disabled,
    id,
    max,
    min,
    step,
    onChange: handleChange,
    value: value,
  };

  const inputClasses = classNames(
    `${prefix}--input`,
    `${prefix}--slider-text-input`
  );

  const sliderClasses = classNames(
    `${prefix}--slider`,
    { [`${prefix}--slider--disabled`]: disabled },
    className
  );

  const sliderRangeWrapperClasses = classNames(
    `${prefix}--slider__range-wrapper`,
    { [`${prefix}--slider__range-wrapper--disabled`]: disabled },
    className
  );

  const valueMinimal = value && value < min ? min : value;

  const useInputProps = props as UseInputProps;
  const input = useInput(useInputProps);

  return (
    <Input {...input.wrapperProps} formItemClassName={numberInputClasses}>
      <div className={sliderContainerClasses}>
        <span className={`${prefix}--slider__range-label`}>
          {formatLabel(min, minLabel)}
        </span>

        <div className={sliderRangeWrapperClasses}>
          <div
            className={`${prefix}--slider__range-before`}
            style={{
              width: `${((valueMinimal || 0 - min) / (max - min)) * 100}%`,
            }}
          />
          <input
            className={sliderClasses}
            type="range"
            {...other}
            {...newProps}
            ref={_inputRef}
          />
        </div>
        <span className={`${prefix}--slider__range-label`}>
          {formatLabel(max, maxLabel)}
        </span>
        {!hideTextInput && (
          <TextInput
            disabled={disabled}
            type={inputType}
            id="input-for-slider"
            className={inputClasses}
            value={value}
            onChange={handleChange}
            aria-label={ariaLabelInput}
          />
        )}
      </div>
    </Input>
  );
});

Slider.displayName = "Slider";

export default Slider;
