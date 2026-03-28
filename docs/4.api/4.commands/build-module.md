---
title: 'nuxt build-module'
description: 'Собирает модуль Nuxt перед публикацией.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxt build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

Команда `build-module` запускает `@nuxt/module-builder` и создаёт каталог `dist` в `rootDir` с полной сборкой вашего **nuxt-модуля**.

## Аргументы

<!--build-module-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/build-module-args-->

## Опции

<!--build-module-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--build` | `false` | Собрать модуль для публикации
`--stub` | `false` | Заглушка `dist` вместо полной сборки (для разработки)
`--sourcemap` | `false` | Генерировать source map
`--prepare` | `false` | Подготовить модуль к локальной разработке
<!--/build-module-opts-->

::note
Для ежедневной разработки модуля часто достаточно `--stub`; полную сборку (`--build`) выполняют перед публикацией в npm.
::

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
Репозиторий `@nuxt/module-builder`.
::

::read-more{to="/docs/3.x/guide/modules/getting-started"}
Создание и подключение собственных модулей Nuxt.
::
