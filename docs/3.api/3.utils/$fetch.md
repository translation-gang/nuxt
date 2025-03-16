---
title: "$fetch"
description: Nuxt использует ofetch для предоставления глобально хелпера $fetch для выполнения HTTP-запросов.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt использует [ofetch](https://github.com/unjs/ofetch) для предоставления глобально хелпера `$fetch` для выполнения HTTP-запросов в вашем приложении Vue или маршрутах API.

::tip{icon="i-ph-rocket-launch" color="gray"}
During server-side rendering, calling `$fetch` to fetch your internal [API routes](/docs/guide/directory-structure/server) will directly call the relevant function (emulating the request), **saving an additional API call**.
::

::note{color="blue" icon="i-ph-info"}
Using `$fetch` in components without wrapping it with [`useAsyncData`](/docs/api/composables/use-async-data) causes fetching the data twice: initially on the server, then again on the client-side during hydration, because `$fetch` does not transfer state from the server to the client. Thus, the fetch will be executed on both sides because the client has to get the data again.
::

## Использование

Для предотвращения двойного извлечения данных при получении данных компонента мы рекомендуем использовать [`useFetch`](/docs/api/composables/use-fetch) или [`useAsyncData`](/docs/api/composables/use-async-data) + `$fetch`.

```vue [app.vue]
<script setup lang="ts">
// Во время SSR данные извлекаются дважды, один раз на сервере и один раз на клиенте.
const dataTwice = await $fetch('/api/item')

// Во время SSR данные извлекаются только на сервере и передаются клиенту.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// Вы также можете использовать useFetch в качестве шортката для useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/getting-started/data-fetching"}

Вы можете использовать `$fetch` в любых методах, которые выполняются только на клиенте.

```vue [pages/contact.vue]
<script setup lang="ts">
function contactForm() {
  $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">Contact</button>
</template>
```

::tip
`$fetch` является предпочтительным способом выполнения HTTP-запросов в Nuxt, в отличие от [@nuxt/http](https://github.com/nuxt/http) и [@nuxtjs/axios](https://github.com/nuxt-community/axios-module), которые были созданы для Nuxt 2.
::

::note
Если вы используете `$fetch` для вызова (внешнего) HTTPS URL-адреса с самоподписанным сертификатом в разработке, вам необходимо установить `NODE_TLS_REJECT_UNAUTHORIZED=0` в своей среде.
::

### Passing Headers and Cookies

When we call `$fetch` in the browser, user headers like `cookie` will be directly sent to the API.

However, during Server-Side Rendering, due to security risks such as **Server-Side Request Forgery (SSRF)** or **Authentication Misuse**, the `$fetch` wouldn't include the user's browser cookies, nor pass on cookies from the fetch response.

::code-group

```vue [pages/index.vue]
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

If you need to forward headers and cookies on the server, you must manually pass them:

```vue [pages/index.vue]
<script setup lang="ts">
// This will forward the user's headers and cookies to `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

However, when calling `useFetch` with a relative URL on the server, Nuxt will use [`useRequestFetch`](/docs/api/composables/use-request-fetch) to proxy headers and cookies (with the exception of headers not meant to be forwarded, like `host`).
