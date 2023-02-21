import React, { useState, useRef, useEffect, PropsWithChildren } from 'react';
import classnames from 'classnames';
import useSettings from '../../hooks/useSettings';
import {
  Close,
  Error,
  CheckmarkCircle,
  WarningSolid,
  InfoCircle,
} from '@un/icons-react';

import Button from '../Button';

type NotificationActionButtonProps = PropsWithChildren<{
  className?: string;
  onClick?: () => {};
}>;
/** Notifications are messages that communicate information to the user. The two main types of notifications are toast notifications and inline notifications. */
const NotificationActionButton: React.FC<NotificationActionButtonProps> = ({
  children,
  className: customClassName,
  onClick,
  ...other
}) => {
  const { prefix } = useSettings();

  const className = classnames(
    customClassName,
    `${prefix}--inline-notification__action-button`
  );

  return (
    <Button
      className={className}
      kind="ghost"
      onClick={onClick}
      small={true}
      {...other}>
      {children}
    </Button>
  );
};

interface NotificationButtonProps {
  ariaLabel?: string;
  className?: string;
  iconDescription?: string;
  name?: string;
  notificationType?: 'toast' | 'inline';
  renderIcon?: React.JSXElementConstructor<any>;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (evt?: any) => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  ariaLabel,
  className,
  iconDescription,
  type = 'button',
  renderIcon: IconTag,
  name,
  notificationType,
  ...other
}) => {
  const { prefix } = useSettings();

  const buttonClassName = classnames(className, {
    [`${prefix}--${notificationType}-notification__close-button`]:
      notificationType,
  });
  const iconClassName = classnames({
    [`${prefix}--${notificationType}-notification__close-icon`]:
      notificationType,
  });

  // const Icon = renderIcon;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...other}
      type={type}
      aria-label={iconDescription}
      title={iconDescription}
      className={buttonClassName}>
      {IconTag ? (
        <IconTag aria-label={ariaLabel} className={iconClassName} name={name} />
      ) : (
        <Close icon={Close} aria-label={ariaLabel} className={iconClassName} />
      )}
    </button>
  );
};

type NotificationTextDetailsProps = PropsWithChildren<{
  caption?: React.ReactNode;
  notificationType: 'toast' | 'inline';
  subtitle?: React.ReactNode;
  title?: string;
}>;

const NotificationTextDetails: React.FC<NotificationTextDetailsProps> = ({
  title,
  subtitle,
  caption,
  notificationType,
  children,
  ...other
}) => {
  const { prefix } = useSettings();

  if (notificationType === 'toast') {
    return (
      <div {...other} className={`${prefix}--toast-notification__details`}>
        {title && (
          <h3 className={`${prefix}--toast-notification__title`}>{title}</h3>
        )}
        <div className={`${prefix}--toast-notification__subtitle`}>
          {subtitle}
        </div>
        <div className={`${prefix}--toast-notification__caption`}>
          {caption}
        </div>
        {children}
      </div>
    );
  }

  if (notificationType === 'inline') {
    return (
      <div
        {...other}
        className={`${prefix}--inline-notification__text-wrapper`}>
        {title && (
          <p className={`${prefix}--inline-notification__title`}>{title}</p>
        )}
        <div className={`${prefix}--inline-notification__subtitle`}>
          {children || subtitle}
        </div>
      </div>
    );
  }
  return null;
};

// NotificationTextDetails.defaultProps = {
//   //title: 'title',
//   notificationType: 'toast',
// };

interface NotificationIconProps {
  iconDescription: string;
  kind: 'error' | 'success' | 'warning' | 'warning-alt' | 'info';
  notificationType: 'inline' | 'toast';
}

const iconTypes = {
  error: Error,
  success: CheckmarkCircle,
  warning: WarningSolid,
  info: InfoCircle,
};

const NotificationIcon: React.FC<NotificationIconProps> = ({
  iconDescription,
  kind,
  notificationType,
}) => {
  const { prefix } = useSettings();
  const IconForKind = iconTypes[kind];
  if (!IconForKind) {
    return null;
  }
  return (
    <IconForKind
      className={`${prefix}--${notificationType}-notification__icon`}>
      <title>{iconDescription}</title>
    </IconForKind>
  );
};

// NotificationIcon.propTypes = {
//   iconDescription: PropTypes.string.isRequired,
//   kind: PropTypes.oneOf([
//     'error',
//     'success',
//     'warning',
//     'warning-alt',
//     'info',
//     //'info-square',
//   ]).isRequired,
//   notificationType: PropTypes.oneOf(['inline', 'toast']).isRequired,
// };

