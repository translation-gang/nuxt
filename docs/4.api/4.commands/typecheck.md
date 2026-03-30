---
title: "nuxt typecheck"
description: Команда typecheck запускает vue-tsc для проверки типов во всём приложении.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxt typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>]
```
<!--/typecheck-cmd-->

Команда `typecheck` запускает [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) для проверки типов во всём приложении.

## Аргументы

<!--typecheck-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/typecheck-args-->

## Опции

<!--typecheck-opts-->
| Опция                                | По умолчанию | Описание                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                      |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                         |
<!--/typecheck-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в файле [`.env`](/docs/4.x/directory-structure/env) или в аргументах командной строки.
::

::read-more{to="/docs/4.x/guide/concepts/typescript#type-checking"}
Как включить проверку типов при сборке или в режиме разработки.
::
