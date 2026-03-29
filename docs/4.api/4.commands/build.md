---
title: "nuxt build"
description: "Собирает приложение Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>]
```
<!--/build-cmd-->

Команда `build` создаёт каталог `.output` с приложением, сервером и зависимостями, готовыми к продакшену.

## Аргументы

<!--build-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/build-args-->

## Опции

<!--build-opts-->
| Опция                               | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--prerender`                        |         | Собрать Nuxt и предрендерить статические маршруты                                                                                                               |
| `--preset=<preset>`                  |         | Пресет сервера Nitro. Набор пресетов задаёт Nitro (например `node-server`, `vercel`, `netlify`, `static`)                                  |
| `--dotenv`                           |         | Путь к `.env` относительно корня проекта                                                                                          |
| `--envName`                          |         | Окружение для переопределений конфигурации (по умолчанию при сборке — `production`, при dev-сервере — `development`) |
| `-e, --extends=<layer-name>`         |         | Подключить слой Nuxt                                                                                                                             |
<!--/build-opts-->

::note
Команда выставляет `process.env.NODE_ENV` в `production`.
::

::note
`--prerender` всегда устанавливает `preset` в `static`
::
