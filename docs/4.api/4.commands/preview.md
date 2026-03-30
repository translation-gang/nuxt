---
title: "nuxt preview"
description: Команда preview запускает сервер для предпросмотра приложения после сборки.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>] [-p, --port] [--dotenv]
```
<!--/preview-cmd-->

Команда `preview` запускает сервер для предпросмотра приложения Nuxt после `build`. Команда `start` — псевдоним для `preview`. Для production-см. раздел [Развёртывание](/docs/4.x/getting-started/deployment).

## Аргументы

<!--preview-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/preview-args-->

## Опции

<!--preview-opts-->
| Опция                                | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--envName`                          |         | Окружение для применения переопределений конфигурации (по умолчанию `production` при сборке и `development` при запуске dev-сервера) |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                                                                                             |
| `-p, --port`                         |         | Порт прослушивания (переопределяется переменной окружения `PORT`)                                                                                      |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                                                                                          |
<!--/preview-opts-->

Эта команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в `.env` или в аргументах командной строки.

::note
Для удобства в режиме предпросмотра файл [`.env`](/docs/4.x/directory-structure/env) загружается в `process.env`. (В production переменные окружения нужно задавать самостоятельно. Например, в Node.js 20+ можно запустить `node --env-file .env .output/server/index.mjs`.)
::
