---
title: "useResponseHeader"
description: "Используйте useResponseHeader, чтобы установить заголовок ответа сервера."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Этот композабл доступен в Nuxt v3.14+.
::

Вы можете использовать встроенный композабл [`useResponseHeader`](/docs/api/composables/use-response-header) для установки любого заголовка ответа сервера на ваших страницах, в компонентах и плагинах.

```ts
// Задайте пользовательский заголовок ответа
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
```

## Пример

Мы можем использовать `useResponseHeader`, чтобы легко установить заголовок ответа на основе каждой страницы.

```vue [pages/test.vue]
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
</script>

<template>
  <h1>Тестовая страница с пользовательским заголовком</h1>
  <p>Ответ от сервера для этой "/test" страницы будет содержать пользовательский заголовок "X-My-Header"</p>
</template>
```

Мы можем использовать `useResponseHeader`, например, в Nuxt [middleware](/docs/guide/directory-structure/middleware), чтобы установить заголовок ответа для всех страниц.

```ts [middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header');
  header.value = `I'm Always here!`;
});

```
