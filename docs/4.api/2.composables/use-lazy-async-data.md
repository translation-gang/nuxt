---
title: useLazyAsyncData
description: 'Обёртка над useAsyncData: навигация выполняется сразу, без ожидания данных.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` provides a wrapper around [`useAsyncData`](/docs/4.x/api/composables/use-async-data) that triggers navigation before the handler is resolved by setting the `lazy` option to `true`.

::note
By default, [`useAsyncData`](/docs/4.x/api/composables/use-async-data) blocks navigation until its async handler is resolved. `useLazyAsyncData` allows navigation to occur immediately while data fetching continues in the background.
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

When using `useLazyAsyncData`, navigation will occur before fetching is complete. This means you must handle `pending` and `error` states directly within your component's template.

::warning
`useLazyAsyncData` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyAsyncData`.
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

`useLazyAsyncData` has the same signature as [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

## Параметры

`useLazyAsyncData` accepts the same parameters as [`useAsyncData`](/docs/4.x/api/composables/use-async-data), with the `lazy` option automatically set to `true`.

:read-more{to="/docs/4.x/api/composables/use-async-data#parameters"}

## Возвращаемые значения

`useLazyAsyncData` returns the same values as [`useAsyncData`](/docs/4.x/api/composables/use-async-data).

:read-more{to="/docs/4.x/api/composables/use-async-data#return-values"}

## Пример

```vue [app/pages/index.vue]
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
  Handle 'pending' and 'error' states directly within your component's template
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // Because count might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
