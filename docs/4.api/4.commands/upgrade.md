---
title: "nuxt upgrade"
description: Команда upgrade обновляет Nuxt до последней версии.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly|v3|v4|v4-nightly|v3-nightly>]
```
<!--/upgrade-cmd-->

Команда `upgrade` обновляет Nuxt до последней версии.

## Аргументы

<!--upgrade-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/upgrade-args-->

## Опции

<!--upgrade-opts-->
| Опция                                                             | По умолчанию  | Описание                                                                      |
|--------------------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                                                |          | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
| `--logLevel=<silent\|info\|verbose>`                               |          | Уровень логирования при сборке                                                     |
| `--dedupe`                                                         |          | Дедуплицировать зависимости после обновления                                              |
| `-f, --force`                                                      |          | Принудительное обновление: пересоздать lockfile и node_modules                              |
| `-ch, --channel=<stable\|nightly\|v3\|v4\|v4-nightly\|v3-nightly>` | `stable` | Канал установки (по умолчанию: stable)                              |
<!--/upgrade-opts-->
