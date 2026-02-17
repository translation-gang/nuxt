---
title: 'nuxt prepare'
description: "Создание директории .nuxt и генерация типов."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxt prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>]
```
<!--/prepare-cmd-->

Команда `prepare` создаёт директорию [`.nuxt`](/docs/4.x/directory-structure/nuxt) и генерирует типы. Полезна в CI или как скрипт `postinstall` в [`package.json`](/docs/4.x/directory-structure/package).

## Аргументы

<!--prepare-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)    |
<!--/prepare-args-->

## Опции

<!--prepare-opts-->
| Опция                                  | По умолчанию | Описание                                                                                  |
|----------------------------------------|--------------|-------------------------------------------------------------------------------------------|
| `--dotenv`                              |              | Путь к файлу `.env` относительно корня                                                    |
| `--cwd=<directory>`                    |              | Рабочая директория (приоритет над ROOTDIR)                                                |
| `--logLevel=<silent\|info\|verbose>`    |              | Уровень логирования при сборке                                                            |
| `--envName`                             |              | Окружение для переопределения конфига (`production` при сборке, `development` при dev)   |
| `-e, --extends=<layer-name>`            |              | Расширить слой Nuxt                                                                       |
<!--/prepare-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`.
::
