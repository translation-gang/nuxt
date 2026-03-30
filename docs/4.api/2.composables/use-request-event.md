---
title: 'useRequestEvent'
description: 'Доступ к событию входящего запроса через useRequestEvent.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

В [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) `useRequestEvent` даёт доступ к входящему запросу.

```ts
// Событие запроса
const event = useRequestEvent()

// URL
const url = event?.path
```

::tip
В браузере `useRequestEvent` возвращает `undefined`.
::
