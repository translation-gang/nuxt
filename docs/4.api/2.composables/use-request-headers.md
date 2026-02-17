---
title: "useRequestHeaders"
description: "Доступ к заголовкам входящего запроса."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Встроенный композабл [`useRequestHeaders`](/docs/4.x/api/composables/use-request-headers) даёт доступ к заголовкам входящего запроса в страницах, компонентах и плагинах.

```ts
// все заголовки запроса
const headers = useRequestHeaders()

// только заголовок cookie
const { cookie } = useRequestHeaders(['cookie'])
```

::tip
В браузере `useRequestHeaders` возвращает пустой объект.
::

## Пример

С помощью `useRequestHeaders` можно взять заголовок `authorization` из исходного запроса и передать его во внутренние запросы при SSR.

В примере заголовок `authorization` добавляется к изоморфному вызову `$fetch`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization']),
})
</script>
```
