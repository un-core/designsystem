"use client";
import React, { useEffect } from "react";
import NextLink from "next/link";
import {
  Button,
  MainNavigationItem,
  BannerNavigation,
  MainNavigation,
  useTheme,
} from "@wfp/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Search from "../Search";

import styles from "./styles.module.scss";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
// import SidebarNavigation from "../Sidebar/SidebarNavigation";
export default function Navigation() {
  //const { t } = useTranslation('website');
  const theme: any = useTheme();

  useEffect(() => {
    const wrapperElement = document.body;
    const prefixClass = `wfp--theme--`;

    const classes = wrapperElement.className
      .split(" ")
      .filter((c) => !c.startsWith(prefixClass));

    wrapperElement.className = classes.join(" ").trim();
    wrapperElement.classList.add(`wfp--theme--${theme.actualTheme}`);
  });

  return (
    <>
      <BannerNavigation className={styles.bannerNavigation}>
        <span>🚧 This website is work in progress 👷</span>
      </BannerNavigation>
      <MainNavigation
        logo={<NextLink href="./">UN core</NextLink>}
        components={{
          LanguageExternal: () => null,
          UserExternal: () => null,
        }}
        className={styles.mainNavigation}
        pageWidth="full"
      >
        <MainNavigationItem>
          <NextLink href="/">Homepage</NextLink>
        </MainNavigationItem>
        <MainNavigationItem>
          <NextLink href="/documentation/overview">Resources</NextLink>
          {/* <SidebarNavigation path="documentation" /> */}
        </MainNavigationItem>
        <MainNavigationItem>
          <NextLink href="/components/overview">Components</NextLink>
        </MainNavigationItem>
        <MainNavigationItem>
          <NextLink href="/support/overview">Support</NextLink>
        </MainNavigationItem>

        <MainNavigationItem className={styles.darkModeSwitch}>
          <div className={styles.meta}>
            <Search />
            <Button
              kind="tertiary"
              onClick={(e) => {
                e.currentTarget.blur();
                theme.setTheme(theme.actualTheme === "dark" ? "light" : "dark");
              }}
            >
              {theme.actualTheme === "dark" ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </Button>

            <NextLink
              href="https://github.com/un-core/designsystem"
              target="_blank"
              legacyBehavior
            >
              <Button
                icon={<FontAwesomeIcon icon={faGithub} />}
                href="https://github.com/un-core/designsystem"
              >
                GitHub
              </Button>
            </NextLink>
          </div>
        </MainNavigationItem>
      </MainNavigation>
    </>
  );
}
