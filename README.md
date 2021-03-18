![CI](https://github.com/DHI/react-components-ts/workflows/CI/badge.svg)

# DHI | React Components

---

### Introduction

A few words about our culture. Code culture, as we call it. Culture between developers working together. The words describe an approach of how we can ensure a more streamlined setup across development teams in DHI. Of course, there must be room for our individual preferences, but we must also keep in mind that we work in an area that is constantly evolving. It is therefore very important that we have a common toolbox, so that we can continue the development in a more efficient way. Together.

---

### Challenge

Writing code is creative. As professional developers, we can choose from a wide range of options when building digital products for our departments. Depending on our environment, we can choose between different programming languages, just as we can structure the codebase by different principles - or more precisely; design patterns. When working with team-based development - without any common guidelines - there is a consequence of an increasing imbalance between projects, teams and developers. Every step we take as individuals has an impact on the surroundings.

That being said, we also have to be very careful when trying to conclude a common understanding of how a team should structure, organize and write code. It is all about human resources that strives to deliver solid and well-crafted products - every day. We work hard to get better - and it takes effort from everyone to follow.

---

### Solution

In a world of countless combinations of libraries and utilities, it is important that we stick together as a team. We have to work from a common understanding of how we organize our projects, so that we can deliver a more streamlined code across the organization. We are a unit of developers who must be able to take responsibility for each other's work - but we need a common language for that - and this is the beginning. We have established a common platform where good ideas can become shared components for the benefit of developers across DHI.

Have you ever built a component that you have used in several different contexts? If so, you very well have a good candidate for shared components. Every component starts in the lab stage, from where our advisory board reviews the particular feature and assesses the reusability for a greater common interest.

All contributions are welcome. Components as well as hooks and other utilities.

---

### Advisory board

- Elbys Jose Meneses (ejme)
- Franz Thomsen (frt)
- Graham O'Neale (gron)
- James Harper (jamh)
- Razvan Bertea (rabe)
- Rihards Rancans (rira)
- Sam Johnson (sajo)

...and you?

---

### Contributions

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
