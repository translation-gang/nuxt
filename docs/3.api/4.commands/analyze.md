---
title: "nuxi analyze"
description: "Проанализируйте продакшен пакет или ваше приложение Nuxt."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/analyze.ts
    size: xs
---

```bash [Terminal]
npx nuxi analyze [--log-level] [rootDir]
```

Команда `analyze` создает Nuxt и анализирует пакет для продакшена (экспериментально).

Параметр  | По умолчанию | Описание
----------|--------------|-----------------------------------------
`rootDir` | `.`          | Директория целевого приложения.

::note
Эта команда устанавливает `process.env.NODE_ENV` в `production`.
::
