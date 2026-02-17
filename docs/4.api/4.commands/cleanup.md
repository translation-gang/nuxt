---
title: 'nuxt cleanup'
description: 'Удаляет общие сгенерированные файлы Nuxt и кэши.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxt cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

Команда `cleanup` удаляет общие сгенерированные файлы Nuxt и кэши, включая:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## Аргументы

<!--cleanup-args-->
| Аргумент      | Описание                                  |
|---------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)    |
<!--/cleanup-args-->

## Опции

<!--cleanup-opts-->
| Опция               | По умолчанию | Описание                                                |
|---------------------|--------------|---------------------------------------------------------|
| `--cwd=<directory>` |              | Рабочая директория (имеет приоритет над ROOTDIR)       |
<!--/cleanup-opts-->
