---
title: "nuxt test"
description: "Запуск тестов через @nuxt/test-utils."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/test.ts
    size: xs
---

<!--test-cmd-->
```bash [Terminal]
npx nuxt test [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dev] [--watch]
```
<!--/test-cmd-->

Команда `test` запускает тесты через [`@nuxt/test-utils`](/docs/getting-started/testing). Устанавливает `process.env.NODE_ENV` в `test`, если не задано иначе.

## Аргументы

<!--test-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)   |
<!--/test-args-->

## Опции

<!--test-opts-->
| Опция                                  | По умолчанию | Описание                                  |
|----------------------------------------|--------------|-------------------------------------------|
| `--cwd=<directory>`                    |              | Рабочая директория (приоритет над ROOTDIR) |
| `--logLevel=<silent\|info\|verbose>`   |              | Уровень логирования при сборке            |
| `--dev`                                |              | Запуск в dev-режиме                       |
| `--watch`                              |              | Режим наблюдения за изменениями           |
<!--/test-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `test`.
::
