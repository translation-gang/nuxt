---
title: useLazyAsyncData
description: 'Обёртка над useAsyncData: навигация выполняется сразу, без ожидания данных.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` — обёртка над [`useAsyncData`](/docs/4.x/api/composables/use-async-data) с опцией `lazy: true`: навигация выполняется до завершения загрузки данных.

::note
По умолчанию [`useAsyncData`](/docs/4.x/api/composables/use-async-data) блокирует навигацию до завершения обработчика. `useLazyAsyncData` не блокирует: навигация сразу, загрузка идёт в фоне.
::

## Использование

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyAsyncData('posts', () => $fetch('/api/posts'))
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      Загрузка…
    </div>
    <div v-else-if="status === 'error'">
      Ошибка загрузки постов
    </div>
    <div v-else>
      {{ posts }}
    </div>
  </div>
</template>
```

При использовании `useLazyAsyncData` навигация происходит до завершения загрузки — обрабатывайте состояния `pending` и `error` в шаблоне компонента.

::warning
`useLazyAsyncData` — зарезервированное имя, обрабатывается компилятором; не называйте так свою функцию.
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

Сигнатура совпадает с [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

## Параметры

Те же, что у [`useAsyncData`](/docs/4.x/api/composables/use-async-data); опция `lazy` автоматически устанавливается в `true`.

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## Возвращаемые значения

Возвращаемые значения совпадают с [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## Пример

```vue [app/pages/index.vue]
<script setup lang="ts">
// Навигация произойдёт до завершения загрузки — обрабатывайте pending/error в шаблоне
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count изначально может быть null — сразу обратиться к содержимому нельзя, но можно следить через watch
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Загрузка…' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
