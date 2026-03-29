---
title: "nuxt analyze"
description: "Анализирует продакшен-бандл приложения Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

Команда `analyze` собирает Nuxt и анализирует продакшен-бандл (экспериментально).

## Аргументы

<!--analyze-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/analyze-args-->

## Опции

<!--analyze-opts-->
| Опция                               | По умолчанию   | Описание                                                                      |
|--------------------------------------|-----------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |           | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |           | Уровень логирования при сборке                                                     |
| `--dotenv`                           |           | Путь к `.env` относительно корня проекта                      |
| `-e, --extends=<layer-name>`         |           | Подключить слой Nuxt                                                         |
| `--name=<name>`                      | `default` | Имя запуска анализа                                                             |
| `--no-serve`                         |           | Не поднимать сервер с результатами анализа                                                |
<!--/analyze-opts-->

::note
Команда выставляет `process.env.NODE_ENV` в `production`.
::
