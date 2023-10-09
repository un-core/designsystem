import React, { FC } from "react";
import "./storybook.scss";
import theme from "./theme";
import { UNCoreProvider } from "../src/components/UNCoreSettings";

import { themes, ensure } from "@storybook/theming";

import "@fontsource-variable/open-sans/wdth.css";

export const parameters = {
  controls: { expanded: true },
  docs: {
    //components: { ...mdxComponents },
    theme: theme,
    //theme: ensure(themes.dark),
    //page: DocsPage,
  },
  previewTabs: {
    "storybook/docs/panel": {
      index: -1,
      title: "Documentation",
    },
    canvas: { title: "Code", hidden: false },
  },
  options: {
    storySort: {
      order: [
        "Getting started",
        [
          "Intro",
          "Installing the Kit",
          "Using the Kit",
          "Recommended libraries",
          "Design resources",
          "Browser support",
          "What's new",
          "Support and Feedback",
          "Credits",
        ],
        "Documentation",
        "Templates",
        "Components",
      ],
    },
  },
};

/*
export const globalTypes = {
  theme: {
    title: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
  locale: {
    title: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ltr', title: 'left-to-right' },
        { value: 'rtl', title: 'right-to-left' },
      ],
    },
  },
};*/

const withThemeProvider = (Story, context) => {
  const { locale, theme } = context.globals;
  document.body.classList.remove(
    `wfp--theme-${theme === "light" ? "dark" : "light"}`
  );
  document.body.classList.add(`wfp--theme-${theme}`);
  return (
    <div
      className={`wfp--theme-${theme} wfp--theme-${locale}`}
      dir={locale === "rtl" ? "rtl" : null}
    >
      <Story {...context} />
    </div>
  );
};

const withUNCoreProvider = (Story) => (
  <UNCoreProvider prefix="wfp">
    <Story />
  </UNCoreProvider>
);

export const decorators = [withThemeProvider, withUNCoreProvider];
