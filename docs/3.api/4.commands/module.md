---
title: "nuxt module"
description: "Поиск и добавление модулей в приложение Nuxt с помощью командной строки."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/module/
    size: xs
---

Nuxt предоставляет несколько утилит для беспрепятственной работы с [модулями Nuxt](/modules).

## nuxt module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
Аргумент | Описание
--- | ---
`MODULENAME` | Module name
<!--/module-add-args-->

<!--module-add-opts-->
Параметр | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` | `.` | Specify the working directory
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--skipInstall` |  | Skip npm install
`--skipConfig` |  | Skip nuxt.config.ts update
`--dev` |  | Install module as dev dependency
<!--/module-add-opts-->

Эта команда позволяет установить [модули Nuxt](/modules) в ваше приложение без ручной работы.

При выполнении команды:

- установит модуль в качестве зависимости с помощью вашего менеджера пакетов
- добавит его в файл [package.json](/docs/guide/directory-structure/package)
- обновит файл [`nuxt.config`](/docs/guide/directory-structure/nuxt-config)

**Пример:**

Установка модуля [`Pinia`](/modules/pinia).

```bash [Terminal]
npx nuxt module add pinia
```

## nuxt module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### Arguments

<!--module-search-args-->
Argument | Description
--- | ---
`QUERY` | keywords to search for
<!--/module-search-args-->

### Options

<!--module-search-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | Specify the working directory
`--nuxtVersion=<2\|3>` |  | Filter by Nuxt version and list compatible modules only (auto detected by default)
<!--/module-search-opts-->

Команда ищет модули Nuxt, соответствующие вашему запросу, которые совместимы с вашей версией Nuxt.

**Пример:**

```bash [Terminal]
npx nuxt module search pinia
```
