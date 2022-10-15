#ISSUE SOLUTIONS

##Visual Studio Code can't resolve tsconfig.json compilerOptions.paths settings

- Open **_Command Palette_** (Cmd+Shift+P) and select TypeScript: select TypeScript Version ...
- Select to use Workspace Version
- Or Open **_Command Palette_** and select TypeScript: Restart TS Server

##Fixed msw issue: Did you mean to import @mswjs/interceptors/lib/interceptors/ClientRequest/index.js?

[links](https://pullanswer.com/questions/with-msw-unhandledrejection-error-err_unsupported_dir_import)

next.config.js:

```
  experimental: {
    esmExternals: false,
  },
```

##Tell VSCode to auto-fix eslint errors on save

```
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

##Nextjs component is rendering twice?

This issue is about React 18 Strict Mode, see [https://github.com/vercel/next.js/issues/35822](https://github.com/vercel/next.js/issues/35822)

```
// next.config.js
reactStrictMode: false
```
