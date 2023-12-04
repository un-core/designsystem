import * as React from "react";
import { ItemState, ItemStateOptions } from "../utils/constants";
import { useAccordionItemEffect } from "../hooks/useAccordionItemEffect";

interface ItemStateProps<E extends Element, T = E> extends ItemState {
  itemRef: React.RefObject<E>;
  forwardedRef: React.ForwardedRef<T>;
}

const withAccordionItem = <
  P extends ItemStateOptions,
  E extends Element,
  T = E
>(
  WrappedItem: any //TODO: MemoExoticComponent<(props: ItemStateProps<E, T>) => JSX.Element>
) => {
  const WithAccordionItem = React.forwardRef<T, P>(
    ({ itemKey, initialEntered, ...rest }, ref) => (
      <WrappedItem
        forwardedRef={ref}
        {...rest}
        {...useAccordionItemEffect<E>({
          itemKey,
          initialEntered,
          disabled: rest.disabled,
        })}
      />
    )
  );

  WithAccordionItem.displayName = "withAccordionItem";
  return WithAccordionItem;
};

withAccordionItem.displayName = "withAccordionItem";

export { withAccordionItem, ItemStateProps };
