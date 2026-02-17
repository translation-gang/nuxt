---
title: "$fetch"
description: "Глобальный хелпер $fetch (ofetch) для HTTP-запросов."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

В Nuxt глобально доступен хелпер `$fetch` на базе [ofetch](https://github.com/unjs/ofetch) для HTTP-запросов во Vue-приложении и в API-маршрутах.

::tip{icon="i-lucide-rocket"}
При SSR вызов `$fetch` к внутренним [API-маршрутам](/docs/4.x/directory-structure/server) выполняет соответствующую функцию напрямую (без реального HTTP), **без дополнительного запроса**.
::

::note{color="blue" icon="i-lucide-info"}
Использование `$fetch` в компонентах без обёртки [`useAsyncData`](/docs/4.x/api/composables/use-async-data) приводит к двойной загрузке: на сервере и снова на клиенте при гидрации, так как состояние с сервера не передаётся.
::

## Использование

Рекомендуется [`useFetch`](/docs/4.x/api/composables/use-fetch) или [`useAsyncData`](/docs/4.x/api/composables/use-async-data) + `$fetch`, чтобы избежать двойной загрузки данных компонента.

```vue [app/app.vue]
<script setup lang="ts">
// при SSR данные запрашиваются дважды — на сервере и на клиенте
const dataTwice = await $fetch('/api/item')

// при SSR данные запрашиваются только на сервере и передаются на клиент
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// useFetch — краткая форма useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}

`$fetch` можно вызывать в методах, которые выполняются только на клиенте.

```vue [app/pages/contact.vue]
<script setup lang="ts">
async function contactForm () {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world' },
  })
}
</script>

<template>
  <button @click="contactForm">
    Связаться
  </button>
</template>
```

::tip
В Nuxt для HTTP-запросов рекомендуется `$fetch` вместо [@nuxt/http](https://github.com/nuxt/http) и [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) для Nuxt 2.
::

::note
При вызове `$fetch` к внешнему HTTPS с самоподписанным сертификатом в разработке задайте в окружении `NODE_TLS_REJECT_UNAUTHORIZED=0`.
::

### Передача заголовков и cookies

При вызове `$fetch` в браузере заголовки пользователя (в том числе `cookie`) отправляются в API.

При SSR из соображений безопасности (SSRF, неправильное использование аутентификации) `$fetch` не подставляет cookies браузера и не передаёт cookies из ответа.

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// при SSR заголовки и cookies не передаются
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... Do something with the cookie
})
```
::

Чтобы передать заголовки и cookies на сервере, используйте `useRequestFetch`:

```vue [app/pages/index.vue]
<script setup lang="ts">
// заголовки и cookies пользователя передаются в /api/cookies
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

При вызове `useFetch` с относительным URL на сервере Nuxt сам использует [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) для проброса заголовков и cookies (кроме тех, что не пробрасываются, например `host`).
