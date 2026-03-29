---
title: "nuxt test"
description: Команда test запускает тесты через @nuxt/test-utils.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/test.ts
    size: xs
---

<!--test-cmd-->
```bash [Terminal]
npx nuxt test [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dev] [--watch]
```
<!--/test-cmd-->

Команда `test` запускает тесты через [`@nuxt/test-utils`](/docs/getting-started/testing). Если `NODE_ENV` ещё не задан, выставляется `process.env.NODE_ENV` в `test`.

## Аргументы

<!--test-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/test-args-->

## Опции

<!--test-opts-->
| Опция                               | По умолчанию | Описание                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--dev`                              |         | Режим разработки                                                                  |
| `--watch`                            |         | Режим наблюдения                                                                       |
<!--/test-opts-->

::note
Команда выставляет `process.env.NODE_ENV` в `test`.
::
