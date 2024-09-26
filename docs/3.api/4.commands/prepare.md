---
title: 'nuxi prepare'
description: Команда prepare создает директорию .nuxt в вашем приложении и генерирует типы.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/prepare.ts
    size: xs
---

```bash [Terminal]
npx nuxi prepare [--log-level] [rootDir]
```

Команда `prepare` создает директорию [`.nuxt`](/docs/guide/directory-structure/nuxt) в вашем приложении и генерирует типы. Это может быть полезно в среде CI или в качестве команды `postinstall` в вашем [`package.json`](/docs/guide/directory-structure/package).

Параметр  | По умолчанию | Описание
----------|--------------|--------------------------------------------------
`rootDir` | `.`          | Корневая директория приложения для подготовки.
