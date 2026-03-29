---
title: useLazyAsyncData
description: "Обёртка над useAsyncData: навигация не ждёт завершения запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`useLazyAsyncData` — обёртка над [`useAsyncData`](/docs/3.x/api/composables/use-async-data), которая запускает навигацию до завершения обработчика за счёт `lazy: true`.

::note
По умолчанию [`useAsyncData`](/docs/3.x/api/composables/use-async-data) блокирует навигацию, пока асинхронный обработчик не завершится. `useLazyAsyncData` позволяет перейти по маршруту сразу, а загрузка данных продолжается в фоне.
::

## Использование

```vue [pages/index.vue]
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

С `useLazyAsyncData` навигация происходит до окончания запроса — состояния `pending` и `error` нужно обрабатывать в шаблоне.

::warning
`useLazyAsyncData` — зарезервированное имя компилятора; свою функцию так называть нельзя.
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

Сигнатура совпадает с [`useAsyncData`](/docs/3.x/api/composables/use-async-data).

## Параметры

Те же, что у [`useAsyncData`](/docs/3.x/api/composables/use-async-data), с автоматическим `lazy: true`.

:read-more{to="/docs/3.x/api/composables/use-async-data#parameters"}

## Возвращаемые значения

Те же, что у [`useAsyncData`](/docs/3.x/api/composables/use-async-data).

:read-more{to="/docs/3.x/api/composables/use-async-data#return-values"}

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация произойдёт до завершения загрузки.
  Обрабатывайте состояния 'pending' и 'error' в шаблоне компонента.
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // count может быть null в начале — сразу к данным не обратиться, но за ними можно следить.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Загрузка…' : count }}
  </div>
</template>
```

:read-more{to="/docs/3.x/getting-started/data-fetching"}
