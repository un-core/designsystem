import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
import { ScreenSize } from "../../utils";

export const pageWidths = ["sm", "md", "lg", "full"];

/** Wrapper can wrap it's content in a specific width depending on if the application has a full or fixed width. */
export interface WrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Defines the width of the wrapper. Can be one of 'xs', 'sm', 'md', 'lg', 'full', 'narrow', 'narrower', or 'narrowest'. */
  pageWidth?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "full"
    | "narrow"
    | "narrower"
    | "narrowest";

  /** Specifies the page width for mobile devices. It uses the ScreenSize type. */
  mobilePageWidth?: ScreenSize;

  /** Determines the spacing around the wrapper. Can be 'md' for medium or 'xl' for extra large. */
  spacing?: "md" | "xl";

  /** Sets the background theme. Can be 'lighter' for a light background or 'dark' for a dark background. */
  background?: "lighter" | "dark";

  /** Additional CSS class names to be applied to the wrapper. */
  className?: string;

  /** CSS class names specifically for the background of the wrapper. */
  backgroundClassName?: string;

  /** Custom CSS properties for the background styling. */
  backgroundStyle?: React.CSSProperties;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { prefix } = useSettings();

  const {
    background,
    backgroundClassName,
    backgroundStyle,
    children,
    className,
    pageWidth,
    mobilePageWidth,
    spacing,
    ...other
  } = props;
  const wrapperClasses = classNames({
    [`${prefix}--wrapper`]: true,
    [`${prefix}--wrapper--width-lg`]: pageWidth === "narrow",
    [`${prefix}--wrapper--width-md`]: pageWidth === "narrower",
    [`${prefix}--wrapper--width-sm`]: pageWidth === "narrowest",
    [`${prefix}--wrapper--width-xs`]: pageWidth === "narrowest",
    [`${prefix}--wrapper--width-${pageWidth}`]: pageWidth,
    [`${prefix}--wrapper--width-mobile-full`]: mobilePageWidth === "full",
    [`${prefix}--wrapper--spacing-md`]: spacing === "md",
    [`${prefix}--wrapper--spacing-xl`]: spacing === "xl",
    [`${className}`]: className,
  });
  if (background || backgroundStyle) {
    const backgroundClasses = classNames(backgroundClassName, {
      [`${prefix}--wrapper--background-${background}`]: background,
    });

    return (
      <div className={backgroundClasses} style={backgroundStyle}>
        <div className={wrapperClasses} {...other}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className={wrapperClasses} {...other}>
        {children}
      </div>
    );
  }
};

export default Wrapper;
