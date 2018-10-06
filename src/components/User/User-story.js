import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { withReadme } from 'storybook-readme';
import readme from './README.md';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import User from '../User';

const types = {
  '': 'None',
  email: 'For email (email)',
  password: 'For password (password)',
};

const UserProps = () => ({
  alt: text('Alternative Text (alt)', 'The Alt Text'),
  ellipsis: boolean('Ellipsis (ellipsis)', false),
  className: 'some-class',
  image: text('Image (image)', undefined),
  name: text('User name (name)', 'Max Mustermann'),
  small: boolean('Small (small)', false)
});

storiesOf('User', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme([readme]))
  .add(
    'Default',
    withInfo({
      text: `
        The User Icon is used inside the MainNavigation and can display an Avatar and Username.
      `,
    })(() => <User {...UserProps()} />)
  );
