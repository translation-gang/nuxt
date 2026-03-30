---
title: "$fetch"
description: Nuxt использует ofetch и глобально предоставляет хелпер $fetch для HTTP-запросов.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt использует [ofetch](https://github.com/unjs/ofetch) и глобально предоставляет хелпер `$fetch` для HTTP-запросов внутри Vue-приложения или API-маршрутов.

::tip{icon="i-lucide-rocket"}
При серверном рендеринге вызов `$fetch` к вашим внутренним [API-маршрутам](/docs/4.x/directory-structure/server) напрямую вызывает соответствующую функцию (эмулируя запрос), **без лишнего сетевого обращения**.
::

::note{color="blue" icon="i-lucide-info"}
Использование `$fetch` в компонентах без обёртки в [`useAsyncData`](/docs/4.x/api/composables/use-async-data) приводит к двойной загрузке данных: сначала на сервере, затем снова на клиенте при гидратации, потому что `$fetch` не переносит состояние с сервера на клиент. Запрос выполнится на обеих сторонах, так как клиенту данные нужно получить заново.
::

## Использование

Рекомендуется использовать [`useFetch`](/docs/4.x/api/composables/use-fetch) или [`useAsyncData`](/docs/4.x/api/composables/use-async-data) + `$fetch`, чтобы избежать двойной загрузки данных при получении данных компонента.

```vue [app/app.vue]
<script setup lang="ts">
// During SSR data is fetched twice, once on the server and once on the client.
const dataTwice = await $fetch('/api/item')

// During SSR data is fetched only on the server side and transferred to the client.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// You can also useFetch as shortcut of useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}

`$fetch` можно использовать в любых методах, которые выполняются только на клиенте.

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
    Contact
  </button>
</template>
```

::tip
`$fetch` — предпочтительный способ HTTP-вызовов в Nuxt вместо [@nuxt/http](https://github.com/nuxt/http) и [@nuxtjs/axios](https://github.com/nuxt-community/axios-module), рассчитанных на Nuxt 2.
::

::note
Если вы вызываете `$fetch` по (внешнему) HTTPS-URL с самоподписанным сертификатом в разработке, в окружении нужно задать `NODE_TLS_REJECT_UNAUTHORIZED=0`.
::

### Передача заголовков и cookie

При вызове `$fetch` в браузере пользовательские заголовки вроде `cookie` отправляются в API напрямую.

Однако при серверном рендеринге из‑за рисков вроде **подделки серверных запросов (SSRF)** или **некорректного использования аутентификации** `$fetch` не включает cookie браузера пользователя и не пробрасывает cookie из ответа fetch.

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// This will NOT forward headers or cookies during SSR
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

Если на сервере нужно пробросить заголовки и cookie, передайте их вручную:

```vue [app/pages/index.vue]
<script setup lang="ts">
// This will forward the user's headers and cookies to `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

При вызове `useFetch` с относительным URL на сервере Nuxt использует [`useRequestFetch`](/docs/4.x/api/composables/use-request-fetch) для проксирования заголовков и cookie (кроме заголовков, которые не предназначены для проброса, например `host`).
