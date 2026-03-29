---
title: "nuxt info"
description: Команда info выводит сведения о текущем или указанном проекте Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/info.ts
    size: xs
---

<!--info-cmd-->
```bash [Terminal]
npx nuxt info [ROOTDIR] [--cwd=<directory>]
```
<!--/info-cmd-->

Команда `info` выводит сведения о текущем или указанном проекте Nuxt.

## Аргументы

<!--info-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | Рабочий каталог (по умолчанию: `.`) |
<!--/info-args-->

## Опции

<!--info-opts-->
| Опция              | По умолчанию | Описание                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | Рабочий каталог; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
<!--/info-opts-->
