---
title: "nuxt module"
description: "Поиск и установка модулей Nuxt из командной строки."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/tree/main/packages/nuxi/src/commands/module
    size: xs
---

Nuxt предоставляет утилиты для работы с [модулями Nuxt](/modules).

## nuxt module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
| Аргумент     | Описание                                                         |
|--------------|---------------------------------------------------------------------|
| `MODULENAME` | Одно или несколько имён модулей через пробел |
<!--/module-add-args-->

<!--module-add-opts-->
| Опция                               | По умолчанию | Описание                         |
|--------------------------------------|---------|-------------------------------------|
| `--cwd=<directory>`                  | `.`     | Рабочий каталог       |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке        |
| `--skipInstall`                      |         | Пропустить npm install                    |
| `--skipConfig`                       |         | Пропустить обновление nuxt.config.ts          |
| `--dev`                              |         | Установить как dev-зависимости |
<!--/module-add-opts-->

Команда устанавливает [модули Nuxt](/modules) в приложение без ручных шагов.

При запуске:

- модуль устанавливается как зависимость через ваш менеджер пакетов
- запись добавляется в [package.json](/docs/3.x/directory-structure/package)
- обновляется [`nuxt.config`](/docs/3.x/directory-structure/nuxt-config)

**Пример:**

Установка модуля [`Pinia`](/modules/pinia)

```bash [Terminal]
npx nuxt module add pinia
```

## nuxt module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### Аргументы

<!--module-search-args-->
| Аргумент | Описание            |
|----------|------------------------|
| `QUERY`  | Ключевые слова поиска |
<!--/module-search-args-->

### Опции

<!--module-search-opts-->
| Опция                 | По умолчанию | Описание                                                                        |
|------------------------|---------|------------------------------------------------------------------------------------|
| `--cwd=<directory>`    | `.`     | Рабочий каталог                                                      |
| `--nuxtVersion=<2\|3>` |         | Фильтр по версии Nuxt — только совместимые модули (по умолчанию авто) |
<!--/module-search-opts-->

Команда ищет модули Nuxt по запросу, совместимые с вашей версией Nuxt.

**Пример:**

```bash [Terminal]
npx nuxt module search pinia
```
