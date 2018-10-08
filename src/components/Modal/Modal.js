import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { iconClose } from '@wfp/icons';
import Icon from '../Icon';
import Button from '../Button';

const matchesFuncName =
  typeof Element !== 'undefined' &&
  ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(
    name => typeof Element.prototype[name] === 'function'
  )[0];

const modalRoot = document.body;

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    passiveModal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    id: PropTypes.string,
    inPortal: PropTypes.bool,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    modalAriaLabel: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    open: PropTypes.bool,
    onRequestSubmit: PropTypes.func,
    onKeyDown: PropTypes.func,
    iconDescription: PropTypes.string,
    primaryButtonDisabled: PropTypes.bool,
    onSecondarySubmit: PropTypes.func,
    danger: PropTypes.bool,
    shouldSubmitOnEnter: PropTypes.bool,
    selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),
    selectorPrimaryFocus: PropTypes.string,
  };

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
    primaryButtonDisabled: false,
    onKeyDown: () => {},
    passiveModal: false,
    iconDescription: 'close the modal',
    inPortal: true,
    modalHeading: '',
    modalLabel: '',
    selectorsFloatingMenus: [
      '.wfp--overflow-menu-options',
      '.wfp--tooltip',
      '.flatpickr-calendar',
    ],
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  };
  
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  button = React.createRef();
  outerModal = React.createRef();
  innerModal = React.createRef();

  elementOrParentIsFloatingMenu = target => {
    if (target && typeof target.closest === 'function') {
      return this.props.selectorsFloatingMenus.some(selector =>
        target.closest(selector)
      );
    } else {
      // Alternative if closest does not exist.
      while (target) {
        if (typeof target[matchesFuncName] === 'function') {
          if (
            this.props.selectorsFloatingMenus.some(selector =>
              target[matchesFuncName](selector)
            )
          ) {
            return true;
          }
        }
        target = target.parentNode;
      }
      return false;
    }
  };

  handleKeyDown = evt => {
    if (evt.which === 27) {
      this.props.onRequestClose(evt);
    }
    if (evt.which === 13 && this.props.shouldSubmitOnEnter) {
      this.props.onRequestSubmit(evt);
    }
  };

  handleClick = evt => {
    if (
      this.innerModal.current &&
      !this.innerModal.current.contains(evt.target) &&
      !this.elementOrParentIsFloatingMenu(evt.target)
    ) {
      this.props.onRequestClose(evt);
    }
  };

  handleBlur = evt => {
    // Keyboard trap
    if (
      this.innerModal.current &&
      this.props.open &&
      evt.relatedTarget &&
      !this.innerModal.current.contains(evt.relatedTarget) &&
      !this.elementOrParentIsFloatingMenu(evt.relatedTarget)
    ) {
      this.focusModal();
    }
  };

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  componentDidUpdate(prevProps) {

    if (!prevProps.open && this.props.open) {
      this.beingOpen = true;
    } else if (prevProps.open && !this.props.open) {
      this.beingOpen = false;
    }
  }

  focusModal = () => {
    if (this.outerModal.current) {
      this.outerModal.current.focus();
    }
  };

  focusButton = evt => {
    const primaryFocusElement = evt.currentTarget.querySelector(
      this.props.selectorPrimaryFocus
    );
    if (primaryFocusElement) {
      primaryFocusElement.focus();
      return;
    }
    if (this.button) {
      this.button.current.focus();
    }
  };

  handleTransitionEnd = evt => {
    if (
      this.outerModal.current.offsetWidth &&
      this.outerModal.current.offsetHeight &&
      this.beingOpen
    ) {
      this.focusButton(evt);
      this.beingOpen = false;
    }
  };

  render() {
    const {
      inPortal,
      modalHeading,
      modalLabel,
      modalAriaLabel,
      passiveModal,
      secondaryButtonText,
      primaryButtonText,
      open,
      onRequestClose,
      onRequestSubmit,
      onSecondarySubmit,
      iconDescription,
      primaryButtonDisabled,
      danger,
      selectorPrimaryFocus, // eslint-disable-line
      selectorsFloatingMenus, // eslint-disable-line
      shouldSubmitOnEnter, // eslint-disable-line
      ...other
    } = this.props;

    const onSecondaryButtonClick = onSecondarySubmit
      ? onSecondarySubmit
      : onRequestClose;

    const modalClasses = classNames({
      'wfp--modal': true,
      'wfp--modal-tall': !passiveModal,
      'is-visible': open,
      'wfp--modal--danger': this.props.danger,
      [this.props.className]: this.props.className,
    });

    const modalButton = (
      <button
        className="wfp--modal-close"
        type="button"
        onClick={onRequestClose}
        ref={this.button}>
        <Icon
          icon={iconClose}
          className="wfp--modal-close__icon"
          description={iconDescription}
        />
      </button>
    );

    const modalBody = (
      <div
        ref={this.innerModal}
        role="dialog"
        className="wfp--modal-container"
        aria-label={modalAriaLabel}>
        <div className="wfp--modal-header">
          {passiveModal && modalButton}
          {modalLabel && (
            <h4 className="wfp--modal-header__label">{modalLabel}</h4>
          )}
          <h2 className="wfp--modal-header__heading">{modalHeading}</h2>
          {!passiveModal && modalButton}
        </div>
        <div className="wfp--modal-content">{this.props.children}</div>
        {!passiveModal && (
          <div className="wfp--modal-footer">
            <div className="wfp--modal__buttons-container">
              <Button
                kind={danger ? 'tertiary' : 'secondary'}
                onClick={onSecondaryButtonClick}>
                {secondaryButtonText}
              </Button>
              <Button
                kind={danger ? 'danger--primary' : 'primary'}
                disabled={primaryButtonDisabled}
                onClick={onRequestSubmit}
                inputref={this.button}>
                {primaryButtonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    );


    const modal = (
      <div
        {...other}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        className={modalClasses}
        role="presentation"
        tabIndex={-1}
        onTransitionEnd={this.props.open ? this.handleTransitionEnd : undefined}
        ref={this.outerModal}>
        {modalBody}
      </div>
    );

    if (inPortal) {
      return ReactDOM.createPortal(
        modal,
        this.el,
      );
    }
    else {
      return modal;
    }
  }
}
