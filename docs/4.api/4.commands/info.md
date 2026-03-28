---
title: "nuxt info"
description: Выводит сведения о текущем или указанном проекте Nuxt.
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

Команда `info` выводит сведения о текущем или указанном проекте Nuxt (версии Nuxt, Nitro, Node и др.).

::tip
Вывод команды удобно прикладывать к вопросам в сообществе или к отчёту об ошибке.
::

## Аргументы

<!--info-args-->
Аргумент | Описание
--- | ---
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/info-args-->

## Опции

<!--info-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
<!--/info-opts-->
