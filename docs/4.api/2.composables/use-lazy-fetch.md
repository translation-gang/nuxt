---
title: 'useLazyFetch'
description: Обёртка над useFetch: навигация выполняется сразу, без ожидания данных.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`useLazyFetch` — обёртка над [`useFetch`](/docs/4.x/api/composables/use-fetch) с `lazy: true`: навигация не ждёт завершения обработчика.

## Использование

По умолчанию [`useFetch`](/docs/4.x/api/composables/use-fetch) блокирует навигацию до завершения запроса. `useLazyFetch` позволяет перейти сразу, данные подгружаются в фоне.

```vue [app/pages/index.vue]
<script setup lang="ts">
const { status, data: posts } = await useLazyFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

::note
Сигнатура такая же, как у [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

::warning
`await useLazyFetch` гарантирует только инициализацию. При клиентской навигации данные могут быть ещё недоступны — обрабатывайте `pending` в шаблоне.
::

::warning
`useLazyFetch` — зарезервированное имя, преобразуемое компилятором; не называйте свою функцию `useLazyFetch`.
::

## Тип

```ts [Signature]
export function useLazyFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>
```

::note
Эквивалент `useFetch` с `lazy: true`. Полные типы — в [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

## Параметры

Те же, что у [`useFetch`](/docs/4.x/api/composables/use-fetch):

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): URL или запрос.
- `options`: как в [`useFetch`](/docs/4.x/api/composables/use-fetch#parameters), с автоматическим `lazy: true`.

:read-more{to="/docs/4.x/api/composables/use-fetch#parameters"}

## Возвращаемые значения

Тот же объект `AsyncData`, что у [`useFetch`](/docs/4.x/api/composables/use-fetch):

| Name      | Type                                                | Description                                                                                                      |
|-----------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | Результат асинхронного запроса.                                                                                  |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Ручное обновление данных.                                                                                        |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Синоним `refresh`.                                                                                               |
| `error`   | `Ref<ErrorT \| undefined>`                          | Ошибка, если запрос не удался.                                                                                   |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | Статус запроса.                                                                                                  |
| `pending` | `Ref<boolean>`                                      | Идёт ли запрос.                                                                                                  |
| `clear`   | `() => void`                                        | Сбрасывает `data` и `error`, ставит `status` в `idle`, отменяет висящие запросы.                                 |

:read-more{to="/docs/4.x/api/composables/use-fetch#return-values"}

## Примеры

### Состояние pending

```vue [app/pages/index.vue]
<script setup lang="ts">
/* Навигация до завершения fetch.
 * Состояния pending и error — в шаблоне компонента
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // posts может быть null в начале — следите через watch
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}
