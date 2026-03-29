---
title: 'useLazyFetch'
description: "Обёртка над useFetch: навигация не ждёт завершения запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` — обёртка над [`useFetch`](/docs/3.x/api/composables/use-fetch), которая запускает навигацию до завершения обработчика за счёт `lazy: true`.

## Использование

По умолчанию [`useFetch`](/docs/3.x/api/composables/use-fetch) блокирует навигацию до завершения асинхронного обработчика. `useLazyFetch` позволяет сразу перейти по маршруту, пока данные подгружаются в фоне.

```vue [pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    Загрузка…
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- обработка post -->
    </div>
  </div>
</template>
```

::note
Сигнатура `useLazyFetch` совпадает с [`useFetch`](/docs/3.x/api/composables/use-fetch).
::

::warning
`await useLazyFetch` лишь инициализирует вызов. При клиентской навигации данные могут быть недоступны сразу — обрабатывайте `pending` в шаблоне.
::

::warning
`useLazyFetch` — зарезервированное имя компилятора; свою функцию так называть нельзя.
::

## Тип

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
`useLazyFetch` эквивалентен `useFetch` с `lazy: true`. Полные типы см. в [`useFetch`](/docs/3.x/api/composables/use-fetch).
::

## Параметры

Как у [`useFetch`](/docs/3.x/api/composables/use-fetch):

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): адрес или `Request`.
- `options` (object): как в [`useFetch`](/docs/3.x/api/composables/use-fetch#parameters), с автоматическим `lazy: true`.

:read-more{to="/docs/3.x/api/composables/use-fetch#parameters"}

## Возвращаемые значения

Тот же объект `AsyncData`, что у [`useFetch`](/docs/3.x/api/composables/use-fetch):

| Имя | Тип | Описание |
| --- | --- | --- |
| `data` | `Ref<DataT \| undefined>` | Результат асинхронного запроса. |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Ручное обновление. |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Синоним `refresh`. |
| `error` | `Ref<ErrorT \| undefined>` | Ошибка при неудаче. |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | Статус запроса. |
| `pending` | `Ref<boolean>` | `true`, пока запрос выполняется. |
| `clear` | `() => void` | Сброс `data`, `error`, `status`, отмена ожидающих запросов. |

:read-more{to="/docs/3.x/api/composables/use-fetch#return-values"}

## Примеры

### Состояние загрузки

```vue [pages/index.vue]
<script setup lang="ts">
/* Навигация до завершения загрузки.
 * Обрабатывайте 'pending' и 'error' в шаблоне.
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts может быть null в начале — за данными можно следить через watch.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Загрузка…
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- обработка post -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/3.x/getting-started/data-fetching"}
