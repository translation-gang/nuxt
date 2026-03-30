---
title: "nuxt devtools"
description: Команда devtools позволяет включать или отключать Nuxt DevTools для отдельного проекта.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

Запуск `nuxt devtools enable` устанавливает Nuxt DevTools глобально и включает их в текущем проекте. Настройка сохраняется в пользовательском `.nuxtrc`. Чтобы отключить поддержку devtools в конкретном проекте, выполните `nuxt devtools disable`.

## Аргументы

<!--devtools-args-->
| Аргумент      | Описание                                    |
|---------------|------------------------------------------------|
| `COMMAND`     | Команда (варианты: <enable\|disable>)    |
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`) |
<!--/devtools-args-->

## Опции

<!--devtools-opts-->
| Опция              | По умолчанию | Описание                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | Рабочая директория; имеет приоритет над ROOTDIR (по умолчанию: `.`) |
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
Подробнее о **Nuxt DevTools**.
::
