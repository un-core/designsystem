import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import useSettings from '../../hooks/useSettings';
import { NotificationIcon, NotificationTextDetails } from './Notification';

interface BlockNotificationProps {
  actions?: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  icon?: React.ReactNode | boolean;
  iconDescription?: string;
  kind: 'error' | 'info' | 'success' | 'warning' | 'warning-alt';
  lowContrast?: boolean;
  notificationType: 'toast' | 'inline';
  onCloseButtonClick?: (evt?: any) => void;
  role: string;
  statusIconDescription?: string;
  subtitle?: React.ReactNode;
  title: string;
  onClose?: (evt?: any) => {};
}

const BlockNotification: React.FC<PropsWithChildren<BlockNotificationProps>> =
  ({
    actions,
    advancedActions,
    role,
    notificationType,
    onCloseButtonClick,
    onClose,
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
    const containerClassName = classnames(className, {
      [`${prefix}--inline-notification`]: true,
      [`${prefix}--block-notification`]: true,
      [`${prefix}--inline-notification--low-contrast`]: lowContrast,
      [`${prefix}--inline-notification--${kind}`]: kind,
      [`${prefix}--inline-notification--hide-close-button`]: hideCloseButton,
    });

    return (
      <div {...other} role={role} kind={kind} className={containerClassName}>
        <div className={`${prefix}--inline-notification__details`}>
          {icon === undefined && (
            <NotificationIcon
              notificationType={notificationType}
              kind={kind}
              iconDescription={statusIconDescription || `${kind} icon`}
            />
          )}
          {icon && (
            <div
              className={`${prefix}--${notificationType}-notification__icon`}>
              {icon}
            </div>
          )}
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType={notificationType}>
            {children}
          </NotificationTextDetails>
          {actions && (
            <div className={`${prefix}--inline-notification__actions-wrapper`}>
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  };

BlockNotification.defaultProps = {
  role: 'alert',
  notificationType: 'inline',
  iconDescription: 'closes notification',
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  lowContrast: true,
};

export default BlockNotification;
