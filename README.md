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

## Making alterations to React Components

Yalc can be used to test components as you build them within your own projects.

Generate a GitHub token (following guide at the top of this page under "Installation").

Run to install tools globally:
```
npm i rimraf -g
npm i yalc -g
```
Run command in react-components root folder:
```
RC-TS> yarn build
RC-TS> yalc push
# @dhi/react-components@0.2.63+ae197119 published in store.
```
Run command in project folder:
```
project> yarn remove @dhi/react-components
project> yalc add @dhi/react-components
# Package @dhi/react-components@0.2.63+ae197119 added ==> H:\dev\projects\SOPX\MarineAid.FrontEnd\node_modules\@dhi\react-components.
```

Every time you make a change to the react-component, just re-run `yalc push` and it will auto-update working project!

_Note_ Once you have completed your development, ensure you `yalc remove @dhi/react-components` publish the package to the web and run `yarn add react-components` to ensure you've wired up to the production (public) package.