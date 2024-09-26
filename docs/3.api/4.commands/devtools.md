---
title: "nuxi devtools"
description: Команда devtools позволяет включить или отключить Nuxt DevTools для каждого проекта.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/devtools.ts
    size: xs
---

```bash [Terminal]
npx nuxi devtools enable|disable [rootDir]
```

Запуск `nuxi devtools enable` установит Nuxt DevTools глобально и также включит его в конкретном проекте, который вы используете. Он сохраняется как параметр в вашем файле `.nuxtrc` на уровне пользователя. Если вы хотите удалить поддержку devtools для конкретного проекта, вы можете запустить `nuxi devtools disable`.

Параметр  | По умолчанию | Описание
----------|--------------|---------------------------------------------------------------
`rootDir` | `.`          | Корневая директория приложения, для которого вы хотите включить devtools.

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="_blank"}
Подробнее о **Nuxt DevTools**.
::
