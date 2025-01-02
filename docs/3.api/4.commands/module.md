---
title: "nuxi module"
description: "Поиск и добавление модулей в приложение Nuxt с помощью командной строки."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/module/
    size: xs
---

Nuxi предоставляет несколько утилит для беспрепятственной работы с [модулями Nuxt](/modules).

## nuxi module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxi module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig]
```
<!--/module-add-cmd-->

<!--module-add-args-->
Argument | Description
--- | ---
`MODULENAME` | Module name
<!--/module-add-args-->

<!--module-add-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` | `.` | Specify the working directory
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--skipInstall` |  | Skip npm install
`--skipConfig` |  | Skip nuxt.config.ts update
<!--/module-add-opts-->

Эта команда позволяет установить [модули Nuxt](/modules) в ваше приложение без ручной работы.

При выполнении команды:

- установит модуль в качестве зависимости с помощью вашего менеджера пакетов
- добавит его в файл [package.json](/docs/guide/directory-structure/package)
- обновит файл [`nuxt.config`](/docs/guide/directory-structure/nuxt-config)

**Пример:**

Установка модуля [`Pinia`](/modules/pinia).

```bash [Terminal]
npx nuxi module add pinia
```

## nuxi module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxi module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
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
npx nuxi module search pinia
```
