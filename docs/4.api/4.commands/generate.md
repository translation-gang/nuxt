---
title: "nuxt generate"
description: "Предварительный рендер всех маршрутов в статические HTML-файлы."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>]
```
<!--/generate-cmd-->

Команда `generate` пререндерит все маршруты приложения и сохранит результат в виде HTML-файлов для развёртывания на статическом хостинге. По сути запускает `nuxt build` с аргументом `prerender: true`.

## Аргументы

<!--generate-args-->
| Аргумент    | Описание                                        |
|-------------|-------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)         |
<!--/generate-args-->

## Опции

<!--generate-opts-->
| Опция                                | По умолчанию | Описание                                                                                    |
|--------------------------------------|--------------|---------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |              | Рабочая директория (приоритет над ROOTDIR)                                                 |
| `--logLevel=<silent\|info\|verbose>` |              | Уровень логирования при сборке                                                             |
| `--preset`                           |              | Пресет сервера Nitro                                                                        |
| `--dotenv`                           |              | Путь к `.env` относительно корня                                                            |
| `--envName`                          |              | Окружение для конфигурации                                                                  |
| `-e, --extends=<layer-name>`         |              | Подключить слой Nuxt                                                                        |
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
Подробнее о пререндеринге и статическом хостинге.
::
