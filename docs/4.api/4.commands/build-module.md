---
title: 'nuxt build-module'
description: "Сборка модуля Nuxt перед публикацией."
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

Команда `build-module` запускает `@nuxt/module-builder` и создаёт директорию `dist` в `rootDir` с полной сборкой **nuxt-модуля**.

## Аргументы

<!--build-module-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)   |
<!--/build-module-args-->

## Опции

<!--build-module-opts-->
| Option                               | По умолчанию | Description                                                                      |
|--------------------------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория, имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                     |
| `--build`                            | `false` | Собрать модуль для распространения        |
| `--stub`                             | `false` | Заглушка dist для разработки             |
| `--sourcemap`                        | `false` | Генерировать sourcemap                   |
| `--prepare`                          | `false` | Подготовить модуль к локальной разработке |
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
Подробнее об `@nuxt/module-builder`.
::
