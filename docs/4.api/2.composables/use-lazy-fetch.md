---
title: 'useLazyFetch'
description: 'Обёртка над useFetch: навигация выполняется сразу, без ожидания загрузки.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` — обёртка над [`useFetch`](/docs/4.x/api/composables/use-fetch) с опцией `lazy: true`: навигация выполняется до завершения загрузки.

## Использование

По умолчанию [`useFetch`](/docs/4.x/api/composables/use-fetch) блокирует переход до завершения загрузки. `useLazyFetch` не блокирует: переход происходит сразу, данные подгружаются в фоне.

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    Загрузка ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- ... -->
    </div>
  </div>
</template>
```

::note
Сигнатура `useLazyFetch` совпадает с [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

::warning
await `useLazyFetch` только инициирует запрос. При клиентской навигации данные могут быть ещё не готовы — обрабатывайте состояние `pending` в шаблоне.
::

::warning
`useLazyFetch` — зарезервированное имя, обрабатываемое компилятором; не называйте так свои функции.
::

## Тип

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch` эквивалентен `useFetch` с опцией `lazy: true`. Полные типы — в [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

## Параметры

Те же, что у [`useFetch`](/docs/4.x/api/composables/use-fetch):

- `URL`: URL или объект запроса.
- `options`: опции как у [`useFetch`](/docs/4.x/api/composables/use-fetch#parameters), при этом `lazy` автоматически `true`.

:read-more{to="/docs/4.x/api/composables/use-fetch#parameters"}

## Возвращаемые значения

Тот же объект `AsyncData`, что и у [`useFetch`](/docs/4.x/api/composables/use-fetch):

| Имя      | Тип                                                | Описание |
|----------|----------------------------------------------------|----------|
| `data`   | `Ref<DataT \| undefined>`                          | Результат запроса. |
| `refresh`| `(opts?: AsyncDataExecuteOptions) => Promise<void>`| Ручное обновление данных. |
| `execute`| то же                                              | Алиас для `refresh`. |
| `error`  | `Ref<ErrorT \| undefined>`                          | Ошибка при сбое загрузки. |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | Статус запроса. |
| `clear`  | `() => void`                                       | Сброс данных, ошибки, статуса и отмена запросов. |

:read-more{to="/docs/4.x/api/composables/use-fetch#return-values"}

## Примеры

### Обработка состояния загрузки

```vue [app/pages/index.vue]
<script setup lang="ts">
/* Навигация произойдёт до завершения загрузки.
 * Обрабатывайте состояния 'pending' и 'error' в шаблоне.
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts изначально может быть null — можно следить через watch
})
</script>

<template>
  <div v-if="status === 'pending'">
    Загрузка ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- ... -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
