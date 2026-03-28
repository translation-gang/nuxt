---
title: 'useRequestEvent'
description: 'Получите доступ к событию входящего запроса с помощью композабла useRequestEvent.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

В рамках [Nuxt-контекста](/docs/guide/going-further/nuxt-app#the-nuxt-context) вы можете использовать `useRequestEvent` для доступа к входящему запросу.

```ts
// Получение базового события запроса
const event = useRequestEvent()

// Получить URL
const url = event?.path
```

::tip
В браузере `useRequestEvent` вернет `undefined`.
::
