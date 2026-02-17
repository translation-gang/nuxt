---
title: "useResponseHeader"
description: "Установка заголовка ответа сервера."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.14+.
::

Встроенный [`useResponseHeader`](/docs/4.x/api/composables/use-response-header) задаёт любой заголовок ответа сервера в страницах, компонентах и плагинах.

```ts
// задать свой заголовок ответа
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
```

## Пример

Заголовок ответа для конкретной страницы:

```vue [app/pages/test.vue]
<script setup>
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>Тестовая страница с кастомным заголовком</h1>
  <p>Ответ сервера для страницы "/test" будет содержать заголовок "X-My-Header".</p>
</template>
```

Заголовок для всех страниц через [middleware](/docs/4.x/directory-structure/app/middleware):

```ts [app/middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header')
  header.value = `I'm Always here!`
})
```
