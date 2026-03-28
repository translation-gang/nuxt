---
title: "useRequestHeaders"
description: "Доступ к заголовкам входящего запроса через композабл useRequestHeaders."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Композабл `useRequestHeaders` возвращает заголовки входящего HTTP-запроса на страницах, в компонентах и плагинах.

```js
// Все заголовки запроса
const headers = useRequestHeaders()

// Только заголовок Cookie
const headers = useRequestHeaders(['cookie'])
```

::tip
В браузере `useRequestHeaders` возвращает пустой объект.
::

## Пример

`useRequestHeaders` можно использовать, чтобы передать заголовок `authorization` исходного запроса во внутренние запросы во время SSR.

Ниже этот заголовок добавляется к изоморфному вызову `$fetch`.

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
