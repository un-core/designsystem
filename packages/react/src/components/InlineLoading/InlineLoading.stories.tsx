import React from "react";
import markdown from "./README.mdx";
import InlineLoading from ".";

export default {
  title: "Components/UI Elements/InlineLoading",
  component: InlineLoading,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
  },
};

export const InlineLoadingDefault: Story = {
  render: (args) => <InlineLoading {...args} />,
  args: {
    description: "submitting...",
  },
  parameters: {},
};

export const Success = (args) => <InlineLoading {...args}>Text</InlineLoading>;

Success.args = {
  success: true,
};

const successmsg = `
This is to show that loading has successfully completed
`;

Success.story = {
  parameters: {
    docs: {
      storyDescription: successmsg,
    },
  },
};
