import * as React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';
import { CardKind } from '../../utils';

/**
 * Cards are a convenient means of displaying content composed of different types of objects. It is a multi usage component which creates boxes that are usually teasing some kind of content. */
type CardProps = PropsWithChildren<{
  /**
   Additional className which will be added
 */
  className?: string;
  /**
   An optimized photograph
 */
  image?: string;
  /**
  isExternal if true, opens link in a different window
*/
  isExternal?: boolean;
  /**
  Render the Card as link
*/
  isLink?: boolean;
  /**
  A short sentence to explain the content of the node (max 180 characters) 
*/
  subTitle?: React.ReactNode;
  /**
   A search-friendly title (ideally 50 characters, max 100) 
*/
  title?: string | React.ReactNode;
  /**
  Additional metadatas
*/
  metadata?: string;
  /**
   * Alternative text for image
   */
  alt?: string;
  /**
   * The content of the Card
   */
  children?: React.ReactNode;
  /**
  Kind of Card
*/
  kind?: CardKind;
  /**
  The URL where the content uploaded is located.
*/
  url?: string;
  /**
   * override default card width with preferred width
   */
  cardWidth?: string;
  /**
   * override default card width with preferred width
   */
  cardHeight?: string;
}>;

const Card: React.FC<CardProps> = ({
  children,
  className,
  image,
  isExternal,
  isLink,
  metadata,
  subTitle,
  title,
  alt,
  kind,
  url,
  cardWidth,
  cardHeight,
  ...other
}) => {
  const { prefix } = useSettings();
  const style =
    kind == 'overlay'
      ? {
          backgroundImage: `url(${image})`,
        }
      : {};

  const pagewidth = cardWidth ? cardWidth : '300px';
  const pageheight = cardHeight ? cardHeight : '260px';

  const wrapperClasses = classNames([`${prefix}--card-box`], {
    [`${prefix}--photo-cardnew--${kind}`]: kind,
    // 'wfp--photo-cardnew--no-background': !image,
    [`${prefix}--photo-cardnew--link`]: isLink,
    [`${className}`]: className,
  });

  const content = (
    <>
      {kind === 'overlay' ? (
        <div className={`${prefix}--photo-cardnew__background`} style={style} />
      ) : null}

      {image && kind === 'simple-card' ? (
        <img src={image} alt={alt} className={`${prefix}--header-photo`} />
      ) : null}

      <div className={`${prefix}--photo-cardnew__info`}>
        <div>
          {kind === 'overlay' && (
            <div
              className={`${prefix}--photo-cardnew__info__background`}
              style={style}
            />
          )}
          {metadata && (
            <p className={`${prefix}--photo-cardnew__info__metadata`}>
              {metadata}
            </p>
          )}
          {title && (
            <h3 className={`${prefix}--photo-cardnew__info__title`}>{title}</h3>
          )}
          {subTitle && (
            <p className={`${prefix}--photo-cardnew__info__subtitle`}>
              {subTitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </>
  );

  return isLink ? (
    <div
      className={wrapperClasses}
      style={{ width: pagewidth, minHeight: pageheight }}>
      <a
        href={url}
        target={isExternal ? '_blank' : ''}
        style={{ width: pagewidth, minHeight: pageheight }}
        {...other}>
        {content}
      </a>
    </div>
  ) : (
    <div
      className={wrapperClasses}
      {...other}
      style={{ width: pagewidth, minHeight: pageheight }}>
      {content}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
