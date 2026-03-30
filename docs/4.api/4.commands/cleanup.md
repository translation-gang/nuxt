---
title: 'nuxt cleanup'
description: 'Удаляет типичные сгенерированные файлы и кэши Nuxt.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxt cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

Команда `cleanup` удаляет типичные сгенерированные файлы и кэши Nuxt, в том числе:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## Аргументы

<!--cleanup-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/cleanup-args-->

## Опции

<!--cleanup-opts-->
| Опция              | По умолчанию | Описание                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
<!--/cleanup-opts-->
