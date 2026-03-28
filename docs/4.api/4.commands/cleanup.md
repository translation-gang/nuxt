---
title: "Очистка артефактов (nuxt cleanup)"
description: "Удаляет типичные артефакты сборки и кэши Nuxt."
links:
  - label: "«Исходный код»"
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxt cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

Команда `cleanup` удаляет типичные файлы и кэши, которые создаёт Nuxt, в том числе:

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

::warning
После очистки для локальной работы снова выполните `nuxt prepare` или `nuxt dev` — каталог `.nuxt` будет пересоздан.
::

## Аргументы

<!--cleanup-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/cleanup-args-->

## Опции

<!--cleanup-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
<!--/cleanup-opts-->
