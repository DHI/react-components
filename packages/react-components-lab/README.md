<div align="left">

[![CI - lab](https://github.com/DHI/react-components/actions/workflows/main-lab.yml/badge.svg)](https://github.com/DHI/react-components/actions/workflows/main-lab.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
</div>
<h1 align="left">@dhi/react-components-lab</h1>

This package primarily serves as the incubator for components that are not yet ready to move to the core package/library.

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

This package is created using [TypeScript](https://www.typescriptlang.org/) and [MaterialUI](https://material-ui.com/), built using [Yarn](https://classic.yarnpkg.com/en/) and bundled using [TSDX](https://tsdx.io/).

# The flow of adding a component

We are aiming for making it as easy as possible for a component to be added to the lab. However, the component needs to fulfill some minimum requirements:

* [x] The component cannot be implemented by styling a Material-UI component via the theme (for instance `<Button />` or `<Typography />`). However, if the styling is complex enough and requires a lot of styling (for instance The `<Slider />` component), it can be evaluated.
* [x] The component implements an element of the [DHI Design Guidelines](https://www.figma.com/file/pSfX5GNsa6xhKGbi3DWQtn/DHI-Official-Guidelines) or is otherwise generic enough in functionality and close enough to the DHI CVI that it is likely to find reuse in other projects.
* [x] The component needs to be reviewed by at least one of the maintainers

# Showcase

Our library is showcased on the [Lab Storybook](https://green-glacier-08aae7903.azurestaticapps.net/)

## Installing the package

Generating a Personal Access token with GitHub - [More info](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

1. Visit Github.com &rarr; Your Profile (top right) &rarr; Settings.
2. Develop settings (bottom of sidebar).
3. Personal access tokens
4. "Generate new token"
5. Note: `GitHub Packages`
6. Tick: `repo, write:packages, read:packages, delete:packages, admin:repo_hook`
7. "Generate token"
8. Click clipboard icon to copy token
9. Open `C:\users\<username>\.npmrc` or create this file here if doesn't exist.
10. Paste within it, replacing `<AUTH_TOKEN>` with the token you copied moments ago.

```
@dhi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<AUTH_TOKEN>
```

<sup>(this file can also be created in project-scope via `.npmrc` in root, but it is not advised as it links to your personal access token.)</sup>

11. Now you may install DHI packages from GitHub Packages!

# Usage

You can simply import the package using `yarn` or `npm`.

```
// with npm
npm install @dhi/react-components-lab

// with yarn
yarn add @dhi/react-components-lab
```

## Contributing

If you would like to contribute to our project, please read the [repository guidelines](./docs/CONTRIBUTING.md).

## Documentation

In order to use our components, please follow the [documentation](https://storybooklab.z16.web.core.windows.net/).
