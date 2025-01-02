---
title: "nuxi info"
description: Команда info выводит сведения о текущем или указанном проекте Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/info.ts
    size: xs
---

<!--info-cmd-->
```bash [Terminal]
npx nuxi info [ROOTDIR] [--cwd=<directory>]
```
<!--/info-cmd-->

Команда `info` выводит сведения о текущем или указанном проекте Nuxt.

## Arguments

<!--info-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/info-args-->

## Options

<!--info-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
<!--/info-opts-->
