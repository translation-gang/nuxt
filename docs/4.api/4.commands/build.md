---
title: "Сборка приложения (nuxt build)"
description: "Сборка приложения Nuxt."
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

Команда `build` создаёт каталог `.output` с приложением, сервером и зависимостями, готовыми к продакшену.

## Аргументы

<!--build-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/build-args-->

## Опции

<!--build-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--prerender` |  | Собрать Nuxt и предрендерить статические маршруты
`--preset` |  | Пресет сервера Nitro
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`--envName` |  | Окружение для разрешения переопределений конфигурации (для сборки по умолчанию `production`, для dev-сервера — `development`)
<!--/build-opts-->

::note
Команда устанавливает `process.env.NODE_ENV` в `production`.
::

::note
`--prerender` всегда устанавливает `preset` в `static`.
::

::read-more{to="/docs/3.x/getting-started/prerendering"}
Статическая генерация и предрендер маршрутов.
::
