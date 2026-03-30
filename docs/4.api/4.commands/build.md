---
title: "nuxt build"
description: "Собирает ваше приложение Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/build-cmd-->

Команда `build` создаёт каталог `.output` со всем приложением, сервером и зависимостями, готовыми к production.

## Аргументы

<!--build-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/build-args-->

## Опции

<!--build-opts-->
| Опция                                | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--prerender`                        |         | Собрать Nuxt и пререндерить статические маршруты                                                                                                               |
| `--preset=<preset>`                  |         | Пресет сервера Nitro. Доступные пресеты зависят от Nitro (например `node-server`, `vercel`, `netlify`, `static`)                                  |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                                                                                          |
| `--envName`                          |         | Окружение для применения переопределений конфигурации (по умолчанию `production` при сборке и `development` при запуске dev-сервера) |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                                                                                             |
| `--profile`                          |         | Профилирование производительности (v4.4+). При выходе записывает CPU-профиль V8 и JSON-отчёт. Используйте `--profile=verbose` для полного вывода в консоль.                     |
<!--/build-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::

::note
`--prerender` всегда выставляет `preset` в `static`
::
