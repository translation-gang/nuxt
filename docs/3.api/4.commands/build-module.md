---
title: 'nuxi build-module'
description: 'Команда Nuxt для сборки вашего модуля Nuxt перед публикацией.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build-module.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxi build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

Команда `build-module` запускает `@nuxt/module-builder` для генерации директории `dist` в вашем `rootDir`, который содержит полную сборку для вашего **nuxt-module**.

## Arguments

<!--build-module-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/build-module-args-->

## Options

<!--build-module-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--build` | `false` | Build module for distribution
`--stub` | `false` | Stub dist instead of actually building it for development
`--sourcemap` | `false` | Generate sourcemaps
`--prepare` | `false` | Prepare module for local development
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" color="gray" target="\_blank"}
Подробнее об `@nuxt/module-builder`.
::
