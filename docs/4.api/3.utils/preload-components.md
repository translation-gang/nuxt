---
title: 'preloadComponents'
description: Утилиты Nuxt для ручного управления предзагрузкой компонентов.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

Предзагрузка компонентов подгружает то, что странице скоро понадобится, как можно раньше в жизненном цикле рендера. Так они готовы раньше и реже блокируют отрисовку.

`preloadComponents` вручную предзагружает отдельные глобально зарегистрированные компоненты. По умолчанию Nuxt регистрирует их как асинхронные. Имя — в PascalCase.

```ts
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
На сервере `preloadComponents` не действует.
::
