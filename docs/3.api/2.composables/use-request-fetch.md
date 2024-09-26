---
title: 'useRequestFetch'
description: 'Передавайте контекст запроса и заголовки для серверных fetch запросов с помощью композабла useRequestFetch.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Вы можете использовать `useRequestFetch` для передачи контекста запроса и заголовков при выполнении fetch запросов на стороне сервера.

При выполнении fetch запроса на стороне клиента, браузер автоматически отправляет необходимые заголовки.
Однако при выполнении запроса во время рендеринга на стороне сервера, поскольку запрос выполняется на сервере, нам нужно пересылать заголовки вручную.

::note
Заголовки, которые **не предназначены для пересылки**, **не будут включены** в запрос. К таким заголовкам относятся, например:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
Композабл [`useFetch`](/docs/api/composables/use-fetch) использует `useRequestFetch` под капотом для автоматической передачи контекста и заголовков запроса.
::

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
  // Это перенаправит заголовки пользователя в обработчик события `/api/foo`
  // Результат: { cookies: { foo: 'bar' } }
  const requestFetch = useRequestFetch()
  const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))
  
  // Это НЕ пересылает ничего
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
В браузере при навигации на клиенте, `useRequestFetch` будет вести себя так же, как и обычный [`$fetch`](/docs/api/utils/dollarfetch).
::
