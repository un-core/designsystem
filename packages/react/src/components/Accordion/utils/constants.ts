import { createContext, HTMLAttributes } from "react";
import {
  TransitionState,
  TransitionMapResult,
  TransitionMapOptions,
  TransitionOptions,
} from "react-transition-state";

export const ACCORDION_BLOCK = "szh-accordion";
export const ACCORDION_PREFIX = "szh-adn";
export const ACCORDION_ATTR = `data-${ACCORDION_PREFIX}`;
export const ACCORDION_BTN_ATTR = `data-${ACCORDION_PREFIX}-btn`;

export type Modifiers = {
  readonly [index: string]: boolean | string;
};
export type ClassNameProp<P> = string | ((props: P) => string);
export interface ElementProps<E extends HTMLElement, P = undefined>
  extends Omit<HTMLAttributes<E>, "className" | "children"> {
  className?: P extends undefined ? string : ClassNameProp<P>;
  "data-testid"?: string | number;
}

export type ItemKey = Element | string | number;
export type TransitionProp =
  | boolean
  | {
      enter?: boolean;
      exit?: boolean;
      preEnter?: boolean;
      preExit?: boolean;
    };

export interface ItemState {
  readonly state: TransitionState;
  readonly toggle: (toEnter?: boolean) => void;
  disabled?: boolean;
}

export interface ItemStateOptions {
  itemKey?: string | number;
  initialEntered?: boolean;
  disabled?: boolean;
}

export interface AccordionProviderOptions
  extends Omit<
    TransitionMapOptions<ItemKey>,
    "enter" | "exit" | "preEnter" | "preExit" | "timeout"
  > {
  /**
   * The transition behavior for the accordion.
   * It can take a TransitionProp type which specifies the type of transition.
   */
  transition?: TransitionProp;

  /**
   *  Set the timeout duration for transitions.
   * It uses the 'timeout' type from TransitionOptions to specify the duration in milliseconds.
   */
  transitionTimeout?: TransitionOptions["timeout"];
}

export interface AccordionProviderValue extends TransitionMapResult<ItemKey> {
  /**
   * Determines whether the accordion item should be mounted
   * in the DOM only when it enters. A true value means the item will only mount when
   * it is opened (entered state).
   */
  mountOnEnter: boolean;

  /**
   * Indicates whether the accordion item should be in the
   * entered (or opened) state initially. This can be used to display the accordion item
   * as open by default when the component is first rendered.
   */
  initialEntered: boolean;
}

export const AccordionContext = createContext<Partial<AccordionProviderValue>>(
  {}
);
