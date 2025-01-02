---
title: "nuxi analyze"
description: "Проанализируйте продакшен бандл или ваше приложение Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxi analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

Команда `analyze` собирает Nuxt и анализирует продакшен бандл (экспериментально).

## Arguments

<!--analyze-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/analyze-args-->

## Options

<!--analyze-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--dotenv` |  | Path to `.env` file to load, relative to the root directory
`--name=<name>` | `default` | Name of the analysis
`--no-serve` |  | Skip serving the analysis results
<!--/analyze-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::
