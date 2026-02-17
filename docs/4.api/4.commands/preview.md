---
title: "nuxt preview"
description: "Сервер для предпросмотра приложения после сборки."
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

Команда `preview` запускает сервер для предпросмотра приложения после `build`. Команда `start` — алиас для `preview`. Для production см. [раздел «Развёртывание»](/docs/4.x/getting-started/deployment).

## Аргументы

<!--preview-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)   |
<!--/preview-args-->

## Опции

<!--preview-opts-->
| Опция                                  | По умолчанию | Описание                                                                                |
|----------------------------------------|--------------|-----------------------------------------------------------------------------------------|
| `--cwd=<directory>`                   |              | Рабочая директория (приоритет над ROOTDIR)                                              |
| `--logLevel=<silent\|info\|verbose>`   |              | Уровень логирования при сборке                                                          |
| `--envName`                            |              | Окружение для переопределения конфига                                                  |
| `-e, --extends=<layer-name>`           |              | Расширить слой Nuxt                                                                     |
| `-p, --port`                           |              | Порт (можно задать переменной окружения `PORT`)                                        |
| `--dotenv`                             |              | Путь к файлу `.env` относительно корня                                                  |
<!--/preview-opts-->

Команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в `.env` или аргументом командной строки.

::note
В режиме preview файл [`.env`](/docs/4.x/directory-structure/env) подхватывается в `process.env`. В production переменные окружения нужно задать самостоятельно (например, Node.js 20+: `node --env-file .env .output/server/index.mjs`).
::
