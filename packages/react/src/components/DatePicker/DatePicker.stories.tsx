import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import markdown from "./README.mdx";
import DateRangePickerInput from "./DateRangePickerInput";

const meta: Meta<typeof Button> = {
  title: "Components/UI Elements/DatePicker",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DatePickerDefault: Story = {
  render: (args) => <DateRangePickerInput {...args} />,
  args: {
    children: "DatePicker",
  },
};
