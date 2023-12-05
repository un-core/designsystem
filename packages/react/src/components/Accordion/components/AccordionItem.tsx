import * as React from "react";
import { TransitionState } from "react-transition-state";
import {
  ACCORDION_BLOCK,
  ElementProps,
  ItemState,
  ItemStateOptions,
} from "../utils/constants";
import { bem } from "../utils/bem";
import { mergeProps } from "../utils/mergeProps";
import useSettings from "../../../hooks/useSettings";
import { useAccordionItem } from "../hooks/useAccordionItem";
import { useHeightTransition } from "../hooks/useHeightTransition";
import { useMergeRef } from "../hooks/useMergeRef";
import { ChevronDown } from "@wfp/icons-react";
import { withAccordionItem, ItemStateProps } from "./withAccordionItem";
import classNames from "classnames";

interface ItemElementProps<E extends HTMLElement>
  extends ElementProps<E, TransitionState> {
  ref?: React.ForwardedRef<E>;
}

type NodeOrFunc = React.ReactNode | ((props: ItemState) => React.ReactNode);

interface AccordionItemProps
  extends ItemStateOptions,
    ElementProps<HTMLDivElement, TransitionState> {
  /**
   * Either a React node or a function that returns a React node.
   * This property defines the content of the accordion item's header.
   */
  header?: NodeOrFunc;

  /**
   * Can be either a React node or a function that returns a React node.
   * This property defines the main content of the accordion item.
   */
  children?: NodeOrFunc;

  /**
   * Specifies the HTML tag to be used for the heading element of the accordion item.
   * It can be any of the heading tags from 'h1' to 'h6'.
   */
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Properties to be passed to the heading element of the accordion item.
   * It extends from `ItemElementProps` which includes standard HTML attributes and a ref.
   */
  headingProps?: ItemElementProps<HTMLHeadingElement>;

  /**
   * Properties to be passed to the button element within the accordion item.
   * It extends from `ItemElementProps` which includes standard HTML attributes and a ref.
   */
  buttonProps?: ItemElementProps<HTMLButtonElement>;

  /**
   * Properties to be passed to the content container element of the accordion item.
   * It extends from `ItemElementProps` which includes standard HTML attributes and a ref.
   */
  contentProps?: ItemElementProps<HTMLDivElement>;

  /**
   * Properties to be passed to the panel element inside the content container of the accordion item.
   * It extends from `ItemElementProps` which includes standard HTML attributes and a ref.
   */
  panelProps?: ItemElementProps<HTMLDivElement>;
}

interface WrappedItemProps<E extends Element>
  extends ItemStateProps<E>,
    Omit<AccordionItemProps, "itemRef" | "itemKey" | "initialEntered"> {}

const getRenderNode: <P>(
  nodeOrFunc: React.ReactNode | ((props: P) => React.ReactNode),
  props: P
) => React.ReactNode = (nodeOrFunc, props) =>
  typeof nodeOrFunc === "function" ? nodeOrFunc(props) : nodeOrFunc;

const WrappedItem = React.memo(
  ({
    forwardedRef,
    itemRef,
    state,
    toggle,
    className,
    disabled,
    header,
    headingTag: Heading = "h3",
    headingProps,
    buttonProps,
    contentProps,
    panelProps,
    children,
    ...rest
  }: WrappedItemProps<HTMLDivElement>) => {
    const itemState: ItemState = { state, toggle, disabled };
    const { buttonProps: _buttonProps, panelProps: _panelProps } =
      useAccordionItem(itemState);
    const [transitionStyle, _panelRef] =
      useHeightTransition<HTMLDivElement>(state);
    const panelRef = useMergeRef(panelProps && panelProps.ref, _panelRef);
    const { status, isMounted, isEnter } = state;

    const { prefix } = useSettings();

    const buttonClasses = classNames(`${prefix}--accordion--button`, {
      [`${prefix}--accordion--button__expanded`]: isEnter,
      //  [`${className}`]: className,
    });

    return (
      <div
        {...rest}
        ref={useMergeRef(forwardedRef, itemRef)}
        className={bem(ACCORDION_BLOCK, "item", { status, expanded: isEnter })(
          className,
          state
        )}
      >
        <Heading
          {...headingProps}
          style={{ margin: 0, ...(headingProps && headingProps.style) }}
          className={bem(ACCORDION_BLOCK, "item-heading")(
            headingProps && headingProps.className,
            state
          )}
        >
          <button
            {...mergeProps(_buttonProps, buttonProps)}
            type="button"
            className={bem(ACCORDION_BLOCK, "item-btn")(
              buttonProps && buttonProps.className,
              state
            )}
          >
            <ChevronDown description="open" className={buttonClasses} />
            {getRenderNode(header, itemState)}
          </button>
        </Heading>

        {isMounted && (
          <div
            {...contentProps}
            style={{
              display: status === "exited" ? "none" : undefined,
              ...transitionStyle,
              ...(contentProps && contentProps.style),
            }}
            className={bem(ACCORDION_BLOCK, "item-content")(
              contentProps && contentProps.className,
              state
            )}
          >
            <div
              {...mergeProps(_panelProps, panelProps)}
              ref={panelRef}
              className={bem(ACCORDION_BLOCK, "item-panel")(
                panelProps && panelProps.className,
                state
              )}
            >
              {getRenderNode(children, itemState)}
            </div>
          </div>
        )}
      </div>
    );
  }
);

WrappedItem.displayName = "AccordionItem";
const AccordionItem = withAccordionItem<AccordionItemProps, HTMLDivElement>(
  WrappedItem
);

AccordionItem.displayName = "AccordionItem";

export { AccordionItem, AccordionItemProps };
