---
title: "nuxi generate"
description: Предварительный рендеринг каждого маршрута приложения и сохранение результата в обычных HTML-файлах.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxi generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

Команда `generate` предварительно рендерит каждый маршрут вашего приложения и сохраняет результат в обычных HTML-файлах, которые вы можете разместить на любых статических хостинговых сервисах. Команда запускает `nuxi build` с аргументом `prerender` установленным в `true`

## Arguments

<!--generate-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/generate-args-->

## Options

<!--generate-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--preset` |  | Nitro server preset
`--dotenv` |  | Path to `.env` file to load, relative to the root directory
`--envName` |  | The environment to use when resolving configuration overrides (default is `production` when building, and `development` when running the dev server)
<!--/generate-opts-->

::read-more{to="/docs/getting-started/deployment#static-hosting"}
Узнайте больше о предварительном рендеринге и статическом хостинге.
::
