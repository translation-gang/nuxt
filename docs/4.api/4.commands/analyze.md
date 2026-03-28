---
title: "nuxt analyze"
description: "Анализ продакшен-бандла приложения Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

Команда `analyze` собирает Nuxt и анализирует продакшен-бандл (экспериментально).

## Аргументы

<!--analyze-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/analyze-args-->

## Опции

<!--analyze-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`--name=<name>` | `default` | Имя для этого запуска анализа
`--no-serve` |  | Не запускать сервер для просмотра результатов анализа
<!--/analyze-opts-->

::note
Команда выставляет `process.env.NODE_ENV` в `production`.
::

::read-more{to="/docs/3.x/guide/best-practices/performance"}
Рекомендации по уменьшению бандла и ускорению приложения.
::
