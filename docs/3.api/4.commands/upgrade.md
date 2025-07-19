---
title: "nuxt upgrade"
description: Команда upgrade обновляет Nuxt до последней версии.
links:
  - label: Исходники
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

## Arguments

<!--upgrade-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/upgrade-args-->

## Options

<!--upgrade-opts-->
Параметр | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
`--dedupe` |  | Will deduplicate dependencies but not recreate the lockfile
`-f, --force` |  | Force upgrade to recreate lockfile and node_modules
`-ch, --channel=<stable\|nightly>` | `stable` | Specify a channel to install from (default: stable)
<!--/upgrade-opts-->
