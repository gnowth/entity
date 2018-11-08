# BP-React

## Getting started

### Project setup

Make sure to use node v10.13.0 and npm v6.4.1 or above

Install project dependencies:

```
npm install
```

Create your own local development settings by copying the production settings and editing the file to work ith your local setup.

```
cp settings/production.js settings/development.js
```

#### Run development server

```
npm start
```

#### Run linters

```
npm run lint
```

#### Create production build

```
npm run build
```

#### Serve dist directory

```
npm run serve-dist
```

#### Run tests

```
npm test
```

### Run storybook

```
npm run storybook
```

### Storybook

An example of stories is found at `.storybook/stories.jsx`

## TODO
1. packages: use closure for minification of packages
2. eslint: restore camelcase rule once it can be ignored in style.js
3. eslint: review config
