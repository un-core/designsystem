import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { buttonKinds } from "../../prop-types/types";
import { AddCircle } from "@un/icons-react";
import markdown from "./README.mdx";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/UI Elements/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Component",
    status: "released",
    mdx: markdown,
    // twig: buttonTwig,
  },
};

// export default {
//   title: "Components/UI Elements/Button",
//   component: Button,
//   markdown: "hello",
//   parameters: {
//     componentSubtitle: "Component",
//     status: "released",
//     mdx: markdown,
//     // twig: buttonTwig,
//   },
// };

export default meta;
type Story = StoryObj<typeof Button>;

//export const ButtonDefault = (args) => <Button {...args}>Default</Button>;

export const ButtonDefault: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/jtKqyyMTOKgUTstiGvPZMl/?node-id=0%3A1",
    },
  },
};

export const PrimaryButton = (args) => (
  <>
    <Button {...args}>Default</Button> {""}
    <Button {...args} icon={AddCircle} iconReverse>
      With Icon
    </Button>{" "}
    <Button {...args} disabled>
      Disable
    </Button>
  </>
);

PrimaryButton.args = {
  kind: "primary",
};

export const SecondaryButton = (args) => (
  <>
    <Button {...args}>Default</Button> {""}
    <Button {...args} icon={AddCircle}>
      With Icon
    </Button>{" "}
    <Button {...args} disabled>
      Disable
    </Button>
  </>
);

SecondaryButton.args = {
  kind: "secondary",
};

export const GhostButton = (args) => (
  <>
    <Button {...args}>Default</Button> {""}
    <Button {...args} icon={AddCircle}>
      With Icon
    </Button>{" "}
    <Button {...args} disabled>
      Disable
    </Button>
  </>
);

GhostButton.args = {
  kind: "ghost",
};

export const ButtonSolid = (args) => (
  <div
    style={{
      width: "100%",
      height: "150px",
      backgroundColor: "#017DBC",
      padding: "20px",
    }}
  >
    {buttonKinds
      .filter((e) => e === "primary" || e === "secondary" || e === "ghost")
      .map((e) => (
        <div
          key={e}
          style={{
            display: "inline-block",
            padding: "0.3rem",
          }}
        >
          <Button {...args} kind={e} icon={AddCircle}>
            {e}
          </Button>{" "}
          <Button {...args} disabled kind={e}>
            {e} disable
          </Button>
        </div>
      ))}
  </div>
);

ButtonSolid.args = {
  kind: "primary",
  btnSolid: true,
};

ButtonSolid.parameters = {
  code: false,
};

const solidDesc =
  "This is how the different kinds of buttons look on solid background. Set`solid prop` to true to enable it";

ButtonSolid.parameters = {
  docs: {
    storyDescription: solidDesc,
  },
};

// const hello = `
// By changing the \`kind\` prop you can use different styles of the button.

// | kind   |  Description  |
// |----------|-------------|
// | \`primary\` | the principle call to action on the page |
// | \`secondary\` | secondary actions on each page   |
// | \`tertiary\` | simple actions on the page |
// | \`accent\` | very important actions and only once or twice on each page |
// | \`danger\` | a negative action (such as Delete) on the page |
// | \`danger--primary\` | a negative principle call to action (such as Delete) on the page |
// | \`ghost\` | in places where a regular button would draw too much attention and look similar to links |
// | \`inverse--primary\` | should be used on dark backgrounds |
// | \`inverse\` | should be used on dark backgrounds |
// | \`navigation\`| should be only used in the main navigation |
// `;

// ButtonKind.storyName = "Button kinds";
// ButtonKind.parameters = {
//   markdown: "hello",
//   layout: "centered",
//   docs: {
//     storyDescription: hello,
//   },
// };

// export const ButtonIcon = (args) => (
//   <>
//     <Button icon={AddCircle} kind="primary">
//       Button with icon
//     </Button>{" "}
//     <Button {...args} kind="primary" icon={AddCircle}></Button>{" "}
//     <Button {...args} iconReverse kind="secondary" icon={AddCircle}>
//       With iconReverse
//     </Button>{" "}
//     <Button href="#" icon={AddCircle} kind="ghost">
//       Button with icon link
//     </Button>
//   </>
// );

// const helloButtonIcon = `
// When words are not enough, icons can be used in buttons to better communicate what the button does. Icons should be
// always paired with text whenever possible.

// Use the \`icon\` and \`iconDescription\` prop to add an Icon to the Button. Refer to the [Icon](?selectedKind=Icon) documentation for usage.

// To show the Icon on the left side use the \`iconReverse\` prop.

// Using an Button with only an Icon while not beeing recommended can be achieved by leaving the Button text blank.
// `;

// const buttoniconsnippet = `
// import { Button } from '@wfp/react';
// import { AddCircleGlyph } from '@un/icons-react';

//   <>
//   <Button icon={AddCircleGlyph} kind="primary">
//     Button with icon
//   </Button>{' '}
//   <Button kind="tertiary" icon={AddCircleGlyph}></Button>{' '}
//   <Button iconReverse kind="tertiary" icon={AddCircleGlyph}>
//     With iconReverse
//   </Button>
//   </>
// `;

// ButtonIcon.parameters = {
//   docs: {
//     storyDescription: helloButtonIcon,
//     source: {
//       code: buttoniconsnippet,
//     },
//   },
// };
// ButtonIcon.storyName = "Button with icon";

// export const Small = (args) => (
//   <>
//     <Button kind="primary" small>
//       Small button
//     </Button>{" "}
//     <Button {...args} icon={AddCircle} kind="secondary" small>
//       With icon
//     </Button>
//   </>
// );

// const helloButtonSmall = `
// Small buttons may be used when there is not enough space for a
// regular sized button. This issue is most found in tables. Small button should have three words
// or less.
// `;

// const smallbuttonsnippet = `
// import { Button } from '@wfp/react';
// import { AddCircleGlyph } from '@un/icons-react';

//   <>
//     <Button small>Small button</Button>{' '}
//     <Button icon={AddCircleGlyph} kind="tertiary" small>
//       With icon
//     </Button>
//   </>
// `;

// Small.storyName = "small Button";
// Small.parameters = {
//   docs: {
//     storyDescription: helloButtonSmall,
//     source: {
//       code: smallbuttonsnippet,
//     },
//   },
// };

// export const Large = (args) => (
//   <>
//     <Button kind="primary" large>
//       Large button
//     </Button>
//   </>
// );

// const helloButtonLarge = `
// Small buttons may be used when there is not enough space for a
// regular sized button. This issue is most found in tables. Small button should have three words
// or less.
// `;

// const largebuttonsnippet = `
// import { Button } from '@wfp/react';
// import { AddCircleGlyph } from '@un/icons-react';

//   <>
//     <Button large>Large button</Button>{' '}
//     <Button {...args} icon={AddCircleGlyph} kind="tertiary" large>
//       With icon
//     </Button>
//   </>
// `;

// Large.storyName = "large Button";
// Large.parameters = {
//   docs: {
//     storyDescription: helloButtonLarge,
//     source: {
//       code: largebuttonsnippet,
//     },
//   },
// };

// const Icon = () => <div>Hello</div>;

// export const CustomIcon = () => (
//   <>
//     <Button large icon={Icon}>
//       Large button
//     </Button>
//   </>
// );

// // const CustomIconText = `
// // Small buttons may be used when there is not enough space for a
// // regular sized button. This issue is most found in tables. Small button should have three words
// // or less.
// // `;

// CustomIcon.storyName = "Custom Button";
