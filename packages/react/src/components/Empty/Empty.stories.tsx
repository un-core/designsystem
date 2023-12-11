import React from "react";
import markdown from "./README.mdx";
import Empty from "./Empty";
import Button from "../Button";
//import { IllustrationsMovingVanWithBackground } from '@wfp/pictograms-react';

export default {
  title: "Components/UI Elements/Empty",
  component: Empty,
  parameters: {
    componentSubtitle: "Component",
    status: "experimental",
    mdx: markdown,
  },
};

export const EmptyDefault = (args) => (
  <Empty
    icon={<img alt="Moving van" src="../illustrations/moving-van.svg" />}
    {...args}
  />
);

EmptyDefault.args = {
  title: "No entries found",
  children: `You haven't yet created an entry`,
  kind: "large",
};

//   button: <Button kind="accent">New entry</Button>,
// icon: <IllustrationsMovingVanWithBackground alt="Moving van" width="25rem" />,

const emptysourcecode = `
import { Empty, Button  } from "@wfp/react";
import { IllustrationsMovingVanWithBackground } from '@wfp/pictograms-react';

<Empty
  button={<Button kind="accent">New entry</Button>}
  icon={<img alt="Moving van" src="../illustrations/moving-van.svg"/>}
  kind="large"
  title="No entries found"
>
  You haven't yet created an entry
</Empty>
`;
EmptyDefault.story = {
  parameters: {
    docs: {
      source: {
        code: emptysourcecode,
      },
    },
  },
};
