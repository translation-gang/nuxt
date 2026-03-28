---
title: "nuxt generate"
description: Предрендерит все маршруты приложения и записывает статические HTML-файлы.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

Команда `generate` предрендерит маршруты и сохранит статический HTML для выкладки на статический хостинг. По сути это `nuxt build` с включённым `prerender`.

## Аргументы

<!--generate-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/generate-args-->

## Опции

<!--generate-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--preset` |  | Пресет сервера Nitro
`--dotenv` |  | Путь к файлу `.env` для загрузки, относительно корня проекта
`--envName` |  | Окружение для разрешения переопределений конфигурации (для сборки по умолчанию `production`, для dev-сервера — `development`)
<!--/generate-opts-->

::read-more{to="/docs/3.x/getting-started/deployment#static-hosting"}
Подробнее о предрендеринге и статическом хостинге.
::
