---
title: 'useLazyFetch'
description: Эта обертка вокруг useFetch запускает навигацию немедленно.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

## Описание

По умолчанию [`useFetch`](/docs/api/composables/use-fetch) блокирует навигацию до разрешения своего асинхронного обработчика. `useLazyFetch` предоставляет обертку вокруг [`useFetch`](/docs/api/composables/use-fetch), которая запускает навигацию до разрешения обработчика, установив опцию `lazy` в `true`.

::note
`useLazyFetch` имеет ту же сигнатуру, что и [`useFetch`](/docs/api/composables/use-fetch).
::

::note
Awaiting `useLazyFetch` in this mode only ensures the call is initialized. On client-side navigation, data may not be immediately available, and you should make sure to handle the pending state in your app.
::

:read-more{to="/docs/api/composables/use-fetch"}

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация будет происходить до завершения получения данных.
  Обрабатывайте состояния 'pending' и 'error' непосредственно в шаблоне вашего компонента
*/
const { pending, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // Поскольку posts может быть изначально равным null, у вас не будет доступа
  // к его содержимому сразу, но вы сможете наблюдать за ним.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- Сделай что-нибудь -->
    </div>
  </div>
</template>
```

::note
`useLazyFetch` - это зарезервированное имя функции, которое трансформируется компилятором, поэтому вы не должны называть свою собственную функцию `useLazyFetch`.
::

:read-more{to="/docs/getting-started/data-fetching"}
