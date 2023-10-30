import type { StorybookConfig } from "@storybook/react";
import { addons } from "@storybook/manager-api";

const config: StorybookConfig = {
  stories: ["../src/**/*stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: [
    "@storybook/blocks",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
  },
  /*
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  */
  docs: {
    autodocs: true,
  },
};

addons.setConfig({
  panelPosition: "bottom",
});

export default config;
