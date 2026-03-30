---
title: "nuxt test"
description: Команда test запускает тесты через @nuxt/test-utils.
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

Команда `test` запускает тесты с помощью [`@nuxt/test-utils`](/docs/getting-started/testing). Если `process.env.NODE_ENV` ещё не задан, команда выставляет его в `test`.

## Аргументы

<!--test-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/test-args-->

## Опции

<!--test-opts-->
| Опция                                | По умолчанию | Описание                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--dev`                              |         | Запуск в режиме разработки                                                                  |
| `--watch`                            |         | Режим слежения за файлами                                                                       |
<!--/test-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `test`.
::
