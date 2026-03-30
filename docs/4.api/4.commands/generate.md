---
title: "nuxt generate"
description: Предрендерит все маршруты приложения и сохраняет результат в обычные HTML-файлы.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/generate-cmd-->

Команда `generate` предрендерит все маршруты приложения и сохранит результат в обычные HTML-файлы, которые можно развернуть на любом статическом хостинге. Команда запускает `nuxt build` с аргументом `prerender`, равным `true`

## Аргументы

<!--generate-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/generate-args-->

## Опции

<!--generate-opts-->
| Опция                                | По умолчанию | Описание                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`)                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | Уровень логирования при сборке                                                                                                                         |
| `--preset`                           |         | Пресет сервера Nitro                                                                                                                                  |
| `--dotenv`                           |         | Путь к файлу `.env` относительно корня проекта                                                                                          |
| `--envName`                          |         | Окружение для применения переопределений конфигурации (по умолчанию `production` при сборке и `development` при запуске dev-сервера) |
| `-e, --extends=<layer-name>`         |         | Расширить конфигурацию слоем Nuxt                                                                                                                             |
| `--profile`                          |         | Профилирование производительности (v4.4+). При выходе записывает CPU-профиль V8 и JSON-отчёт. Используйте `--profile=verbose` для полного вывода в консоль.                     |
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
Подробнее о предрендеринге и статическом хостинге.
::
