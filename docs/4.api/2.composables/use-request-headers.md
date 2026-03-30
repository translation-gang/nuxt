---
title: "useRequestHeaders"
description: "useRequestHeaders даёт доступ к заголовкам входящего запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Встроенный [`useRequestHeaders`](/docs/4.x/api/composables/use-request-headers) читает заголовки входящего запроса на страницах, в компонентах и плагинах.

```ts
// Все заголовки запроса
const headers = useRequestHeaders()

// Только cookie
const { cookie } = useRequestHeaders(['cookie'])
```

::tip
В браузере `useRequestHeaders` возвращает пустой объект.
::

## Пример

Проксирование заголовка `authorization` с первого запроса во внутренние запросы при SSR.

Ниже — изоморфный вызов `$fetch` с этим заголовком.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization']),
})
</script>
```
