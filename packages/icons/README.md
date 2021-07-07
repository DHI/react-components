<div align="left">

[![CI - icons](https://github.com/DHI/react-components/actions/workflows/main-icons.yml/badge.svg)](https://github.com/DHI/react-components/actions/workflows/main-icons.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
</div>
<h1 align="left">@dhi/icons</h1>

This package provides icons developed by the UI/UX department, as we are usually working with water-related and map-based apps. We reccommend using primarily the icons provided by [@material-ui/icons](https://material-ui.com/components/material-icons/)

This package is created using [TypeScript](https://www.typescriptlang.org/), built using [Yarn](https://classic.yarnpkg.com/en/) and bundled using [TSDX](https://tsdx.io/).

# The flow of adding a component

We are aiming for making it as easy as possible for a component to be added to the icons. However, the component needs to fulfill some minimum requirements:

* [x] The icon implements an element of the [DHI Design Guidelines](https://www.figma.com/file/pSfX5GNsa6xhKGbi3DWQtn/DHI-Official-Guidelines) or is otherwise generic enough in functionality and close enough to the DHI CVI that it is likely to find reuse in other projects.
* [x] The component needs to be reviewed by at least one of the maintainers.

## Installing the package

Generating a Personal Access token with GitHub - [More info](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

1. Visit Github.com &rarr; Your Profile (top right) &rarr; Settings.
2. Develop settings (bottom of sidebar)
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
npm install @dhi/icons

// with yarn
yarn add @dhi/icons
```

## Contributing

If you would like to contribute to our project, please read the [repository guidelines](./docs/CONTRIBUTING.md).

## Documentation

In order to use our components, you can import them like:

```
// with npm
npm install @dhi/icons

```
