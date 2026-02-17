---
title: "nuxt info"
description: "Вывод информации о текущем или указанном проекте Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/info.ts
    size: xs
---

<!--info-cmd-->
```bash [Terminal]
npx nuxt info [ROOTDIR] [--cwd=<directory>]
```
<!--/info-cmd-->

Команда `info` выводит информацию о текущем или указанном проекте Nuxt.

## Аргументы

<!--info-args-->
| Аргумент      | Описание                                  |
|---------------|--------------------------------------------|
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)    |
<!--/info-args-->

## Опции

<!--info-opts-->
| Опция               | По умолчанию | Описание                                                |
|---------------------|--------------|---------------------------------------------------------|
| `--cwd=<directory>` |              | Рабочая директория (имеет приоритет над ROOTDIR)        |
<!--/info-opts-->
