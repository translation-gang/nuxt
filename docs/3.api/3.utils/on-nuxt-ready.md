---
title: "onNuxtReady"
description: Композабл onNuxtReady позволяет выполнить коллбэк после завершения инициализации вашего приложения..
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ready.ts
    size: xs
---

::important
`onNuxtReady` выполняется только на клиенте. :br
Это идеально для выполнения кода, который не должен блокировать начальный рендеринг вашего приложения.
::

```ts [plugins/ready.client.ts]
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // сделать что-то с myAnalyticsLibrary
  })
})
```

Это "безопасно" запускать даже после того, как ваше приложение будет инициализировано. В этом случае код будет зарегистрирован для выполнения в следующем тике выполнения коллбэков.
