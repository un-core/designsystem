import React from "react";
import { useEffect, useRef } from "react";
import { WfpLogoVerticalEn } from "@wfp/pictograms-react";
import { ChevronDown, ChevronUp } from "@wfp/icons-react";

import Button from "../Button";
import User from "../User";
import Wrapper from "../Wrapper";
import PropTypes from "prop-types";
import { useTogglable } from "../../hooks";
import useSettings from "../../hooks/useSettings";

const LanguageExternal = ({ children, primaryLanguage }) => {
  const { prefix } = useSettings();
  const ref = useRef<HTMLInputElement>(null);
  const languageTogglable = useTogglable();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        languageTogglable.isOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        languageTogglable.close();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [languageTogglable.isOpen]);

  return (
    <div className={`${prefix}--language-ext`} ref={ref}>
      <div
        className={`${prefix}--language-ext__trigger`}
        role="presentation"
        onClick={() =>
          languageTogglable.isOpen
            ? languageTogglable.close()
            : languageTogglable.open()
        }
      >
        <span>{primaryLanguage}</span>
        {languageTogglable.isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <ul
        className={`${prefix}--language-ext__dropdown ${
          languageTogglable.isOpen
            ? `${prefix}--language-ext__dropdown--is-shown`
            : ""
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

const UserExternal = ({ username, children, userImage }) => {
  const { prefix } = useSettings();

  const ref = useRef<HTMLInputElement>(null);
  const userTogglable = useTogglable();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        userTogglable.isOpen &&
        ref?.current &&
        !ref.current.contains(e.target)
      ) {
        userTogglable.close();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [userTogglable.isOpen]);

  return (
    <div className={`${prefix}--user-ext`} ref={ref}>
      <div
        className={`${prefix}--user-ext__trigger`}
        role="presentation"
        onClick={() =>
          userTogglable.isOpen ? userTogglable.close() : userTogglable.open()
        }
      >
        <User alt="User avatar" name={username} image={userImage} />
        {userTogglable.isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <ul
        className={`${prefix}--user-ext__dropdown ${
          userTogglable.isOpen ? `${prefix}--user-ext__dropdown--is-shown` : ""
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

interface MainNavigationExternalProps {
  /**
   * The name of your product can be applied to this prop
   */
  productName?: string;

  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className?: string;

  /**
   * List of laguages your site support
   */
  languageList?: React.ReactNode;

  /**
   * The name of signed in user can be applied to this prop
   */
  username?: string;

  /**
   * The image of signed in user can be applied to this prop
   */
  userImage?: string;

  /**
   * The dropdown details of user can be applied to this prop
   */
  userDetails?: React.ReactNode;

  /**
   * This prop accepts the first language your website is in. Default: English
   */
  primaryLanguage?: string;
  components?: any;
  children?: React.ReactNode;
  pageWidth?:
    | "sm"
    | "md"
    | "lg"
    | "full"
    | "xs"
    | "narrow"
    | "narrower"
    | "narrowest";
}

const MainNavigationExternal = ({
  productName,
  primaryLanguage,
  languageList,
  username,
  pageWidth = "full",
  components = {},
  userImage,
  userDetails,
  children,
}: MainNavigationExternalProps) => {
  const { prefix } = useSettings();
  const ref = useRef<HTMLDivElement | null>(null);
  const navTogglable = useTogglable();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        navTogglable.isOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        navTogglable.close();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [navTogglable.isOpen]);

  const defaultComponents = {
    LanguageExternal,
    UserExternal,
  };

  const c = { ...defaultComponents, ...components };

  return (
    <header className={`${prefix}--main-navigation-ext`}>
      <Wrapper
        pageWidth={pageWidth}
        className={`${prefix}--main-navigation-ext__wrapper`}
      >
        <div className={`${prefix}--main-navigation-ext__branding`}>
          <div className={`${prefix}--main-navigation-ext__wfp-logo`}>
            <WfpLogoVerticalEn
              className={`${prefix}--main-navigation-ext__wfp-logo-svg`}
              alt="WFP"
              width="100%"
            />
          </div>
          <div className={`${prefix}--main-navigation-ext__product-name`}>
            {productName}
          </div>
        </div>
        <div className={`${prefix}--main-navigation-ext__main`}>
          <div className={`${prefix}--main-navigation-ext__settings`}>
            <c.LanguageExternal primaryLanguage={primaryLanguage}>
              {languageList}
            </c.LanguageExternal>
            <c.UserExternal username={username} userImage={userImage}>
              {userDetails}
            </c.UserExternal>
          </div>
          <div className={`${prefix}--main-navigation-ext__nav`} ref={ref}>
            <div
              className={`${prefix}--main-navigation-ext__mobile-menu-button`}
            >
              <Button
                kind="tertiary"
                small
                onClick={() =>
                  navTogglable.isOpen
                    ? navTogglable.close()
                    : navTogglable.open()
                }
              >
                Menu
              </Button>
            </div>
            <div
              className={`${prefix}--main-navigation-ext__nav-wrapper
            ${navTogglable.isOpen ? "wfp--main-navigation-ext--is-shown" : ""}`}
            >
              {/* This nav can include both links and buttons */}
              <nav
                className={`${prefix}--main-navigation-ext__site-nav ${
                  navTogglable.isOpen
                    ? "wfp--main-navigation-ext--is-shown"
                    : ""
                }`}
              >
                <ul className={`${prefix}--main-navigation-ext__site-nav-list`}>
                  {children}
                  <div
                    className={`${prefix}--main-navigation-ext__mobile-settings`}
                  >
                    <li className={`${prefix}--main-navigation-ext__site-link`}>
                      <LanguageExternal primaryLanguage={primaryLanguage}>
                        {languageList}
                      </LanguageExternal>
                    </li>
                    <li className={`${prefix}--main-navigation-ext__site-link`}>
                      <UserExternal username={username} userImage={userImage}>
                        {userDetails}
                      </UserExternal>
                    </li>
                  </div>
                </ul>
              </nav>
              {/* To show if the user is a guest */}
              {/* <nav className={`${prefix}--main-navigation-ext__auth`}>
                <ul className={`${prefix}--main-navigation-ext__auth-list`}>
                  <li className={`${prefix}--main-navigation-ext__auth-action`}>
                    <Button kind="accent" small>
                      Register
                    </Button>
                  </li>
                  <li className={`${prefix}--main-navigation-ext__auth-action`}>
                    <Button kind="primary" small>
                      Sign in
                    </Button>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

MainNavigationExternal.propTypes = {
  /**
   * The name of your product can be applied to this prop
   */
  productName: PropTypes.node,

  /**
   * The CSS class name to be placed on the wrapping element.
   */
  className: PropTypes.string,

  /**
   * List of laguages your site support
   */
  languageList: PropTypes.node,

  /**
   * The name of signed in user can be applied to this prop
   */
  username: PropTypes.node,

  /**
   * The image of signed in user can be applied to this prop
   */
  userImage: PropTypes.string,

  /**
   * The dropdown details of user can be applied to this prop
   */
  userDetails: PropTypes.node,

  /**
   * This prop accepts the first language your website is in. Default: English
   */
  primaryLanguage: PropTypes.string,
};

MainNavigationExternal.defaultProps = {
  primaryLanguage: "English",
};

export default MainNavigationExternal;
