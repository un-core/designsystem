import * as React from 'react';
import classNames from 'classnames';
import Wrapper from '../Wrapper';
import useSettings from '../../hooks/useSettings';
import { ScreenSize } from '../../utils';

/** The InfoBar shows very important information on top of the page. */
interface InfoBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   *  `pageWidth` for the `<Wrapper />` component
   */
  pageWidth?: ScreenSize;
  /**
   * Additional `className` for the `<Wrapper />` component
   */
  wrapperClassName?: string;
  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className?: string;
  /**
   * Additional `id` provided to the wrapping element
   */
  id?: string;
}

const InfoBar: React.FC<InfoBarProps> = ({
  children,
  className,
  id,
  pageWidth,
}) => {
  const { prefix } = useSettings();

  const wrapperClasses = classNames(`${prefix}--info-bar`, className);

  return (
    <div id={id} className={wrapperClasses}>
      <Wrapper pageWidth={pageWidth}>{children}</Wrapper>
    </div>
  );
};

InfoBar.displayName = 'InfoBar';

export default InfoBar;
