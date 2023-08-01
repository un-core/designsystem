# World Food Programme UI Kit (WFP-UI)

## **[Click here to visit: Living Style Guide & Documentation](https://wfp.org/UIGuide)**

| Branch | Build Status                                                                                                                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| master | [![Build Status](https://dev.azure.com/worldfoodprogramme/ui/_apis/build/status/wfp.ui?repoName=wfp%2Fdesignsystem&branchName=master)](https://dev.azure.com/worldfoodprogramme/ui/_build/latest?definitionId=242&repoName=wfp%2Fdesignsystem&branchName=master)() |
| next   | [![Build Status](https://dev.azure.com/worldfoodprogramme/ui/_apis/build/status/wfp.ui?repoName=wfp%2Fdesignsystem&branchName=next)](https://dev.azure.com/worldfoodprogramme/ui/_build/latest?definitionId=242&repoName=wfp%2Fdesignsystem&branchName=next)       |

## ![Usage](https://cdn.wfp.org/guides/ui/v1.2.0/assets/internal/toolkit.svg 'Usage') Usage

### Installation

Information about the installation can be found in the [online documentation](https://www.designsystem.wfp.org/posts/documentation/developing/installation).

### Development

#### WARNING: This branch is experimental and in current development. Things could easily break!

### Contribution Guidelines

Please refer to the [Contribution Guidelines](./.github/CONTRIBUTING.md) before starting any work.

### Installing the monorepo

Requirements: `node.js 14.x`, `yarn 1.x`
Use the `feat/` branches for active development.

Clone the `develop` branch for the un-core monorepo. TODO: Update Branch naming

The project is using a `lerna/yarn` mono repository for development. Make sure you have [yarn](https://yarnpkg.com/) installed globally on your machine.

```bash
git clone --branch develop https://github.com/wfp/designsystem.git
yarn install
yarn build
```

For developing on Windows please use WSL by following this guide: https://github.com/carbon-design-system/carbon/blob/b5d615e05bc1c062337e8aca3a84e25a6f49b559/docs/guides/setup/windows.md

### BREAKING CHANGES: Upgrade to 2.0 for existing solutions

In version 2.0 some paths will change due to the new monorepo architecture.

- `<Icon icon={iconName} />` becomes `<IconName />` imported from `import { IconName } from @wfp/icons-react``
- `import { Component } from "@wfp/react"` becomes `import { Component } from "@wfp/react"`
- `@import '@wfp/react/scss/globals/scss/styles.scss';` becomes `@import '@wfp/TODO:DEFINEPACKAGENAME';"`
- Multiple variables like `$ui-01` becomes `$layer` to provide better readability. A full list can be found here. TODO:ENTERURLTOCOLOURS
- `inputRef` is deprecated. Use `ref` instead.

### Packages

All packages can be found inside `packages/`.

- `figma connect`: Downloading assets and color values from the Figma library no longer used, now themes!
- `fonts`: All Fonts used by WFP
- `humanitarian-icons`: OCHA humanitarian icons customized by the Publications Unit of wfp
- `humanitarian-icons-react`: React package of the humanitarian icons
- `layout`: breakpoints, spacings, etc. no longer used, now themes!
- `pictograms`: pictogram icons
- `icons` all icons
- `icons-core` tools to generate `icons`, `pictograms` and `humanitarian-icons`
- `icons-react` the react package of the icons
- `colors` no longer used!
- `styles`: all components styles
- `themes`: theming (colors, etc.) TODO: move to themes-core
- `type`: typescales no longer used!
- `react`: the react components

### UN Core Examples

All Examples can be found in `wfp/`.

### Documentation & list of components available

View available Components [here](https://wfp.org/UIGuide). Usage information is available when you click the blue **Show Info** icon in the top right corner of the selected component.

## ![About](https://cdn.wfp.org/guides/ui/v1.2.0/assets/internal/branding.svg 'About') About the WFP UI Guidelines

The new WFP UI Kit is based on the [World Food Programme’s Branding Guidance](http://brand.manuals.wfp.org/) WFP's new branding was launched in early 2018 and will be implemented across the organization, strengthening WFP’s brand image through consistent representation.

Building on this initiative, the World Food Programme’s User Interface Style Guide emphasizes WFP’s commitment to establish and build the brand.

## ![Purpose](https://cdn.wfp.org/guides/ui/v1.2.0/assets/internal/usability.svg 'Purpose') Purpose

The purpose of this project is to create a unified toolkit that is used by UX-designers and developers alike on their projects to ensure all WFP-branded projects are accessible, appealing, and have a consistent look and feel across the board by following WFP’s design and implementation guidelines.

The guidelines contained in this guide are to be applied to all WFP digital products (such as: websites, web applications, internal systems and other).

By unifiying design elements into reusable components, development will simplify and accelerate the development of these digital products.

The Guide is a living document created to meet the needs of WFP’s front-end developers and designers. If there is a Component or Pattern that you need, or you have any other feedback, question or comment please contact us.

### Using the server

We recommend the use of [React Storybook](https://github.com/storybooks/react-storybook) for developing components.

1. Generate new tests

```
npm run test
```

2. Start the server:

```
npm run storybook
```

3. Open browser to `http://localhost:9000/`.
4. Develop components in the `/components` folder. Add the export to `index.js` to include them into the build.
5. Write stories for your components in `/.components` with `.stories.js` or `stories.mdx` ending.

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org) for commit messages and pre-commit hooks for commiting.

Make sure your commit does not produce any errors while checking:

- ESlint
- jest tests
- correct commit message

### Testing

Use jest for testing the components. Once commited the branches will be also tested on [Travis CI](https://travis-ci.org/wfp/ui).

```
npm run test
```

### Deployment

The UN Core uses Azure Devops, yarn, lerna and [semver](https://github.com/lerna/lerna/tree/main/commands/version) for automated versioning and the deployment.

#### npm release

- Commits on the `master` branch will be released as `@lastest` if a relevant commit is included (e.g. feat, fix, perf, breaking)
- Commits on `next` branch will be released as `@next` if a relevant commit is included

### Generate and release an alpha from a local machine

```
yarn publish:alpha-cli

or
git push --follow-tags origin next && npm publish --tag alpha
```

To publish local changes directly to a alpha release on npm.

### Credits

[View Credits](https://www.designsystem.wfp.org/posts/support/credits)
