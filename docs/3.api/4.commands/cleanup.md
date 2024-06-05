---
title: 'nuxi cleanup'
description: "Удалите общие сгенерированные файлы Nuxt и кэши."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/cleanup.ts
    size: xs
---

```bash [Terminal]
npx nuxi cleanup [rootDir]
```

Команда `cleanup` удаляет общие сгенерированные файлы Nuxt и кэши, включая:
- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

Параметр  | По умолчанию | Описание
----------|--------------|-----------------------------------
`rootDir` | `.`          | Корневая директория проекта.
