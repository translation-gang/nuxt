---
title: "nuxi typecheck"
description: Команда typecheck запускает vue-tsc для проверки типов в вашем приложении.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/typecheck.ts
    size: xs
---

```bash [Terminal]
npx nuxi typecheck [--log-level] [rootDir]
```

Команда `typecheck` запускает [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) для проверки типов в вашем приложении.

Параметр  | По умолчанию | Описание
----------|--------------|-----------------------------------------
`rootDir` | `.`          | Директория целевого приложения.

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`. Для переопределения определите `NODE_ENV` в файле [`.env`](/docs/guide/directory-structure/env) или в качестве аргумента командной строки.
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
Прочтите подробнее о том, как включить проверку типов во время сборки или разработки.
::
