---
title: "nuxt analyze"
description: "Анализ production-бандла приложения Nuxt."
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
| Аргумент     | Описание                         |
|--------------|----------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/analyze-args-->

## Опции

<!--analyze-opts-->
| Опция                                  | По умолчанию | Описание                                                                 |
|----------------------------------------|--------------|---------------------------------------------------------------------------|
| `--cwd=<directory>`                     |              | Рабочая директория (имеет приоритет над ROOTDIR)                          |
| `--logLevel=<silent\|info\|verbose>`    |              | Уровень логирования при сборке                                            |
| `--dotenv`                              |              | Путь к файлу `.env` относительно корня                                    |
| `-e, --extends=<layer-name>`           |              | Расширить слой Nuxt                                                        |
| `--name=<name>`                         | `default`    | Имя анализа                                                               |
| `--no-serve`                            |              | Не запускать сервер с результатами анализа                                 |
<!--/analyze-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`.
::
