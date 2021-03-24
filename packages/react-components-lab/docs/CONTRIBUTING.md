First of all, welcome and thank you for contributing to our Storybook.

# About

The purpose of our `@dhi/react-components-lab` GitHub library is to host the components that are not yet ready to be added to the core library. Here, the components will leave for a certain amount if time until the components have been tested by our maintainers in terms of missing features, bugs, API design etc. The older and more used a component is, the less likely it is that new issues will be found.

# Setting up

To get started follow these steps:

- Clone the repository`.
- Install dependencies `yarn install`.
- Change your working directory to `packages/react-components-lab`

## ESLint

The package uses ESLint with the `airbnb-typescript` configuration, which enforces consistent code style and warns on possible errors.
Most editors support an ESLint plugin or extension. Enabling auto-fix on save may also be a good idea.

## Commits:

We are using the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for versioning our packages.

| Commit messages            | Release type           |
| -------------------------- | ---------------------- |
| fix(name): Commit message  | Patch Release 0.0.1    |
| feat(name): Commit message | Feature Release 0.1.0  |
| perf(name): Commit message | Breaking Release 1.0.0 |

This is not a requirement and should only be used when adding a change that needs to be reflected on the package itself. Each of these commits will trigger a specific semantic versioning action when in the pipeline, so use with precaution.

## Branch naming conventions

- `fix/branch-name` - When dealing with a bug or a quick-fix
- `feature/branch-name` - When dealing with a feature
- `docs/branch-name` - When dealing with the documentation

## Issues

When creating a new feature, firstly we have to create the need for it.
This is done by creating an issue and describing how does the feature improve our current lab package and what is the expected behaviour, assign somebody to it and label it accordingly.

In order for a component to be added, it needs to check a few boxes:

* [x] The component cannot be implemented by styling a Material UI component via the theme (for instance `<Button />` or `<Typography />`). However, if the styling is complex enough and requires a lot of styling (for instance The `<Slider />` component), it can be evaluated.
* [x] The component implements an element of the [DHI Design Guidelines](https://www.figma.com/file/pSfX5GNsa6xhKGbi3DWQtn/DHI-Official-Guidelines) or is otherwise generic enough in functionality and close enough to the DHI CVI that it is likely to find reuse in other projects.
* [x] The component needs to be reviewed by at least one of the maintainers.
## Component structure guidelines

The structure, style and conventions of a component should generally be as consistent as possible.
Some aspects are enforced by the ESLint configuration, but not all.
It may therefore be a good idea to take a look at the existing components and follow what's established there.

Early iterations of a component may still be acceptable as it can later be revised and stabilized once the component is to be moved to the core package.

Components must be as atomic as possible. If a child component could potentially be used independently, it should be its own component, not a sub-component.
Sub-components, along with their types and styles should always be exported.

## Pull Requests (PR)

When creating a PR, please explain what it does and make sure to link the relevant issues to it using the Github keywords or through the GUI.

Moreover, ensure that you are going through the PR template instructions.

## Dependencies, devDependecies and peerDependencies

- dependencies

Inside the `dependencies` we want to include all the production external libraries we are using. The whole concept around it is that when a developer installs our package, `npm` needs to know what other dependecies to install inside `node_modules`, without requiring the developer to install it inside it's own app dependencies.

- peerDependencies

The `peerDependencies` are the dependencies that the developers using our package need to install alongside our package.

- devDependencies

While developing, we are primarily using the `devDependencies` to develop the library. Any dependencies that are needed for the development should be added here.

## Testing

- to be added

Thank you for contributing!
