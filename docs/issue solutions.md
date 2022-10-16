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

##NextJS export with getServerSideProps

[https://github.com/vercel/next.js/discussions/15674](https://github.com/vercel/next.js/discussions/15674)

see `server-side-render.tsx`

##Error: Image Optimization using Next.js' default loader is not compatible with `next export`.

```
// next.config.js
module.exports = {
    images: {
        unoptimized: true
    }
}
```

##.env.development TypeError: Cannot read properties of undefined (reading 'split')

[solution](https://github.com/motdotla/dotenv-expand/issues/65)

```
// .env.development

RANDOM_TEXT=YHDNWD*@DN$
# change to:
RANDOM_TEXT=YHDNWD*@DN\$
```
