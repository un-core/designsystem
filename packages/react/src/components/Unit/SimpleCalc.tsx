import * as React from "react";
import SvgUnit from "./SvgUnit";
import StringUnit from "./StringUnit";

// TODO: Add interface interface SimpleCalcProps

type SimpleCalcProps = {
  calcOnly?: boolean;
  children?: any;
  string?: boolean;
  svg?: boolean;
  hideUnit?: boolean;
  className?: string;
  after?: string;
  before?: string;
};

const SimpleCalc = (
  props: SimpleCalcProps,
  after?: string,
  before?: string
) => {
  const { calcOnly, className, children, string, svg, hideUnit } = props;

  // Remove commas
  const value = children;

  const afterCalc = after ? after : "";

  const unit = hideUnit ? "" : before + children + afterCalc;

  const calcObject = {
    value: value,
    before: before,
    after: after,
    output: value + unit,
  };

  if (calcOnly) return calcObject;
  else if (svg)
    return SvgUnit(
      { value: value + unit, before: before, after: after },
      props
    );
  else if (string) return StringUnit(calcObject /*, props */);
  else if (value !== false) return <span className={className}>{value}</span>;
};

export default SimpleCalc;
