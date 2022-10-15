#frontend-libraries-practices

##Install

* Create project

```
cd /xx
yarn create next-app --typescript
.
```


* Form validation

```
yarn add formik
yarn add yup
```

* Testing
	* Official Demo: [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app)

```
yarn add cypress --dev
```

* Redux

```
yarn add react-redux
yarn add @reduxjs/toolkit
yarn add redux-devtools-extension

## react-redux automatically installed @types/react-redux
// yarn add --dev @types/react-redux

## Redux Toolkit's configureStore function automatically sets up the thunk middleware by default
// yarn add redux-thunk
```

* Mock Service Worker - msw

```
yarn add msw --dev

## Data modeling and relation library for testing JavaScript applications.
yarn add @mswjs/data --save-dev

## create mockServiceWorker.js
npx msw init public/ --save
```

* prettier

[settings](https://prettier.io/docs/en/options.html)

```
yarn add --dev --exact prettier

## it will prevent conflicts between prettier and eslint rules.
yarn add --dev eslint-config-prettier

```

edit ```.vscode/settings.json```

```
// tell VSCode to auto-fix eslint errors on save
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

* Faker

[官网](https://fakerjs.dev/guide/usage.html)

```
yarn add @faker-js/faker --dev
```

* seedrandom

```
yarn add seedrandom
```

* date-fns

```
yarn add date-fns
```

* txtgen

Util for generating random sentences, paragraphs and articles in English

```
yarn add txtgen
```

* mock-socket

```
yarn add mock-socket
```

* axios

```
yarn add axios
```

* Sass

```
yarn add --dev sass
```

```
// next.config.js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

* cross-env

Run scripts that set and use environment variables across platforms


```
yarn add --dev cross-env
```

##QA