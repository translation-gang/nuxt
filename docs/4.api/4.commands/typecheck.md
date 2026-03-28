---
title: "Проверка типов (nuxt typecheck)"
description: Запускает vue-tsc для проверки типов приложения.
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxt typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>]
```
<!--/typecheck-cmd-->

Команда `typecheck` вызывает [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) и проверяет типы во всём приложении (включая шаблоны `.vue`).

## Аргументы

<!--typecheck-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/typecheck-args-->

## Опции

<!--typecheck-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
<!--/typecheck-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в файле [`.env`](/docs/3.x/directory-structure/env) или в командной строке.
::

::read-more{to="/docs/3.x/guide/concepts/typescript#type-checking"}
Подробнее о включении проверки типов при сборке или в режиме разработки.
::
