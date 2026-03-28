---
title: "nuxt test"
description: Запуск тестов через @nuxt/test-utils.
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

Команда `test` запускает тесты через [`@nuxt/test-utils`](/docs/3.x/getting-started/testing).

## Аргументы

<!--test-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/test-args-->

## Опции

<!--test-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--dev` |  | Режим разработки
`--watch` |  | Режим наблюдения (перезапуск при изменениях)
<!--/test-opts-->

::note
Если `NODE_ENV` не задан, команда выставляет `process.env.NODE_ENV` в `test`.
::

::read-more{to="/docs/3.x/getting-started/testing"}
Настройка Vitest, `@nuxt/test-utils` и сценарии e2e.
::
