---
title: "onNuxtReady"
description: Composable onNuxtReady запускает колбэк после завершения инициализации приложения.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` выполняется только на клиенте. :br
Подходит для кода, который не должен блокировать первый рендер.
::

```ts [app/plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // do something with myAnalyticsLibrary
  })
})
```

Безопасно вызывать и после инициализации приложения: тогда код попадёт в следующий idle-колбэк.
