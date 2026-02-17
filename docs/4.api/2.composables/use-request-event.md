---
title: 'useRequestEvent'
description: 'Доступ к объекту входящего запроса (event).'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

В [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) композабл `useRequestEvent` даёт доступ к объекту входящего запроса.

```ts
// объект события запроса
const event = useRequestEvent()

// URL
const url = event?.path
```

::tip
В браузере `useRequestEvent` возвращает `undefined`.
::
