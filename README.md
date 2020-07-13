![CI](https://github.com/DHI/react-components-ts/workflows/CI/badge.svg)

# React Components

The React Components collection is a TypeScript based collection of components used across a range of application within DHI

React-Components are demonstrated [here](https://domainservices.dhigroup.com/) and are available as npm package from Github packages.

## Installing the package

Generating a Personal Access token with GitHub

1. Visit Github.com &rarr; Your Profile (top right) &rarr; Settings.
2. Develop settings (bottom of sidebar)
3. Personal access tokens
4. "Generate new token"
5. Note: `GitHub Packages`
6. Tick: `repo, write:packages, read:packages, delete:packages, admin:repo_hook`
7. "Generate token"
8. Click clipboard icon to copy token.
9. Open `C:\users\<username>\.npmrc` or create this file here if doesn't exist.
10. Paste within it, replacing `<AUTH_TOKEN>` with the token you copied moments ago.

```sh
@dhi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<AUTH_TOKEN>
```

<sup>(this file can also be created in project-scope via `.npmrc` in root, but it is not advised as it links to your personal access token.)</sup>

11. Now you may install DHI packages from GitHub Packages!

_"Generating a token" - [More info](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)_

## Getting started with development

The recommended workflow is to run TSDX in one terminal:

```
yarn
yarn start
```

To run Storybook

```
yarn
yarn start
yarn storybook
```