type ToastNotificationProps = PropsWithChildren<{
  caption?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  iconDescription?: string;
  kind: 'error' | 'info' | 'success' | 'warning' | 'warning-alt';
  lowContrast?: boolean;
  notificationType?: 'toast' | 'inline';
  onClose?: (evt?: any) => {};
  onCloseButtonClick?: (evt?: any) => {};
  role: string;
  statusIconDescription?: string;
  subtitle?: React.ReactNode;
  timeout?: number;
  title?: string;
}>;

const ToastNotification: React.FC<ToastNotificationProps> = ({
  role,
  notificationType,
  onClose,
  onCloseButtonClick,
  iconDescription,
  statusIconDescription,
  className,
  caption,
  subtitle,
  title,
  kind,
  lowContrast,
  hideCloseButton,
  children,
  timeout,
  ...other
}) => {
  const { prefix } = useSettings();
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = classnames(className, {
    [`${prefix}--toast-notification`]: true,
    [`${prefix}--toast-notification--low-contrast`]: lowContrast,
    [`${prefix}--toast-notification--${kind}`]: kind,
  });

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };

  function handleCloseButtonClick(event) {
    onCloseButtonClick && onCloseButtonClick(event);
    handleClose(event);
  }

  const savedOnClose = useRef(onClose);

  useEffect(() => {
    savedOnClose.current = onClose;
  });

  useEffect(() => {
    if (!timeout) {
      return;
    }

    const timeoutId = window.setTimeout((event) => {
      setIsOpen(false);
      if (savedOnClose.current) {
        savedOnClose.current(event);
      }
    }, timeout);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeout]);

  if (!isOpen) {
    return null;
  }

  return (
    <div {...other} role={role} kind={kind} className={containerClassName}>
      <NotificationIcon
        notificationType="toast"
        kind={kind}
        iconDescription={statusIconDescription || `${kind} icon`}
      />
      <NotificationTextDetails
        title={title}
        subtitle={subtitle}
        caption={caption}
        notificationType="toast">
        {children}
      </NotificationTextDetails>
      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
};

type InlineNotificationProps = PropsWithChildren<{
  actions?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  icon?: React.ReactNode | boolean;
  iconDescription?: string;
  kind: 'error' | 'info' | 'success' | 'warning' | 'warning-alt';
  lowContrast?: boolean;
  notificationType?: 'toast' | 'inline';
  onCloseButtonClick?: (evt?: any) => void;
  role: string;
  statusIconDescription?: string;
  subtitle?: React.ReactNode;
  title: string;
  onClose?: (evt?: any) => {};
}>;

const InlineNotification: React.FC<InlineNotificationProps> = ({
  actions,
  role,
  notificationType,
  onClose,
  onCloseButtonClick,
  icon,
  iconDescription,
  statusIconDescription,
  className,
  subtitle,
  title,
  kind,
  lowContrast,
  hideCloseButton,
  children,
  ...other
}) => {
  const { prefix } = useSettings();
  const [isOpen, setIsOpen] = useState(true);
  const containerClassName = classnames(className, {
    [`${prefix}--inline-notification`]: true,
    [`${prefix}--inline-notification--low-contrast`]: lowContrast,
    [`${prefix}--inline-notification--${kind}`]: kind,
    [`${prefix}--inline-notification--hide-close-button`]: hideCloseButton,
  });

  const handleClose = (evt) => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false);
    }
  };

  function handleCloseButtonClick(event) {
    onCloseButtonClick && onCloseButtonClick(event);
    handleClose(event);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div {...other} role={role} kind={kind} className={containerClassName}>
      <div className={`${prefix}--inline-notification__details`}>
        {icon === undefined && (
          <NotificationIcon
            notificationType="inline"
            kind={kind}
            iconDescription={statusIconDescription || `${kind} icon`}
          />
        )}
        {icon && (
          <div className={`${prefix}--${notificationType}-notification__icon`}>
            {icon}
          </div>
        )}
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          notificationType="inline">
          {children}
        </NotificationTextDetails>
      </div>
      {actions}
      {!hideCloseButton && (
        <NotificationButton
          iconDescription={iconDescription}
          notificationType={notificationType}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
};

export {
  NotificationActionButton,
  NotificationButton,
  NotificationTextDetails,
  NotificationIcon,
  ToastNotification,
  InlineNotification,
};
