---
title: "nuxi init"
description: Команда init инициализирует новый проект Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npx nuxi init [DIR] [--cwd=<directory>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager]
```
<!--/init-cmd-->

Команда `init` инициализирует новый проект Nuxt, используя [unjs/giget](https://github.com/unjs/giget).

## Arguments

<!--init-args-->
Argument | Description
--- | ---
`DIR=""` | Project directory
<!--/init-args-->

## Options

<!--init-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | Specify the working directory
`-t, --template` |  | Template name
`-f, --force` |  | Override existing directory
`--offline` |  | Force offline mode
`--preferOffline` |  | Prefer offline mode
`--no-install` |  | Skip installing dependencies
`--gitInit` |  | Initialize git repository
`--shell` |  | Start shell after installation in project directory
`--packageManager` |  | Package manager choice (npm, pnpm, yarn, bun)
<!--/init-opts-->

## Переменные окружения

- `NUXI_INIT_REGISTRY`: Установить пользовательский реестр шаблонов. ([Узнать больше](https://github.com/unjs/giget#custom-registry)).
  - Реестр по умолчанию загружается из [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)
