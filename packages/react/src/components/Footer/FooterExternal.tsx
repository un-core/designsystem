import * as React from "react";
import Wrapper from "../Wrapper";
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import { WfpLogoVerticalEn } from "@wfp/pictograms-react";
import {
  LinkedIn,
  Facebook,
  YouTube,
  TikTok,
  Twitter,
  Instagram,
} from "@wfp/icons-react";
import { ScreenSize } from "../../utils";

import useSettings from "../../hooks/useSettings";

type FooterExternalProps = PropsWithChildren<{
  className?: string;
  productName?: React.ReactNode;
  metaContent?: React.ReactNode;
  metaLinks?: React.ReactNode;
  pageWidth?: ScreenSize;
}>;

const FooterExternal: React.FC<FooterExternalProps> = ({
  className,
  productName,
  children,
  metaContent,
  pageWidth = "lg",
  metaLinks,
}) => {
  const { prefix } = useSettings();

  const externalClasses = classNames(`${prefix}--footer-ext`, className);
  return (
    <footer className={externalClasses}>
      <Wrapper pageWidth={pageWidth}>
        <div className={`${prefix}--footer-ext__content`}>
          <div className={`${prefix}--footer-ext__info`}>
            <div className={`${prefix}--footer-ext__branding`}>
              <WfpLogoVerticalEn
                alt="WFP"
                className={`${prefix}--footer-ext__logo`}
              />
              <div className={`${prefix}--footer-ext__product-name`}>
                {productName}
              </div>
            </div>
            <div className={`${prefix}--footer-ext__address`}>
              {metaContent}
            </div>
            <div className={`${prefix}--footer-ext__social-wrapper`}>
              <p>Follow WFP on:</p>
              <ul className={`${prefix}--footer-ext__social-icons-list`}>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://twitter.com/WFP"
                    target="_blank"
                    rel="noopener"
                  >
                    <Twitter />
                  </a>
                </li>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://www.facebook.com/WorldFoodProgramme"
                    target="_blank"
                    rel="noopener"
                  >
                    <Facebook />
                  </a>
                </li>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://www.instagram.com/Worldfoodprogramme/"
                    target="_blank"
                    rel="noopener"
                  >
                    <Instagram />
                  </a>
                </li>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://www.linkedin.com/company/world-food-programme"
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkedIn />
                  </a>
                </li>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://www.youtube.com/user/WORLDFOODPROGRAM"
                    target="_blank"
                    rel="noopener"
                  >
                    <YouTube />
                  </a>
                </li>
                <li className={`${prefix}--footer-ext__social-icon`}>
                  <a
                    href="https://www.tiktok.com/@worldfoodprogramme"
                    target="_blank"
                    rel="noopener"
                  >
                    <TikTok />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${prefix}--footer-ext__nav-wrapper`}>{children}</div>
        </div>
        <div className={`${prefix}--footer-ext__legal`}>
          <span>{new Date().getFullYear()} © World Food Programme</span>
          <nav className={`${prefix}--footer-ext__nav-legal`}>
            <ul className={`${prefix}--footer-ext__legal-links`}>
              {metaLinks}
            </ul>
          </nav>
        </div>
      </Wrapper>
    </footer>
  );
};

type LinksColumnProps = PropsWithChildren<{
  className?: string;
  title?: string;
}>;

const LinksColumn: React.FC<LinksColumnProps> = ({ title, children }) => {
  const { prefix } = useSettings();

  return (
    <div className={`${prefix}--links-column`}>
      {title && <p className={`${prefix}--links-column__title`}> {title} </p>}

      <nav>
        <ul className={`${prefix}--links-column__nav-list`}>{children}</ul>
      </nav>
    </div>
  );
};

export interface FooterMetaLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href?: string;
}

const FooterMetaLink: React.FC<FooterMetaLinkProps> = ({
  className,
  href,
  children,
}) => {
  const { prefix } = useSettings();

  const wrapperClasses = classNames(
    `${prefix}--footer-ext__legal-link`,
    className
  );
  return (
    <li className={wrapperClasses}>
      <a href={href}>{children}</a>
    </li>
  );
};

export { FooterExternal, LinksColumn, FooterMetaLink };
