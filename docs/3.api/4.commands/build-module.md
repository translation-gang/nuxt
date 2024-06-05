---
title: 'nuxi build-module'
description: 'Команда Nuxt для сборки вашего модуля Nuxt перед публикацией.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build-module.ts
    size: xs
---

```bash [Terminal]
npx nuxi build-module [--stub] [rootDir]
```

Команда `build-module` запускает `@nuxt/module-builder` для генерации директории `dist` в вашем `rootDir`, который содержит полную сборку для вашего **nuxt-module**.

Параметр  | По умолчанию | Описание
----------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------
`rootDir` | `.`          | Корневая директория модуля для пакетирования.
`--stub`  | `false`      | Создание заглушки вашего модуля для разработки с использованием [jiti](https://github.com/unjs/jiti#jiti). (**примечание:** Это в основном для целей разработки)

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" color="gray" target="_blank"}
Подробнее об `@nuxt/module-builder`.
::
