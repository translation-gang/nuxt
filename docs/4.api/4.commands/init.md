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
npm create nuxt@latest [DIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager] [-M, --modules] [--no-modules] [--nightly]
```
<!--/init-cmd-->

Команда `create-nuxt` инициализирует новый проект Nuxt с помощью [unjs/giget](https://github.com/unjs/giget).

## Аргументы

<!--init-args-->
| Аргумент | Описание       |
|----------|-------------------|
| `DIR=""` | Каталог проекта |
<!--/init-args-->

## Опции

<!--init-opts-->
| Опция                               | По умолчанию | Описание                                              |
|--------------------------------------|---------|----------------------------------------------------------|
| `--cwd=<directory>`                  | `.`     | Рабочий каталог                            |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                             |
| `-t, --template`                     |         | Имя шаблона                                            |
| `-f, --force`                        |         | Перезаписать существующий каталог                              |
| `--offline`                          |         | Принудительный офлайн-режим                                       |
| `--preferOffline`                    |         | Предпочитать офлайн-режим                                      |
| `--no-install`                       |         | Пропустить установку зависимостей                             |
| `--gitInit`                          |         | Инициализировать git-репозиторий                                |
| `--shell`                            |         | После установки открыть оболочку в каталоге проекта      |
| `--packageManager`                   |         | Менеджер пакетов (npm, pnpm, yarn, bun)            |
| `-M, --modules`                      |         | Модули Nuxt для установки (через запятую, без пробелов) |
| `--no-modules`                       |         | Пропустить запрос на установку модулей                          |
| `--nightly`                          |         | Канал nightly Nuxt (3x или latest)          |
<!--/init-opts-->

## Переменные окружения

- `NUXI_INIT_REGISTRY` — пользовательский реестр шаблонов ([подробнее](https://github.com/unjs/giget#custom-registry)).
  - Реестр по умолчанию загружается из [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)
