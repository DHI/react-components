<div align="left">

[![CI - icons](https://github.com/DHI/react-components/actions/workflows/main-icons.yml/badge.svg)](https://github.com/DHI/react-components/actions/workflows/main-icons.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
</div>
<h1 align="left">@dhi/icons</h1>

This package provides icons primarily made by the UI/UX department, as we are usually working with water-related and map-based apps. We recommend primarily using the generic icons provided by [`@material-ui/icons`](https://material-ui.com/components/material-icons/). The icons here are either specialized or generic icons standardised by UI/UX.

This package uses [TypeScript](https://www.typescriptlang.org/) and [Yarn](https://classic.yarnpkg.com/en/)

# Adding icons

We are aiming for making it as easy as possible for more icons to be added. However, the icons need to fulfill some minimum requirements:

* [x] The icons are generic and close enough to the DHI CVI and is likely to find use in multiple projects.
* [x] The icons need to be reviewed by at least one of the maintainers.

Look up the [repository guidelines](./docs/CONTRIBUTING.md) for a more technical explanation.

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

Install the package with `yarn` or `npm`.

```
// with npm
npm install @dhi/icons

// with yarn
yarn add @dhi/icons
```

## Documentation

To use the icons, import them with the following syntax:

```
import Edit from "@dhi/icons/Edit;

// or

import { Edit } from "@dhi/icons";

// then use in JSX

<Edit color="#00A4EC" width={40} height={40}/>

```

For all props/attributes that can be added to icons see [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)  
These will be added to the upper `<svg>` element - elements such as `<path>` within it cannot be modified.  

## Contributing

If you would like to contribute to our project, please read the [repository guidelines](./docs/CONTRIBUTING.md).
