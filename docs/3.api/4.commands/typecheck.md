---
title: "nuxi typecheck"
description: Команда typecheck запускает vue-tsc для проверки типов в вашем приложении.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [Terminal]
npx nuxi typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>]
```
<!--/typecheck-cmd-->

Команда `typecheck` запускает [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) для проверки типов в вашем приложении.

## Arguments

<!--typecheck-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | Specifies the working directory (default: `.`)
<!--/typecheck-args-->

## Options

<!--typecheck-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | Specify the working directory, this takes precedence over ROOTDIR (default: `.`)
`--logLevel=<silent\|info\|verbose>` |  | Specify build-time log level
<!--/typecheck-opts-->

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`. Для переопределения определите `NODE_ENV` в файле [`.env`](/docs/guide/directory-structure/env) или в качестве аргумента командной строки.
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
Прочтите подробнее о том, как включить проверку типов во время сборки или разработки.
::
