---
title: useLazyAsyncData
description: Это обертка вокруг useAsyncData запускает навигацию немедленно.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## Описание

По умолчанию, [`useAsyncData`](/docs/api/composables/use-async-data) блокирует навигацию до тех пор, пока его асинхронный обработчик не будет разрешен. `useLazyAsyncData` предоставляет обертку[`useAsyncData`](/docs/api/composables/use-async-data), которая запускает навигацию до разрешения обработчика, установив опцию `lazy` в `true`.

::note
`useLazyAsyncData` имеет ту же сигнатуру, что и [`useAsyncData`](/docs/api/composables/use-async-data).
::

:read-more{to="/docs/api/composables/use-async-data"}

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация произойдет до завершения загрузки.
  Обрабатывайте состояния 'pending' и 'error' непосредственно в шаблоне компонента.
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // Поскольку count может быть изначально равным null, вы не сможете получить доступ
  // к его содержимому немедленно, но вы можете наблюдать за ним.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` - это зарезервированное имя функции, которое трансформируется компилятором, поэтому вы не должны называть свою собственную функцию `useLazyAsyncData`.
::

:read-more{to="/docs/getting-started/data-fetching"}
