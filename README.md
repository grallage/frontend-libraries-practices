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


##QA