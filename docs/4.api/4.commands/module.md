---
title: "Поиск и установка модулей (nuxt module)"
description: "Поиск и добавление модулей Nuxt из командной строки."
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/module/
    size: xs
---

Командная строка Nuxt (`nuxi`) предоставляет утилиты для работы с [каталогом модулей Nuxt](https://nuxt.com/modules).

## Добавление модуля (`nuxt module add`)

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

### Аргументы

<!--module-add-args-->
Аргумент | Описание
--- | ---
`MODULENAME` | Имя модуля
<!--/module-add-args-->

### Опции

<!--module-add-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` | `.` | Рабочая директория
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--skipInstall` |  | Пропустить `npm install`
`--skipConfig` |  | Пропустить обновление `nuxt.config.ts`
`--dev` |  | Установить модуль как dev-зависимость
<!--/module-add-opts-->

Команда устанавливает [модули из каталога](https://nuxt.com/modules) в приложение без ручных шагов.

При запуске:

- модуль добавляется как зависимость через ваш менеджер пакетов
- запись появляется в [package.json](/docs/3.x/directory-structure/package)
- обновляется [`nuxt.config`](/docs/3.x/directory-structure/nuxt-config)

**Пример:**

Установить модуль [Pinia](https://nuxt.com/modules/pinia).

```bash [Terminal]
npx nuxt module add pinia
```

::read-more{to="/docs/3.x/guide/modules/getting-started"}
Обзор экосистемы модулей Nuxt и сценариев использования.
::

## Поиск модулей (`nuxt module search`)

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### Аргументы

<!--module-search-args-->
Аргумент | Описание
--- | ---
`QUERY` | Ключевые слова поиска
<!--/module-search-args-->

### Опции

<!--module-search-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` | `.` | Рабочая директория
`--nuxtVersion=<2\|3>` |  | Фильтр по версии Nuxt — только совместимые модули (по умолчанию автоопределение)
<!--/module-search-opts-->

Команда ищет модули Nuxt по запросу, совместимые с вашей версией Nuxt.

**Пример:**

```bash [Terminal]
npx nuxt module search pinia
```
