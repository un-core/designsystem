import React from "react";

import Breadcrumb from ".";
import BreadcrumbHome from "../BreadcrumbHome";
//import { BreadcrumbHome, BreadcrumbItem } from "@wfp/react";
import BreadcrumbItem from "../BreadcrumbItem";

export default {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb,
  subcomponents: { BreadcrumbHome, BreadcrumbItem },
  parameters: {
    componentSubtitle: "Component",
    status: "released",
  },
};

export const BreadcrumbDefault: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <a href="/#">
          <BreadcrumbHome />
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem disableLink>Breadcrumb 3</BreadcrumbItem>
    </Breadcrumb>
  ),
  args: {},
};

export const BreadcrumbHomeDefault = (args) => <BreadcrumbHome {...args} />;

export const BreadcrumbItemDefault = (args) => (
  <BreadcrumbItem {...args}>
    <a>Breadcrumb Item</a>
  </BreadcrumbItem>
);
