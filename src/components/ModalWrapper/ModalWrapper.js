import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

export default class ModalWrapper extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    handleOpen: PropTypes.func,
    children: PropTypes.node,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.string,
    modalLabel: PropTypes.string,
    modalHeading: PropTypes.string,
    modalText: PropTypes.string,
    passiveModal: PropTypes.bool,
    withHeader: PropTypes.bool,
    modalBeforeContent: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    wide: PropTypes.bool,
    triggerButtonKind: PropTypes.oneOf([
      'primary',
      'secondary',
      'danger',
      'ghost',
    ]),
    shouldCloseAfterSubmit: PropTypes.bool,
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    triggerButtonKind: 'primary',
    disabled: false,
  };

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleOnRequestSubmit = () => {
    const { handleSubmit, shouldCloseAfterSubmit } = this.props;

    if (handleSubmit()) {
      if (shouldCloseAfterSubmit) {
        this.handleClose();
      }
    }
  };

  render() {
    const {
      customButton,
      id,
      buttonTriggerText,
      triggerButtonKind,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      disabled,
      wide,
    } = this.props;

    const props = {
      id,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      wide,
      open: this.state.isOpen,
      onRequestClose: this.handleClose,
      onRequestSubmit: this.handleOnRequestSubmit,
    };

    const customButtonEl = customButton ? React.cloneElement(customButton, {
      onClick: this.handleOpen,
      kind: triggerButtonKind,
    }) : undefined;

    return (
      <div
        role="presentation"
        onKeyDown={evt => {
          if (evt.which === 27) {
            this.handleClose();
            this.props.onKeyDown(evt);
          }
        }}>
        {customButton ? (
          <span>{customButtonEl}</span>
        ) : (
          <Button
            disabled={disabled}
            kind={triggerButtonKind}
            onClick={this.handleOpen}>
            {buttonTriggerText}
          </Button>
        )}

        <Modal {...props}>{this.props.children}</Modal>
      </div>
    );
  }
}
