/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
//import classNames from 'classnames';
//import useSettings from '../../hooks/useSettings';
import useTab from "./useTab";

export interface TabProps extends React.ComponentPropsWithRef<"li"> {
  /**
   * Optional callback for when a tab is clicked. Provides the index, label, and event details.
   * @functionality
   */
  handleTabClick?: (
    index?: number,
    label?: string | React.ReactNode,
    evt?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Optional callback for when a tab gains focus. Provides the index of the focused tab.
   * @functionality
   */
  handleTabAnchorFocus?: (index?: number) => void;
  /**
   * Optional callback for when a keydown event occurs on a tab. Provides the index, label, and event details.
   * @functionality
   */
  handleTabKeyDown?: (
    index?: number,
    label?: string | React.ReactNode,
    evt?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  /**
   * Href for the tab, useful when each tab is associated with a different URL.
   * @navigation
   */
  href?: string;
  /**
   * Index of the tab within the Tabs component.
   * @navigation
   */
  index?: number;
  /**
   * Content to be displayed as the label of the tab. Can be a string or React node.
   * @content
   */
  label?: React.ReactNode;
  /**
   * ARIA role for the tab element, often set to 'tab'.
   * @accessibility
   */
  role?: string;
  /**
   * Indicates whether the tab is currently selected.
   * @state
   */
  selected?: boolean;
  /**
   * TabIndex for the tab, useful for accessibility and keyboard navigation.
   * @accessibility
   */
  tabIndex?: number;
  /**
   * Optional custom renderer for the anchor element within the tab.
   * @render
   */
  renderAnchor?: (props?: object) => React.ReactNode;
  /**
   * Optional custom renderer for the content of the tab.
   * @render
   */
  renderContent?: () => React.ReactNode;
  /**
   * Optional custom renderer for the list element of the tab.
   * @render
   */
  renderListElement?: ((props?: object) => React.ReactNode) | React.ReactNode;
  /**
   * Optional CSS class to apply to the tab. Allows for additional styling.
   * @style
   */
  className?: string;
  /**
   * Indicates whether the tab is disabled.
   * @state
   */
  disabled?: boolean;
  /**
   * Optional components to replace default elements of the Tab, such as the Tab itself.
   * @customization
   */
  components?: {
    Tab?: React.ReactNode;
  };
  //onClick?: (evt?: Event) => void;
  //onKeyDown?: (evt?: Event) => void;
}

/** Tab to be used inside the Tabs component */

const Tab: React.FC<TabProps> = (props) => {
  // const { prefix } = useSettings();
  const {
    // className,
    disabled,
    //  handleTabClick = () => {},
    // handleTabAnchorFocus = () => {}, // eslint-disable-line
    //  handleTabKeyDown = () => {},
    // href,
    // index = 0,
    label,
    //  selected,
    //  tabIndex,
    ///  onClick = () => {},
    //  onKeyDown = () => {},
    renderAnchor,
    renderListElement,
    //  ...other
  } = props;

  const { anchorProps, liProps, selectedClasses } = useTab(props);

  return (
    <React.Fragment>
      {renderListElement ? (
        typeof renderListElement === "function" ? (
          renderListElement({
            ...props,
            ...liProps,
            anchor: anchorProps,
            selectedClasses: selectedClasses,
          })
        ) : (
          <>{renderListElement}</>
        )
      ) : (
        <li {...liProps}>
          {renderAnchor ? (
            renderAnchor(anchorProps)
          ) : disabled ? (
            <span {...anchorProps}>{label}</span>
          ) : (
            <a {...anchorProps}>{label}</a>
          )}
        </li>
      )}
    </React.Fragment>
  );
};

export default Tab;
