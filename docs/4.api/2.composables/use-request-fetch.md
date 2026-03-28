---
title: 'useRequestFetch'
description: 'Передача контекста запроса и заголовков при серверных вызовах fetch через композабл useRequestFetch.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Композабл `useRequestFetch` передаёт контекст запроса и заголовки при выполнении запросов `fetch` на сервере.

В браузере `fetch` сам подставляет нужные заголовки.
При запросе во время SSR по соображениям безопасности заголовки нужно передавать вручную.

::note
Заголовки, которые **не предназначены для пересылки**, **не попадут** в запрос. К таким относятся, например:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
Композабл [`useFetch`](/docs/3.x/api/composables/use-fetch) внутри использует `useRequestFetch`, чтобы автоматически передавать контекст и заголовки запроса.
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
  // Заголовки клиента пересылаются в обработчик `/api/cookies`
  // Результат: { cookies: { foo: 'bar' } }
  const requestFetch = useRequestFetch()
  const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))
  
  // Здесь заголовки не пересылаются
  // Результат: { cookies: {} }
  const { data: notForwarded } = await useAsyncData(() => $fetch('/api/cookies')) 
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
В браузере при клиентской навигации `useRequestFetch` ведёт себя так же, как обычный [`$fetch`](/docs/3.x/api/utils/dollarfetch).
::
