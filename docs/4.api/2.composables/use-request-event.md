---
title: 'useRequestEvent'
description: 'Доступ к событию входящего запроса через композабл useRequestEvent.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

В [контексте Nuxt](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) композабл `useRequestEvent` даёт доступ к входящему запросу.

```ts
// Базовое событие запроса
const event = useRequestEvent()

// URL
const url = event?.path
```

::tip
В браузере `useRequestEvent` возвращает `undefined`.
::
