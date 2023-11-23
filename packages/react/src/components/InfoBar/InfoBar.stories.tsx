import React from "react";
import markdown from "./README.mdx";
import InfoBar from ".";
import Link from "../Link";

export default {
  title: "Components/UI Elements/InfoBar",
  component: InfoBar,
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
  },
};

export const InfoBarDefault = (args) => (
  <InfoBar {...args}>
    InfoBar with content. <Link href="#">Click here</Link> to do Something.
  </InfoBar>
);

const infobarsourcecode = `
  import { InfoBar, Link  } from "@wfp/react";

  <InfoBar>
    InfoBar with content. 
    <Link href="#">
        Click here
    </Link>
     to do Something.
  </InfoBar>
`;

InfoBarDefault.story = {
  parameters: {
    docs: {
      source: {
        code: infobarsourcecode,
      },
    },
  },
};
