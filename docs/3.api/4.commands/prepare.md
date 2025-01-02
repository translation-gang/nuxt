---
title: 'nuxi prepare'
description: Команда prepare создает директорию .nuxt в вашем приложении и генерирует типы.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxi prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName]
```
<!--/prepare-cmd-->

Команда `prepare` создает директорию [`.nuxt`](/docs/guide/directory-structure/nuxt) в вашем приложении и генерирует типы. Это может быть полезно в среде CI или в качестве команды `postinstall` в вашем [`package.json`](/docs/guide/directory-structure/package).

## Arguments

<!--prepare-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/prepare-args-->

## Options

<!--prepare-opts-->
Параметр  | По умолчанию | Описание
--- | --- | ---
`--dotenv` |  | Path to `.env` file to load, relative to the root directory
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--envName` |  | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server)
<!--/prepare-opts-->
