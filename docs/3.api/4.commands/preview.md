---
title: "nuxi preview"
description: Команда preview запускает сервер для предварительного просмотра вашего приложения после выполнения команды build.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxi preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [--dotenv]
```
<!--/preview-cmd-->

Команда `preview` запускает сервер для предварительного просмотра вашего приложения Nuxt после выполнения команды `build`. Команда `start` является псевдонимом для `preview`. При запуске приложения в продакшен обратитесь к разделу [Развертывание](/docs/getting-started/deployment).

## Arguments

<!--preview-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/preview-args-->

## Options

<!--preview-opts-->
Параметр   | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--envName` |  | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server)
`--dotenv` |  | Path to `.env` file to load, relative to the root directory
<!--/preview-opts-->

Эта команда устанавливает `process.env.NODE_ENV` в `production`. Для переопределения определите `NODE_ENV` в файле `.env` или в качестве аргумента командной строки.

::note
Для удобства в режиме предварительного просмотра ваш файл [`.env`](/docs/guide/directory-structure/env) будет загружен в `process.env`. (Однако в продакшене вам придется убедиться, что ваши переменные окружения установлены самостоятельно).
::
