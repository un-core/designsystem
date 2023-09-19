/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  Ellipsis,
  WarningOutline,
  Locked,
  Error,
  Checkmark,
  Menu,
  OverflowMenu,
} from '@un/icons-react';
import useSettings from '../../hooks/useSettings';

type StepNavigationItemProps = PropsWithChildren<{
  /**
   * Provide a className that is applied to the StepNavigation component
   *
   */
  className?: string;
  /**
   * Provide text that is used alongside the control label for additional help
   *
   */
  helperText?: React.ReactNode;
  /**
   * Provide the index of the each item
   *
   */
  index?: number;
  /**
   * Provide the text that will be read by a screen reader when visiting this control
   *
   */
  label?: string;
  /**
   * By default, this value is "presentation". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role?: string;
  /**
   * Optionally provide an index for the currently selected <Tab>
   */
  selectedPage?: number;
  /**
   * The page number of the step.
   **/
  page?: number;
  /**
   * Provide status one of these status prop type to your step to give more meaning.
   *
   */

  status?: string;
  /**
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   */
  renderAnchor?: (p: object) => {};
  /**
   * On click handler to change the currently active item.
   **/
  onClick?: (e: object) => {};
  handleTabClick?: (e?: any, index?: number, label?: string) => {};
}>;

const StepNavigationItem: React.FC<StepNavigationItemProps> = ({
  className,
  handleTabClick = () => {},
  index,
  label,
  status,
  helperText,
  selectedPage = 0,
  onClick = () => {},
  page = 0,
  renderAnchor,
}) => {
  const { prefix } = useSettings();

  const classes = classNames(
    `${prefix}--step-navigation__nav-item`,
    { [`${prefix}--step-navigation__nav-item--before`]: page < selectedPage },
    {
      [`${prefix}--step-navigation__nav-item--selected`]: page === selectedPage,
    },
    { [`${prefix}--step-navigation__nav-item--${status}`]: status },
    className
  );

  const anchorProps = {
    className: `${prefix}--step-navigation__nav-link`,
    /*ref: (e) => {
      this.tabAnchor = e;
    },*/
  };

  const icon = {
    'not-started': { icon: Ellipsis },
    warning: { icon: WarningOutline },
    locked: { icon: Locked },
    skip: { icon: OverflowMenu },
    disabled: { icon: Error },
    complete: { icon: Checkmark },
    summary: { icon: Menu },
  };

  const Icon = status ? icon[status]?.icon : null;
  return (
    <li
      tabIndex={-1}
      className={classes}
      onClick={(evt) => {
        if (status !== 'locked') {
          handleTabClick(evt, index, label);
          onClick(evt);
        }
      }}
      role="presentation">
      <>
        {renderAnchor ? (
          renderAnchor(anchorProps)
        ) : (
          <React.Fragment>
            <div className={`${prefix}--step-navigation__nav-item__indicator`}>
              {status && page !== selectedPage ? (
                <Icon width="14" height="14" description="Step Item" />
              ) : (
                <span>{page + 1}</span>
              )}
            </div>
            <div>
              <span className={`${prefix}--step-navigation__nav-item__text`}>
                {label}
              </span>
              {helperText && (
                <span
                  className={`${prefix}--step-navigation__nav-item__helper-text`}>
                  {helperText}
                </span>
              )}
            </div>
          </React.Fragment>
        )}
      </>
    </li>
  );
};

export default StepNavigationItem;
