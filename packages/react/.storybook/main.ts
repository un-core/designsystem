import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react";
import { addons } from "@storybook/manager-api";

const config: StorybookConfig = {
  stories: ["../src/**/*stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  core: {},
  addons: [
    getAbsolutePath("@storybook/blocks"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
