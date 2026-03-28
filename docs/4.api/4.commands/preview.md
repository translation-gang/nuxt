---
title: "Предпросмотр сборки (nuxt preview)"
description: Запуск локального сервера предпросмотра после сборки.
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [--dotenv] [-p, --port]
```
<!--/preview-cmd-->

Команда `preview` поднимает локальный сервер для проверки сборки после `nuxt build`. Псевдоним: `start`. Про выкладку в прод см. [раздел «Развёртывание»](/docs/3.x/getting-started/deployment).

## Аргументы

<!--preview-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/preview-args-->

## Опции

<!--preview-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--envName` |  | Окружение для разрешения переопределений конфигурации (для сборки по умолчанию `production`, для dev-сервера — `development`)
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`-p, --port` |  | Порт прослушивания (по умолчанию: `NUXT_PORT \|\| NITRO_PORT \|\| PORT`)
<!--/preview-opts-->

Команда устанавливает `process.env.NODE_ENV` в `production`. Чтобы переопределить, задайте `NODE_ENV` в `.env` или в командной строке.

::note
Для удобства в режиме предпросмотра [`.env`](/docs/3.x/directory-structure/env) загружается в `process.env`. В продакшене переменные окружения нужно задать самостоятельно — например, на Node.js 20+ можно выполнить `node --env-file .env .output/server/index.mjs`.
::
