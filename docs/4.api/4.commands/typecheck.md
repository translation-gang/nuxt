---
title: "nuxt typecheck"
description: "Проверка типов в приложении через vue-tsc."
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

Команда `typecheck` запускает [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) для проверки типов в приложении.

## Аргументы

<!--typecheck-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)   |
<!--/typecheck-args-->

## Опции

<!--typecheck-opts-->
| Option                               | По умолчанию | Description                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория, имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня    |
| `-e, --extends=<layer-name>`        |         | Расширить слой Nuxt                        |
<!--/typecheck-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в [`.env`](/docs/4.x/directory-structure/env) или аргументом командной строки.
::

::read-more{to="/docs/4.x/guide/concepts/typescript#type-checking"}
Подробнее о включении проверки типов при сборке или в режиме разработки.
::
