![CI](https://github.com/DHI/react-components-ts/workflows/CI/badge.svg)

# React Components

The React Components collection is a TypeScript based collection of components used across a range of applications within DHI.

The intention with this library is include functionality rich components and not so much shallow UI components.

A lot of the components in this library are oriented towards providing easy to use off the shelf components for Domain Services backends, but this is not a requirement 

React-Components are demonstrated [here](https://domainservices.dhigroup.com/) and are available as npm package from Github packages.

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
