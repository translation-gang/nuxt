---
title: "nuxt devtools"
description: Включение или отключение Nuxt DevTools для проекта.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

`nuxt devtools enable` ставит Nuxt DevTools глобально и включает их для текущего проекта; настройки пишутся в пользовательский `.nuxtrc`. Для отключения в проекте выполните `nuxt devtools disable`.

## Аргументы

<!--devtools-args-->
Аргумент | Описание
--- | ---
`COMMAND` | Команда (варианты: <enable\|disable>)
`ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)
<!--/devtools-args-->

## Опции

<!--devtools-opts-->
Опция | По умолчанию | Описание
--- | --- | ---
`--cwd=<directory>` |  | Рабочая директория; переопределяет ROOTDIR (по умолчанию: `.`)
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
Подробнее о **Nuxt DevTools**.
::
