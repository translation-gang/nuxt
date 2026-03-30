---
title: 'useRequestFetch'
description: 'Проброс контекста запроса и заголовков для fetch на сервере через useRequestFetch.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

`useRequestFetch` пробрасывает контекст и заголовки запроса при fetch на сервере.

В браузере нужные заголовки отправляются автоматически.
При SSR из соображений безопасности их нужно пробрасывать вручную.

::note
Заголовки, которые **нельзя пробрасывать**, в запрос **не попадут**, например:
`transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`
::

::tip
[`useFetch`](/docs/4.x/api/composables/use-fetch) под капотом использует `useRequestFetch` для проброса контекста и заголовков.
::

::code-group

```vue [app/pages/index.vue]
<script setup lang="ts">
// Заголовки пользователя уйдут в обработчик `/api/cookies`
// Результат: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// Без проброса
// Результат: { cookies: {} }
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
