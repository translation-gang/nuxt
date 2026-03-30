---
title: "nuxt analyze"
description: "Анализирует production-бандл вашего приложения Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

Команда `analyze` собирает Nuxt и анализирует production-бандл (экспериментально).

## Аргументы

<!--analyze-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/analyze-args-->

## Опции

<!--analyze-opts-->
| Опция                                | По умолчанию   | Описание                                                                      |
|--------------------------------------|-----------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |           | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |           | Уровень логирования при сборке                                                     |
| `--dotenv`                           |           | Путь к файлу `.env` относительно корня проекта                      |
| `-e, --extends=<layer-name>`         |           | Расширить конфигурацию слоем Nuxt                                                         |
| `--name=<name>`                      | `default` | Имя анализа                                                             |
| `--no-serve`                         |           | Не поднимать сервер с результатами анализа                                                |
<!--/analyze-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::
