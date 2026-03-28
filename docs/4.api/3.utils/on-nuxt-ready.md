---
title: "onNuxtReady"
description: Композабл onNuxtReady позволяет выполнить код после завершения инициализации приложения.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` выполняется только на клиенте. :br
Он подходит для кода, который не должен блокировать первоначальный рендер приложения.
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // do something with myAnalyticsLibrary
  })
})
```

Его можно безопасно вызывать даже после инициализации приложения: в этом случае код будет зарегистрирован на выполнение в следующем idle callback.
