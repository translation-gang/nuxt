---
title: 'nuxt build-module'
description: 'Команда Nuxt для сборки модуля перед публикацией.'
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
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/build-module-args-->

## Опции

<!--build-module-opts-->
| Опция                               | По умолчанию | Описание                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--build`                            | `false` | Собрать модуль для публикации                                                    |
| `--stub`                             | `false` | Заглушка `dist` вместо полной сборки (для разработки)                        |
| `--sourcemap`                        | `false` | Генерировать source maps                                                              |
| `--prepare`                          | `false` | Подготовить модуль к локальной разработке                                             |
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
Подробнее о `@nuxt/module-builder`.
::
