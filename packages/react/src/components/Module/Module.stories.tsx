import React from "react";
import markdown from "./README.mdx";
import Module from "./Module";
import ModuleHeader from "./ModuleHeader";
import ModuleBody from "./ModuleBody";
import ModuleFooter from "./ModuleFooter";

export default {
  title: "Components/Content Related/Module",
  component: Module,
  subcomponents: { ModuleHeader, ModuleBody, ModuleFooter },
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
  },
};

export const ModuleDefault: Story = {
  render: (args) => (
    <Module {...args}>
      <ModuleHeader>Module example</ModuleHeader>
      <ModuleBody>
        <p>
          Lorem Ipsum is dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
      </ModuleBody>
      <ModuleFooter>Module footer</ModuleFooter>
    </Module>
  ),
  args: {},
};

export const ModuleHeaderDefault: Story = {
  render: (args) => <ModuleHeader {...args}>ModuleHeader example</ModuleHeader>,
};

export const ModuleBodyDefault: Story = {
  render: (args) => <ModuleBody {...args}>Modulebody example</ModuleBody>,
};

export const ModuleFooterDefault: Story = {
  render: (args) => <ModuleFooter {...args}>ModuleFooter example</ModuleFooter>,
};

export const ModuleDarkDefault: Story = {
  render: (args) => (
    <Module dark>
      <ModuleHeader>Dark module example</ModuleHeader>
      <ModuleBody>
        <p>
          Lorem Ipsum is dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </ModuleBody>
      <ModuleFooter>Module footer</ModuleFooter>
    </Module>
  ),
};

export const ModuleLightDefault: Story = {
  render: (args) => (
    <Module dark>
      <ModuleHeader>Dark module example</ModuleHeader>
      <ModuleBody>
        <p>
          Lorem Ipsum is dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </ModuleBody>
      <ModuleFooter>Module footer</ModuleFooter>
    </Module>
  ),
};

export const ModuleWithHoverDefault: Story = {
  render: (args) => (
    <Module light withHover>
      <ModuleBody>
        <p>
          Lorem Ipsum is dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </ModuleBody>
    </Module>
  ),
};
