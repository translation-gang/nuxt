---
title: "nuxt upgrade"
description: Обновляет Nuxt до последней версии.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly>]
```
<!--/upgrade-cmd-->

Команда `upgrade` обновляет Nuxt до последней версии.

## Аргументы

<!--upgrade-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/upgrade-args-->

## Опции

<!--upgrade-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Уровень логирования при сборке
`--dedupe` |  | Дедуплицировать зависимости без пересоздания lockfile
`-f, --force` |  | Принудительное обновление: пересоздать lockfile и `node_modules`
`-ch, --channel=<stable\|nightly>` | `stable` | Канал релизов (по умолчанию: stable)
<!--/upgrade-opts-->

::read-more{to="/docs/3.x/getting-started/upgrade"}
Пошаговое обновление Nuxt и заметные изменения между версиями.
::
