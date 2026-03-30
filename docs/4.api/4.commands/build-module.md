---
title: 'nuxt build-module'
description: 'Команда Nuxt для сборки модуля Nuxt перед публикацией.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxt build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

Команда `build-module` запускает `@nuxt/module-builder` и создаёт каталог `dist` в вашем `rootDir` с полной сборкой **nuxt-module**.

## Аргументы

<!--build-module-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/build-module-args-->

## Опции

<!--build-module-opts-->
| Опция                                | По умолчанию | Описание                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--build`                            | `false` | Собрать модуль для распространения                                                    |
| `--stub`                             | `false` | Заглушка dist вместо полноценной сборки для разработки                        |
| `--sourcemap`                        | `false` | Генерировать sourcemaps                                                              |
| `--prepare`                          | `false` | Подготовить модуль для локальной разработки                                             |
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
Подробнее о `@nuxt/module-builder`.
::
