---
title: "nuxt module"
description: "Поиск и добавление модулей в приложение Nuxt из командной строки."
links:
  - label: Source
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
| Аргумент    | Описание                                                    |
|-------------|-------------------------------------------------------------|
| `MODULENAME` | Один или несколько модулей для установки (через пробел)     |
<!--/module-add-args-->

<!--module-add-opts-->
| Опция                                  | По умолчанию | Описание                          |
|----------------------------------------|--------------|-----------------------------------|
| `--cwd=<directory>`                    | `.`          | Рабочая директория                |
| `--logLevel=<silent\|info\|verbose>`   |              | Уровень логирования при сборке   |
| `--skipInstall`                        |              | Не запускать npm install         |
| `--skipConfig`                         |              | Не обновлять nuxt.config.ts      |
| `--dev`                                |              | Установить как dev-зависимости   |
<!--/module-add-opts-->

Команда устанавливает [модули Nuxt](/modules) в приложение без ручных правок.

При запуске команда:

- устанавливает модуль через ваш менеджер пакетов
- добавляет его в [package.json](/docs/4.x/directory-structure/package)
- обновляет [`nuxt.config`](/docs/4.x/directory-structure/nuxt-config)

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
| Аргумент | Описание              |
|----------|------------------------|
| `QUERY`  | Ключевые слова поиска |
<!--/module-search-args-->

### Опции

<!--module-search-opts-->
| Опция                  | По умолчанию | Описание                                                                 |
|------------------------|--------------|--------------------------------------------------------------------------|
| `--cwd=<directory>`    | `.`          | Рабочая директория                                                       |
| `--nuxtVersion=<2\|3>`  |              | Фильтр по версии Nuxt (по умолчанию определяется автоматически)        |
<!--/module-search-opts-->

Команда ищет модули Nuxt по запросу, совместимые с вашей версией Nuxt.

**Пример:**

```bash [Terminal]
npx nuxt module search pinia
```
