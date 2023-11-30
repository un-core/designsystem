import React from "react";
import markdown from "./README.mdx";
import { Accordion, AccordionItem } from ".";

export default {
  title: "Components/Navigation/Accordion",
  component: Accordion,
  parameters: {
    componentSubtitle: "Component",
    status: "experimental",
    mdx: markdown,
  },
};

export const AccordionDefault: Story = {
  render: (args) => (
    <Accordion {...args}>
      {[
        {
          header: "What is Lorem Ipsum?",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
        },
        {
          header: "Where does it come from?",
          content: "Quisque eget luctus mi, vehicula mollis lorem...",
        },
        {
          header: "Why do we use it?",
          content: "Suspendisse massa risus, pretium id interdum in...",
        },
      ].map(({ header, content }, i) => (
        <AccordionItem header={header} key={i}>
          {content}
        </AccordionItem>
      ))}
    </Accordion>
  ),
  args: {
    title: "Title",
  },
};
