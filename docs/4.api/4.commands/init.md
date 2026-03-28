---
title: "create nuxt"
description: Команда init создаёт новый проект Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npm create nuxt@latest [DIR] [--cwd=<directory>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager]
```
<!--/init-cmd-->

Команда [`npm create nuxt@latest`](https://github.com/nuxt/cli) (или эквивалент для вашего менеджера пакетов) инициализирует новый проект Nuxt с помощью [unjs/giget](https://github.com/unjs/giget).

## Аргументы

<!--init-args-->
Аргумент | Описание
--- | ---
`DIR=""` | Каталог проекта
<!--/init-args-->

## Опции

<!--init-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` | `.` | Рабочая директория
`-t, --template` |  | Имя шаблона
`-f, --force` |  | Перезаписать существующий каталог
`--offline` |  | Принудительный офлайн-режим
`--preferOffline` |  | Предпочитать офлайн-режим
`--no-install` |  | Пропустить установку зависимостей
`--gitInit` |  | Инициализировать git-репозиторий
`--shell` |  | Открыть shell в каталоге проекта после настройки
`--packageManager` |  | Менеджер пакетов (npm, pnpm, yarn, bun)
`--modules` |  | Модули Nuxt для установки (через запятую, без пробелов)
`--no-modules` |  | Пропустить запрос на установку модулей
<!--/init-opts-->

## Переменные окружения

- `NUXI_INIT_REGISTRY` — пользовательский реестр шаблонов ([подробнее в giget](https://github.com/unjs/giget#custom-registry)).
  - Реестр по умолчанию берётся из [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates).

::read-more{to="/docs/3.x/getting-started/installation"}
Установка и первый запуск проекта Nuxt.
::
