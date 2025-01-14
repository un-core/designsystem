import React from "react";
import markdown from "./README.mdx";
import Search from ".";
import Button from "../Button";

export default {
  title: "Components/UI Elements/Search",
  component: Search,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
  },
};

export const SearchDefault: Story = {
  render: (args) => <Search {...args} />,
  args: {
    name: "search",
  },
};

export const SearchWithButton = (args) => (
  <div style={{ width: "50%", display: "flex" }}>
    <Search {...args} addonAfter={<div>AddonAfter</div>} />
    <Button kind="primary" style={{ margin: "0 0.5rem" }}>
      Apply search
    </Button>
  </div>
);

SearchWithButton.args = {
  name: "search",
  id: "butonsearch",
};

const AddonBefore = () => {
  return <div>Before</div>;
};

const AddonAfter = () => {
  return <div>After</div>;
};

export const SearchWithComponents = (args) => (
  <div style={{ width: "50%", display: "flex" }}>
    <Search
      {...args}
      components={{ AddonBefore, AddonAfter }}
      onChange={(e, value) => {
        console.log("onChange", e, value);
      }}
    />
    <Button kind="primary" style={{ margin: "0 0.5rem" }}>
      Apply search
    </Button>
  </div>
);

SearchWithButton.story = {
  parameters: {
    docs: {
      storyDescription: `You can add a button to initate search action`,
    },
  },
};

export const SmallSearch = (args) => <Search {...args} />;

SmallSearch.args = {
  kind: "small",
  id: "smallsearch",
};

SmallSearch.story = {
  parameters: {
    docs: {
      storyDescription: `There are diffent ways to render the \`Search\` input by changing the \`kind\` prop.`,
    },
  },
};

export const MainNavigationSearch = (args) => <Search {...args} />;

MainNavigationSearch.args = {
  kind: "main",
};

MainNavigationSearch.story = {
  parameters: {
    docs: {
      storyDescription: `The Search input for the mainnavigation`,
    },
  },
};
