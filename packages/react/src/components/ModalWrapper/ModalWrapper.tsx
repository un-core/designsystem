import * as React from "react";
import Modal from "../Modal";
import Button from "../Button";
import useSettings from "../../hooks/useSettings";
import { ButtonKind } from "../../utils";
import { ModalProps } from "../Modal/Modal";

/** Modal Wrapper component to encapsulate your Modal within a button. */
interface ModalWrapperProps
  extends ModalProps,
    React.ComponentPropsWithRef<"div"> {
  id?: string;
  /*status?: string;
   */
  disabled?: boolean /*
  components?: {
    Wrapper?: React.ReactNode;
  };*/;
  /**
   * Specify a custom trigger `Button`.
   */
  customButton?: React.ReactElement;
  /**
   * Specify the text for the trigger `Button`.
   */
  buttonTriggerText?: React.ReactNode;
  /**
   * Specify a `class` for the trigger `Button`.
   */
  buttonTriggerClassName?: string;
  /*modalLabel?: React.ReactNode;
  modalHeading?: React.ReactNode;
  modalText?: React.ReactNode;
  passiveModal?: boolean;
  withHeader?: boolean;
  danger?: boolean;
  modalBeforeContent?: boolean;
  primaryButtonText?: React.ReactNode;
  width?: 'wide' | 'narrow';
  secondaryButtonText?: React.ReactNode;
  */
  /**
   * @param handle - function to open the modal
   */
  handleOpen?: () => void;
  /**
   * @param handle - function to submit content in the modal
   */
  handleSubmit?: (handle: () => void) => void;
  /**
   * @param handle - function to close the modal
   */
  handleClose?: () => void;
  triggerButtonKind?: ButtonKind;
  shouldCloseAfterSubmit?: boolean;
  primaryButtonDisabled?: boolean;
  onKeyDown?: (evt: React.KeyboardEvent<HTMLDivElement>) => void;
  /*primaryButtonRef?: React.RefObject<HTMLButtonElement>;
  secondaryButtonRef?: React.RefObject<HTMLButtonElement>*/
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  customButton,
  id,
  onKeyDown,
  buttonTriggerText,
  buttonTriggerClassName,
  triggerButtonKind,
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSubmit = () => {},
  shouldCloseAfterSubmit = true,
  ...other
}) => {
  const { prefix } = useSettings();
  const triggerButton = React.createRef<HTMLButtonElement>();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (!isOpen) {
      triggerButton.current && triggerButton.current.focus();
      if (handleClose) {
        handleClose();
      }
    }
  };

  const handleOnRequestSubmit = () => {
    if (handleSubmit) {
      handleSubmit(handleClose);
      if (shouldCloseAfterSubmit) {
        handleClose();
      }
    }
  };

  const props = {
    ...other,
    open: isOpen,
    onRequestClose: handleClose,
    onRequestSubmit: handleOnRequestSubmit,
  };

  const customButtonEl = customButton
    ? React.cloneElement(customButton, {
        disabled: disabled,
        onClick: handleOpen,
        inputref: triggerButton,
      })
    : undefined;

  return (
    <div
      role="presentation"
      className={`${prefix}--modal__wrapper`}
      onKeyDown={(evt) => {
        if (evt.which === 27) {
          handleClose();
          onKeyDown && onKeyDown(evt);
        }
      }}
    >
      {customButton ? (
        <React.Fragment>{customButtonEl}</React.Fragment>
      ) : (
        <Button
          id={id}
          className={buttonTriggerClassName}
          disabled={disabled}
          kind={triggerButtonKind}
          onClick={handleOpen}
          ref={triggerButton}
        >
          {buttonTriggerText}
        </Button>
      )}
      <Modal {...props}>{children}</Modal>
    </div>
  );
};

ModalWrapper.displayName = "ModalWrapper";

export default ModalWrapper;
