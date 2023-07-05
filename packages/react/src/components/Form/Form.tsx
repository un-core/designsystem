import * as React from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useSettings from '../../hooks/useSettings';

type FormProps = PropsWithChildren<{
  /**
   * Default margin is added to each form input
   */
  longForm?: boolean;
  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className?: string;
}>;
/** A form is a group of related input controls that allows users to provide data or configure options. */
const Form: React.FC<FormProps> = ({
  className,
  children,
  longForm = true,
  ...other
}) => {
  const { prefix } = useSettings();

  const classes = classNames(
    `${prefix}--form`,
    { [`${prefix}--form-long`]: longForm === true },
    className
  );

  return (
    <form className={classes} {...other}>
      {children}
    </form>
  );
};

Form.displayName = 'Form';

export default Form;
