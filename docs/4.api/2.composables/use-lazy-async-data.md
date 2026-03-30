---
title: useLazyAsyncData
description: Обёртка над useAsyncData: навигация выполняется сразу, без ожидания данных.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` — обёртка над [`useAsyncData`](/docs/4.x/api/composables/use-async-data) с `lazy: true`: навигация не ждёт завершения обработчика.

::note
По умолчанию [`useAsyncData`](/docs/4.x/api/composables/use-async-data) блокирует навигацию до завершения. `useLazyAsyncData` переходит сразу, данные грузятся в фоне.
::

## Использование

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'error'">
      Error loading posts
    </div>
    <div v-else>
      {{ posts }}
    </div>
  </div>
</template>
```

С `useLazyAsyncData` навигация наступает до окончания загрузки — обрабатывайте `pending` и `error` в шаблоне.

::warning
`useLazyAsyncData` — зарезервированное имя компилятора; не называйте свою функцию `useLazyAsyncData`.
::

## Тип

```ts [Signature]
export function useLazyAsyncData<DataT, ErrorT> (
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>

export function useLazyAsyncData<DataT, ErrorT> (
  key: string,
  handler: (ctx?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, ErrorT>
```

Сигнатура как у [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

## Параметры

Как у [`useAsyncData`](/docs/4.x/api/composables/use-async-data), с автоматическим `lazy: true`.

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## Возвращаемые значения

Как у [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## Пример

```vue [app/pages/index.vue]
<script setup lang="ts">
/* Навигация до завершения fetch.
  pending и error — в шаблоне
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count может быть null в начале
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
