---
title: "Подготовка проекта (nuxt prepare)"
description: Создаёт каталог `.nuxt` в приложении и генерирует типы.
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxt prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName]
```
<!--/prepare-cmd-->

Команда `prepare` создаёт каталог [`.nuxt`](/docs/3.x/directory-structure/nuxt) и генерирует типы. Полезна в CI или как скрипт `postinstall` в [`package.json`](/docs/3.x/directory-structure/package).

## Аргументы

<!--prepare-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/prepare-args-->

## Опции

<!--prepare-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--envName` |  | Окружение для разрешения переопределений конфигурации (для сборки по умолчанию `production`, для dev-сервера — `development`)
<!--/prepare-opts-->

::note
Без каталога `.nuxt` автодополнение типов и часть проверок в IDE могут не работать — после клонирования репозитория обычно достаточно `pnpm install` (если в `postinstall` уже вызывается `nuxt prepare`) или однократно выполнить `nuxt prepare`.
::
