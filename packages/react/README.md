# BP-React

## Getting started

#### Project setup

Make sure to use node v8.2.1 and npm v5.3.0 or above

Install project dependencies:

```
npm install
```

Create your own local development settings by copying the production settings and editing the file to work with your local setup.

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

### stylelint
stylelint is temporarily disabled as it is causing errors
```
"lint": "npm run lint:js && npm run lint:css && npm run flow",
```


    // "@gnowth/entity-app": "0.0.1",
    // "@gnowth/entity-duck": "0.0.1",
    // "@gnowth/entity-duck-rest": "0.0.1",
    // "@gnowth/entity-duck-screen": "0.0.1",
    // "@gnowth/entity-form": "0.0.1",
    // "@gnowth/entity-widget": "0.0.1",
    // "@gnowth/higher-order-component": "0.0.1",
    // "@gnowth/prop-types": "0.0.1",
    // "@gnowth/ui": "0.0.1",
