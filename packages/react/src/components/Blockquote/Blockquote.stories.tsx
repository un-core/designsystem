import React from 'react';
import Blockquote from '.';
import Button from '../Button';
import { AddOutline } from '@un/icons-react';
import markdown from './README.mdx';
import blockquoteTwig from './Blockquote.twig';

const props = {
  children: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
};

// const kinds = {
//   'Info (info)': 'info',
//   'Warning (warning)': 'warning',
//   'Error (error)': 'error',
//   'Success (success)': 'success',
// };

export default {
  title: 'Components/Content Related/Blockquote',
  component: Blockquote,
  parameters: {
    componentSubtitle: 'Component',
    status: 'released',
    mdx: markdown,
    twig: blockquoteTwig,
  },
};

export const Default = (args) => <Blockquote {...args} />;

Default.args = {
  ...props,
};

Default.argTypes = {
  kind: {
    control: {
      type: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
  },
};

// export const toogleable = (args) => <Blockquote {...args} />;

// toogleable.args = {
//   ...props,
//   kind: 'info',
//   title: 'Title',
//   toggleable: true,
// };

// toogleable.story = {
//   parameters: {
//     docs: {
//       storyDescription: `Use \`toogleable\` property to show and hide blockquote when title is clicked`,
//     },
//   },
// };

export const light = (args) => <Blockquote {...args} />;

light.args = {
  ...props,
  light: true,
  title: 'Title',
};

light.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`light\` property to display light version of blockquote`,
    },
  },
};

export const Warning = (args) => <Blockquote {...args} />;

Warning.args = {
  ...props,
  withIcon: true,
  kind: 'warning',
};

Warning.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`warning\` for showing a warning to draw attention to a non-blocking information`,
    },
  },
};

export const Error = (args) => <Blockquote {...args} />;

Error.args = {
  ...props,
  withIcon: true,
  kind: 'error',
};

Error.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`error\` for showing a error message usually if a form fails to submit`,
    },
  },
};

export const Success = (args) => <Blockquote {...args} />;

Success.args = {
  ...props,
  withIcon: true,
  kind: 'success',
};

Success.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`success\` for showing a successful message like after submitting a form`,
    },
  },
};

export const CustomIcon = (args) => <Blockquote {...args} />;

CustomIcon.args = {
  ...props,
  icon: <AddOutline height={48} width={48} />,
};

const customiconsourcecode = `
import { Blockquote,  Icon } from "@un/react";
import { AddOutlineGlyph } from '@un/icons-react';

<Blockquote icon={<AddOutlineGlyph height={48} width={48} />}>
 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</Blockquote>
`;

CustomIcon.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`icon\` to add custom icon to message`,
      source: {
        code: customiconsourcecode,
      },
    },
  },
};

export const Togglable = (args) => <Blockquote {...args} />;

Togglable.args = {
  ...props,
  title: 'Togglable title',
  toggleable: true,
};

Togglable.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`toogleable\` property to show and hide blockquote when title is clicked`,
    },
  },
};

export const WithButtons = (args) => (
  <Blockquote
    {...args}
    actionButtons={
      <>
        <Button>Accept</Button>
        <Button kind="danger--primary">Reject</Button>
      </>
    }
  />
);

WithButtons.args = {
  ...props,
  withIcon: true,
};

const withbuttonsourcecode = `
import { Blockquote, Button  } from "@un/react";

<Blockquote
  actionButtons={<><Button>Accept</Button><Button kind="danger--primary">Reject</Button></>}
  withIcon>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</Blockquote>
`;

WithButtons.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`actionButtons\` for showing buttons for inline dialogs`,
      source: {
        code: withbuttonsourcecode,
      },
    },
  },
};

export const Code = (args) => <Blockquote {...args} />;

Code.args = {
  ...props,
  code: true,
  children: `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Untitled</title>
      <meta name="description" content="This is an example of a meta description with a very long description so you have to scroll to the right to see the whole description.">
      <link rel="stylesheet" type="text/css" href="theme.css">
    </head>
    <body>
    </body>
  </html>`,
};

Code.story = {
  parameters: {
    docs: {
      storyDescription: `Use \`code\` property to show formated code`,
    },
  },
};
