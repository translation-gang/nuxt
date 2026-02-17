---
title: 'useRequestFetch'
description: 'Проброс контекста запроса и заголовков для серверных fetch-запросов.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

`useRequestFetch` передаёт контекст запроса и заголовки при выполнении fetch на сервере.

На клиенте браузер сам отправляет нужные заголовки. При SSR из соображений безопасности заголовки нужно пробрасывать вручную.

::note
Заголовки, **не предназначенные для проброса**, в запрос **не попадут**. В их числе, например: `transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`.
::

::tip
Композабл [`useFetch`](/docs/4.x/api/composables/use-fetch) внутри использует `useRequestFetch` для автоматической передачи контекста и заголовков.
::

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// заголовки пользователя передаются в обработчик `/api/cookies`
// результат: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// здесь заголовки не передаются
// результат: { cookies: {} }
const { data: notForwarded } = await useAsyncData((_nuxtApp, { signal }) => $fetch('/api/cookies', { signal }))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  return { cookies }
})
```

::

::tip
В браузере при клиентской навигации `useRequestFetch` ведёт себя как обычный [`$fetch`](/docs/4.x/api/utils/dollarfetch).
::
