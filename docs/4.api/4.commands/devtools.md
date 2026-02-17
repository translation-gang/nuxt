---
title: "nuxt devtools"
description: Команда devtools позволяет включить или отключить Nuxt DevTools для каждого проекта.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

Запуск `nuxt devtools enable` установит Nuxt DevTools глобально и также включит его в конкретном проекте, который вы используете. Он сохраняется как параметр в вашем файле `.nuxtrc` на уровне пользователя. Если вы хотите удалить поддержку devtools для конкретного проекта, вы можете запустить `nuxt devtools disable`.

## Аргументы

<!--devtools-args-->
| Аргумент     | Описание                                  |
|--------------|--------------------------------------------|
| `COMMAND`    | Команда: `enable` или `disable`            |
| `ROOTDIR="."` | Рабочая директория (по умолчанию: `.`)   |
<!--/devtools-args-->

## Опции

<!--devtools-opts-->
| Опция               | По умолчанию | Описание                                                |
|---------------------|--------------|---------------------------------------------------------|
| `--cwd=<directory>` |              | Рабочая директория (приоритет над ROOTDIR)              |
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
Подробнее о **Nuxt DevTools**.
::
