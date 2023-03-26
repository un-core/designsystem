import { List, ListItem } from '@un/react';
import React from 'react';
import styles from './styles.module.scss';

export function DoUse({ children, title = 'When to use', kind = 'checkmark' }) {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childrenListItemWithProps = React.Children.map(
        child.props.children,
        (childListItem) => {
          if (React.isValidElement(childListItem)) {
            return React.createElement(
              ListItem,
              { className: 'greeting', ...childListItem.props, kind }
              //...childListItem.props
            );
            /*return React.cloneElement(childListItem, {
              className: styles.list,
              kind,
            });*/
          }
          return childListItem;
        }
      );
      return childrenListItemWithProps;
      /*console.log('childrenListItemWithProps', childrenListItemWithProps);
      return React.cloneElement(childrenListItemWithProps, {
        className: styles.list,
      });*/
    }
    return child;
  });

  return (
    <div className={styles.doUse}>
      <h3>{title}</h3>
      <List kind="bullets">{childrenWithProps}</List>
    </div>
  );
}

export function DoNotUse({ title = 'When not to use', ...props }) {
  return <DoUse {...props} kind="cross" title={title} />;
}
