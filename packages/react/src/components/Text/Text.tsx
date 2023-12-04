import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
import { Spacing, TextKind } from "../../utils";

interface TextProps extends React.AllHTMLAttributes<HTMLDivElement> {
  /**
   * Specifies the kind of text to be displayed. This could be an enumeration that defines various text styles or types.
   */
  kind?: TextKind;

  /**
   * The content of the Text component, typically a string or nested React elements.
   */
  children?: React.ReactNode;

  /**
   * Spacing to be applied above the Text component. 'Spacing' could be a type that represents predefined spacing values.
   */
  spacingTop?: Spacing;

  /**
   * Spacing to be applied below the Text component. Similar to spacingTop, it uses the Spacing type for predefined values.
   */
  spacingBottom?: Spacing;

  /**
   * Additional custom class name(s) that can be applied to the Text component for styling purposes.
   */
  className?: string;
}

export const textLookup: Record<TextKind, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  title: "h1",
  subtitle: "h3",
  p: "p",
  caption: "div",
  code: "code",
  i: "i",
  bold: "b",
  strong: "strong",
  a: "a",
  "inline-highlight": "code",
};

/**
 *Text is a component for displaying paragraphs. You can use Text to standardize text across your web app. For longer sections or full articles use the <Story /> component instead.
 */

const Text: React.FC<TextProps> = ({
  children,
  className,
  kind,
  spacingTop,
  spacingBottom,
}) => {
  const { prefix } = useSettings();
  const TagName: keyof JSX.IntrinsicElements =
    kind && textLookup[kind] ? textLookup[kind] : "div";
  const classes = classNames(
    {
      [`${prefix}--text`]: true,
      // [`${prefix}--story__${kind}`]: kind,
      [`${prefix}--text__${kind}`]: kind,
      [`${prefix}--text__spacing-top-${spacingTop}`]: spacingTop,
      [`${prefix}--text__spacing-bottom-${spacingBottom}`]: spacingBottom,
    },
    className
  );
  return React.createElement(TagName, { className: classes }, children);
};

Text.displayName = "Text";

export default Text;
