---
title: "nuxi build"
description: "Собирает ваше приложение Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxi build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

Команда `build` создает директорию `.output` со всем вашим приложением, сервером и зависимостями, готовыми для продакшена.

## Arguments

<!--build-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/build-args-->

## Options

<!--build-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--prerender` |  | Build Nuxt and prerender static routes
`--preset` |  | Nitro server preset
`--dotenv` |  | Path to `.env` file to load, relative to the root directory
`--envName` |  | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server)
<!--/build-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::

::note
`--prerender` всегда будет устанавливать `preset` в `static`
::
