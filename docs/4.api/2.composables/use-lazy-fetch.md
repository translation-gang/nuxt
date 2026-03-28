---
title: 'useLazyFetch'
description: "Обёртка над useFetch: навигация не ждёт завершения запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## Описание

По умолчанию [`useFetch`](/docs/3.x/api/composables/use-fetch) блокирует навигацию до разрешения своего асинхронного обработчика. `useLazyFetch` — обёртка над [`useFetch`](/docs/3.x/api/composables/use-fetch): навигация не ждёт завершения обработчика, потому что задано `lazy: true`.

::note
`useLazyFetch` имеет ту же сигнатуру, что и [`useFetch`](/docs/3.x/api/composables/use-fetch).
::

::note
`await useLazyFetch` в этом режиме лишь гарантирует инициализацию вызова. При клиентской навигации данные могут появиться не сразу — обрабатывайте состояние `pending` в интерфейсе.
::

:read-more{to="/docs/3.x/api/composables/use-fetch"}

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация будет происходить до завершения получения данных.
  Обрабатывайте состояния 'pending' и 'error' непосредственно в шаблоне вашего компонента
*/
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // Поначалу posts может быть null — сразу к данным не обратиться, но за ними можно следить.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Загрузка…
  </div>
  <div v-else>
    <div v-for="(post, index) in posts" :key="index">
      <!-- обработка элемента post -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` — зарезервированное имя компилятора; свою функцию так называть нельзя.
::

:read-more{to="/docs/3.x/getting-started/data-fetching"}
