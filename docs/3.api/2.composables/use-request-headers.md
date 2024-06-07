---
title: "useRequestHeaders"
description: "Используйте useRequestHeaders, чтобы получить доступ к заголовкам входящих запросов."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Вы можете использовать встроенный компонент [`useRequestHeaders`](/docs/api/composables/use-request-headers) для доступа к заголовкам входящих запросов на ваших страницах, в компонентах и плагинах.

```js
// Получите все заголовки запросов
const headers = useRequestHeaders()

// Получите только заголовок запроса cookie
const headers = useRequestHeaders(['cookie'])
```

::tip
В браузере `useRequestHeaders` вернет пустой объект.
::

## Пример

Мы можем использовать `useRequestHeaders` для доступа и проксирования заголовка `authorization` первоначального запроса к любым последующим внутренним запросам во время SSR.

Пример ниже добавляет заголовок запроса `authorization` к изоморфному вызову `$fetch`.

```vue [pages/some-page.vue]
<script setup lang="ts">
const { data } = await useFetch('/api/confidential', {
  headers: useRequestHeaders(['authorization'])
})
</script>
```
