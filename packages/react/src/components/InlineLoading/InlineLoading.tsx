import * as React from "react";
import classNames from "classnames";
import useSettings from "../../hooks/useSettings";
import Loading from "../Loading";

interface InlineLoadingProps {
  /**
   * Specify whether the load was successful
   */
  success?: boolean;
  /**
   * Specify the description for the inline loading text
   */
  description?: React.ReactNode;
  /**
   * Provide a delay for the `setTimeout` for success
   */
  successDelay?: number;
  /**
   * Provide an optional handler to be invoked when <InlineLoading> is
   * successful
   */
  onSuccess?: () => void;
  /**
   * Specify a custom className to be applied to the container node
   */
  className?: string;
}

const InlineLoading: React.FC<InlineLoadingProps> = (props) => {
  const { className, success, description, onSuccess, successDelay, ...other } =
    props;

  const { prefix } = useSettings();

  const loadingClasses = classNames(`${prefix}--inline-loading`, className);

  const getLoading = () => {
    if (success) {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, successDelay);

      return (
        <svg
          className={`${prefix}--inline-loading__checkmark-container ${prefix}--inline-loading__svg`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
        >
          <polyline
            className={`${prefix}--inline-loading__checkmark`}
            points="0.74 3.4 3.67 6.34 9.24 0.74"
          />
        </svg>
      );
    }

    return <Loading small withOverlay={false} />;
  };

  const loadingText = (
    <p className={`${prefix}--inline-loading__text`}>{description}</p>
  );

  return (
    <div className={loadingClasses} {...other}>
      <div className={`${prefix}--inline-loading__animation`}>
        {getLoading()}
      </div>
      {description && loadingText}
    </div>
  );
};

InlineLoading.displayName = "InlineLoading";

export default InlineLoading;
