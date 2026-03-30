---
title: 'nuxt prepare'
description: Команда prepare создаёт каталог .nuxt в приложении и генерирует типы.
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

Команда `prepare` создаёт каталог [`.nuxt`](/docs/4.x/directory-structure/nuxt) в приложении и генерирует типы. Полезно в CI или как команда `postinstall` в [`package.json`](/docs/4.x/directory-structure/package).

## Аргументы

<!--prepare-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/prepare-args-->

## Опции

<!--prepare-opts-->
| Опция                                | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                                                                                          |
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--envName`                          |         | Окружение для применения переопределений конфигурации (по умолчанию `production` при сборке и `development` при запуске dev-сервера) |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                                                                                             |
<!--/prepare-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::
