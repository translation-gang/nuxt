---
title: "nuxt build"
description: "Сборка приложения Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>]
```
<!--/build-cmd-->

Команда `build` создаёт директорию `.output` с приложением, сервером и зависимостями для production.

## Аргументы

<!--build-args-->
| Аргумент    | Описание                                        |
|-------------|-------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)         |
<!--/build-args-->

## Опции

<!--build-opts-->
| Опция                                | По умолчанию | Описание                                                                                    |
|--------------------------------------|--------------|---------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |              | Рабочая директория (приоритет над ROOTDIR)                                                 |
| `--logLevel=<silent\|info\|verbose>` |              | Уровень логирования при сборке                                                             |
| `--prerender`                        |              | Собрать Nuxt и пререндерить статические маршруты                                            |
| `--preset`                           |              | Пресет сервера Nitro                                                                        |
| `--dotenv`                           |              | Путь к `.env` относительно корня                                                            |
| `--envName`                          |              | Окружение для конфигурации                                                                  |
| `-e, --extends=<layer-name>`         |              | Подключить слой Nuxt                                                                        |
<!--/build-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`.
::

::note
При `--prerender` пресет всегда устанавливается в `static`.
::
