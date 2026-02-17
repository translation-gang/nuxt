---
title: "create nuxt"
description: "Создание нового проекта Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npm create nuxt@latest [DIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager] [-M, --modules] [--no-modules] [--nightly]
```
<!--/init-cmd-->

Команда `create-nuxt` создаёт новый проект Nuxt с помощью [unjs/giget](https://github.com/unjs/giget).

## Аргументы

<!--init-args-->
| Аргумент | Описание        |
|----------|-----------------|
| `DIR=""` | Директория проекта |
<!--/init-args-->

## Опции

<!--init-opts-->
| Опция                                  | По умолчанию | Описание                                                    |
|----------------------------------------|--------------|-------------------------------------------------------------|
| `--cwd=<directory>`                    | `.`          | Рабочая директория                                          |
| `--logLevel=<silent\|info\|verbose>`   |              | Уровень логирования при сборке                              |
| `-t, --template`                       |              | Имя шаблона                                                 |
| `-f, --force`                          |              | Перезаписать существующую директорию                        |
| `--offline`                             |              | Режим офлайн                                                |
| `--preferOffline`                      |              | Предпочитать офлайн-режим                                   |
| `--no-install`                         |              | Не устанавливать зависимости                                |
| `--gitInit`                            |              | Инициализировать git-репозиторий                            |
| `--shell`                              |              | Запустить shell в директории проекта после установки        |
| `--packageManager`                     |              | Менеджер пакетов (npm, pnpm, yarn, bun)                     |
| `-M, --modules`                        |              | Модули Nuxt для установки (через запятую, без пробелов)    |
| `--no-modules`                         |              | Пропустить запрос установки модулей                         |
| `--nightly`                            |              | Использовать ночную версию Nuxt (3x или latest)             |
<!--/init-opts-->

## Переменные окружения

- `NUXI_INIT_REGISTRY`: адрес своего реестра шаблонов ([подробнее](https://github.com/unjs/giget#custom-registry)).
  - По умолчанию используется [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates)
