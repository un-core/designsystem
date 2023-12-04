import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { usePopperTooltip } from "react-popper-tooltip";
import { Placement } from "../../utils";

import useSettings from "../../hooks/useSettings";

export interface TooltipProps {
  /**
   * React nodes that trigger the tooltip on interaction.
   */
  children: React.ReactNode;

  /**
   * Content of the tooltip. Can be a React node or a function returning a React node.
   * The function receives an object with functions to set visibility and handle visibility change.
   */
  content?:
    | React.ReactNode
    | ((options: {
        setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
        visibilityChange: (state: boolean) => void;
      }) => React.ReactNode);

  /**
   * @deprecated If true, applies a dark theme to the tooltip.
   */
  dark?: boolean;

  /**
   * If true, removes padding from the tooltip.
   */
  noPadding?: boolean;

  /**
   * Position of the tooltip relative to the child element. Uses the Placement type from utils.
   */
  placement?: Placement;

  /**
   * Trigger action for the tooltip - can be "hover" or "click".
   */
  trigger?: "hover" | "click";

  /**
   * Popper.js modifiers for advanced tooltip positioning.
   */
  modifiers?: [];

  /**
   * If true, renders the tooltip in a React portal.
   */
  usePortal?: boolean;

  /**
   * If true, wraps the child element with a span to attach a ref for the tooltip.
   */
  createRefWrapper?: boolean;

  /**
   * If true, the tooltip is interactive (hoverable/clickable).
   */
  interactive?: boolean;

  /**
   * Delay in milliseconds before hiding the tooltip.
   */
  delayHide?: number;

  /**
   * Additional custom class names for styling the tooltip.
   */
  className?: string;

  /**
   * If true, closes the tooltip when clicking outside of it.
   */
  closeOnOutsideClick?: boolean;

  /**
   * Close the tooltip when the trigger element is hidden.
   */
  closeOnTriggerHidden?: boolean;

  /**
   * If the tooltip should be visible by default.
   */
  defaultVisible?: boolean;

  /**
   * Delay in milliseconds before showing the tooltip.
   */
  delayShow?: number;

  /**
   * If true, the tooltip follows the cursor.
   */
  followCursor?: boolean;

  /**
   * Options for observing DOM changes through a MutationObserver.
   */
  mutationObserverOptions?: MutationObserverInit | null;

  /**
   * Offset of the tooltip from the trigger element, specified as a tuple [x, y].
   */
  offset?: [number, number];

  /**
   * Callback function when the visibility state of the tooltip changes.
   */
  onVisibleChange?: (state: boolean) => void;
}

export const tooltipStyle = {
  duration: 100,
  animation: "fade",
  theme: "light",
  arrow: true,
};

export const tooltipStyleDark = {
  duration: 100,
  animation: "fade",
  theme: "dark",
  arrow: true,
};

/** Tooltips display additional information upon click, hover, or focus. The information should be contextual, useful, and nonessential. */
const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  className,
  dark,
  noPadding,
  children,
  content,
  trigger = "hover",
  // modifiers = [],
  placement = "top",
  createRefWrapper,
  closeOnOutsideClick,
  closeOnTriggerHidden,
  defaultVisible,
  delayHide,
  delayShow,
  followCursor,
  interactive,
  mutationObserverOptions,
  offset,
  onVisibleChange,
  usePortal,
  // ...others
}) => {
  const { prefix } = useSettings();
  const [visibility, setVisibility] = React.useState(false);
  const classes = classNames(className, {
    [`${prefix}--tooltip`]: true,
    [`${prefix}--tooltip--disable-padding`]: noPadding,
    [`${prefix}--tooltip--visible`]: visibility,
    [`${prefix}--tooltip--${trigger}`]: trigger,
    [`${prefix}--tooltip--dark`]: dark,
  });

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    closeOnOutsideClick,
    closeOnTriggerHidden,
    defaultVisible,
    delayHide,
    delayShow,
    followCursor,
    interactive,
    mutationObserverOptions,
    offset,
    onVisibleChange,
    placement,
    trigger,
  });

  const elementClassNames = classNames(
    /*children?.props?.className, */ {
      [`${prefix}--tooltip--trigger`]: true,
    }
  );

  const wrapperClassNames = classNames(className, {
    [`${prefix}--tooltip--trigger`]: true,
  });

  const triggerElement =
    !createRefWrapper && typeof children !== "string" ? (
      React.cloneElement(children as React.ReactElement<any>, {
        ref: setTriggerRef,
        className: elementClassNames,
      })
    ) : (
      <span ref={setTriggerRef} className={wrapperClassNames}>
        {children}
      </span>
    );

  const visibilityChange = (e) => {
    setVisibility(e);
    if (onVisibleChange) onVisibleChange(e);
  };

  const tooltip = (
    <div ref={setTooltipRef} {...getTooltipProps({ className: classes })}>
      {typeof content === "function"
        ? content({ setVisibility, visibilityChange })
        : content}
      <div {...getArrowProps({ className: `${prefix}--tooltip__arrow` })} />
    </div>
  );

  return (
    <>
      {triggerElement}
      {visible && usePortal && <TooltipPortal>{tooltip}</TooltipPortal>}
      {visible && !usePortal && tooltip}
    </>
  );
};

export default Tooltip;

function TooltipPortal({ children }) {
  return ReactDOM.createPortal(children, document.body);
}
