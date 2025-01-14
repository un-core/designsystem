import React, { ReactNode } from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import Wrapper from '../Wrapper';

import useSettings from '../../hooks/useSettings';

type HeroExternalProps = PropsWithChildren<{
  /**
   A search-friendly title (ideally 50 characters, max 100) 
*/
  title?: string | ReactNode;
  /**
   Additional className which will be added
 */
  className?: string;
  /**
  A short sentence to explain the content of the node (max 180 characters) 
*/
  subTitle: React.ReactNode;
  /**
   An optimized photograph
 */
  image: string;
}>;

const HeroExternal: React.FC<HeroExternalProps> = ({
  title,
  subTitle,
  image,
  children,
  className,
  // ...other
}) => {
  const { prefix } = useSettings();

  const wrapperClasses = classNames(`${prefix}--hero-ext`, {
    [`${className}`]: className,
  });

  return (
    // TODO: Provide a prop to set the backgrond image (linear-gradient should be not editable)
    // TODO: Provide a prop [string] to set the backgrond position (optional).
    <div
      className={wrapperClasses}
      // TODO: do we need a token for the linear gradient?
      style={{
        backgroundImage: `linear-gradient(rgba(26, 66, 98, 0.8), rgba(26, 66, 98, 0.8)), url(${image})`,
        backgroundPosition: 'center right',
      }}>
      <Wrapper pageWidth="md">
        <div className={`${prefix}--hero-ext__content`}>
          {title && <h1 className={`${prefix}--hero-ext__heading`}>{title}</h1>}
          {subTitle && (
            <p className={`${prefix}--hero-ext__body-copy`}>{subTitle}</p>
          )}
        </div>
        {children}
      </Wrapper>
    </div>
  );
};

export default HeroExternal;
