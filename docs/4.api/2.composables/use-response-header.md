---
title: "useResponseHeader"
description: "useResponseHeader задаёт заголовок ответа сервера."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Доступен в Nuxt v3.14+.
::

Встроенный [`useResponseHeader`](/docs/4.x/api/composables/use-response-header) задаёт любой заголовок ответа на страницах, в компонентах и плагинах.

```ts
// Произвольный заголовок ответа
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
```

## Пример

Заголовок ответа на уровне страницы:

```vue [app/pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>Test page with custom header</h1>
  <p>The response from the server for this "/test" page will have a custom "X-My-Header" header.</p>
</template>
```

В [middleware](/docs/4.x/directory-structure/app/middleware) — заголовок для всех страниц:

```ts [app/middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header')
  header.value = `I'm Always here!`
})
```
