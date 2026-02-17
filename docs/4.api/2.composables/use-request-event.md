---
title: 'useRequestEvent'
description: 'Доступ к объекту входящего запроса (event).'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Within the [Nuxt context](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) you can use `useRequestEvent` to access the incoming request.

```ts
// Get underlying request event
const event = useRequestEvent()

// Get the URL
const url = event?.path
```

::tip
In the browser, `useRequestEvent` will return `undefined`.
::
