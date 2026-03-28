---
title: useLazyAsyncData
description: "Обёртка над useAsyncData: навигация не ждёт завершения запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

## Описание

По умолчанию [`useAsyncData`](/docs/3.x/api/composables/use-async-data) блокирует навигацию до тех пор, пока его асинхронный обработчик не будет разрешён. `useLazyAsyncData` — обёртка над [`useAsyncData`](/docs/3.x/api/composables/use-async-data), которая запускает навигацию до разрешения обработчика, установив опцию `lazy` в `true`.

::note
`useLazyAsyncData` имеет ту же сигнатуру, что и [`useAsyncData`](/docs/3.x/api/composables/use-async-data).
::

:read-more{to="/docs/3.x/api/composables/use-async-data"}

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация произойдёт до завершения загрузки.
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
    {{ status === 'pending' ? 'Загрузка…' : count }}
  </div>
</template>
```

::warning
`useLazyAsyncData` — зарезервированное имя компилятора; свою функцию так называть нельзя.
::

:read-more{to="/docs/3.x/getting-started/data-fetching"}
