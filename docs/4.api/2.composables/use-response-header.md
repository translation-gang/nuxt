---
title: "useResponseHeader"
description: "Установка заголовка ответа сервера через композабл useResponseHeader."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.14+.
::

Композабл `useResponseHeader` задаёт произвольный заголовок ответа на страницах, в компонентах и в плагинах.

```ts
// Произвольный заголовок ответа
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
```

## Пример

С `useResponseHeader` удобно задавать заголовок ответа для отдельной страницы.

```vue [pages/test.vue]
<script setup>
// файл pages/test.vue
const header = useResponseHeader('X-My-Header')
header.value = 'my-value'
</script>

<template>
  <h1>Тестовая страница с пользовательским заголовком</h1>
  <p>Ответ для маршрута «/test» будет содержать заголовок «X-My-Header».</p>
</template>
```

`useResponseHeader` можно вызывать, например, в [middleware](/docs/3.x/directory-structure/middleware) Nuxt, чтобы задать заголовок ответа для группы страниц.

```ts [middleware/my-header-middleware.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header')
  header.value = 'always'
})
```
