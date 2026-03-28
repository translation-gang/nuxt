---
title: 'useFetch'
description: 'Получение данных из эндпоинта API с помощью SSR-композабла.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

Этот композабл представляет собой удобную обертку для [`useAsyncData`](/docs/api/composables/use-async-data) и [`$fetch`](/docs/api/utils/dollarfetch).
Он автоматически генерирует ключ на основе URL и параметров выборки, предоставляет подсказки типов для url-запроса на основе маршрутов сервера и определяет тип ответа API.

::note
`useFetch` - это композабл, предназначенный для прямого вызова в функции setup, плагине или мидлваре маршрута. Он возвращает реактивные композаблы и обрабатывает добавление ответов в полезную нагрузку Nuxt, чтобы их можно было передавать от сервера к клиенту без повторной выборки данных на стороне клиента, когда на странице происходит гидратация.
::

## Использование

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
Если вы используете пользовательскую обертку `useFetch`, не используйте await внутри нее, так как это может привести к неожиданному поведению. Пожалуйста, следуйте [этому рецепту](/docs/guide/recipes/custom-usefetch#custom-usefetch) для получения дополнительной информации о том, как сделать пользовательскую асинхронную функцию для получения данных.
::

::note
`data`, `status` и `error` - это ref из Vue, и к ним следует обращаться с помощью `.value` при использовании внутри `<script setup>`, а `refresh`/`execute` и `clear` - это обычные функции.
::

Используя свойство `query`, вы можете добавить параметры поиска в запрос. Эта опция расширена из [unjs/ofetch](https://github.com/unjs/ofetch) и использует [unjs/ufo](https://github.com/unjs/ufo) для создания URL. Объекты автоматически превращаются в строку.

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

В результате приведенного выше примера получается `https://api.nuxt.com/modules?param1=value1&param2=value2`.

Вы также можете использовать [перехватчики](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors):

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // Устанавливает заголовки запроса
    // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
    options.headers.set('Authorization', '...')
  },
  onRequestError({ request, options, error }) {
    // Обрабатывает ошибки запроса
  },
  onResponse({ request, response, options }) {
    // Обрабатывает данные ответа
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ request, response, options }) {
    // Обрабатывает ошибки ответа
  }
})
```

### Reactive Keys and Shared State

You can use a computed ref or a plain ref as the URL, allowing for dynamic data fetching that automatically updates when the URL changes:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// When the route changes and id updates, the data will be automatically refetched
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

When using `useFetch` with the same URL and options in multiple components, they will share the same `data`, `error` and `status` refs. This ensures consistency across components.

::tip
Keyed state created using `useFetch` can be retrieved across your Nuxt application using [`useNuxtData`](/docs/api/composables/use-nuxt-data).
::

::warning
`useFetch` - это зарезервированное имя функции, преобразованное компилятором, поэтому вы не должны называть свою функцию `useFetch`.
::

::warning
Если вы столкнулись с тем, что переменная `data`, деструктурированная из `useFetch`, возвращает строку, а не разобранный JSON-объект, убедитесь, что ваш компонент не включает оператор импорта, подобный `import { useFetch } from '@vueuse/core'`.
::

:video-accordion{title="Посмотрите видео от Александра Лихтера, чтобы избежать неправильного использования useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/getting-started/data-fetching"}

## Type

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
}

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

## Parameters

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): The URL or request to fetch. Can be a string, a Request object, a Vue ref, or a function returning a string/Request. Supports reactivity for dynamic endpoints.

- `options` (object): Configuration for the fetch request. Extends [unjs/ofetch](https://github.com/unjs/ofetch) options and [`AsyncDataOptions`](/docs/api/composables/use-async-data#params). All options can be a static value, a `ref`, or a computed value.

| Option | Type | Default | Description |
| ---| --- | --- | --- |
| `key` | `MaybeRefOrGetter<string>` | auto-gen | Unique key for de-duplication. If not provided, generated from URL and options. |
| `method` | `string` | `'GET'` | HTTP request method. |
| `query` | `object` | - | Query/search params to append to the URL. Alias: `params`. Supports refs/computed. |
| `params` | `object` | - | Alias for `query`. |
| `body` | `RequestInit['body'] \| Record<string, any>` | - | Request body. Objects are automatically stringified. Supports refs/computed. |
| `headers` | `Record<string, string> \| [key, value][] \| Headers` | - | Request headers. |
| `baseURL` | `string` | - | Base URL for the request. |
| `timeout` | `number` | - | Timeout in milliseconds to abort the request. |
| `cache` | `boolean \| string` | - | Cache control. Boolean disables cache, or use Fetch API values: `default`, `no-store`, etc. |
| `server` | `boolean` | `true` | Whether to fetch on the server. |
| `lazy` | `boolean` | `false` | If true, resolves after route loads (does not block navigation). |
| `immediate` | `boolean` | `true` | If false, prevents request from firing immediately. |
| `default` | `() => DataT` | - | Factory for default value of `data` before async resolves. |
| `transform` | `(input: DataT) => DataT \| Promise<DataT>` | - | Function to transform the result after resolving. |
| `getCachedData`| `(key, nuxtApp, ctx) => DataT \| undefined` | - | Function to return cached data. See below for default. |
| `pick` | `string[]` | - | Only pick specified keys from the result. |
| `watch` | `MultiWatchSources \| false` | - | Array of reactive sources to watch and auto-refresh. `false` disables watching. |
| `deep` | `boolean` | `true` | Return data in a deep ref object. Set to `false` to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive. |
| `dedupe` | `'cancel' \| 'defer'` | `'cancel'` | Avoid fetching same key more than once at a time. |
| `$fetch` | `typeof globalThis.$fetch` | - | Custom $fetch implementation. |

::note
All fetch options can be given a `computed` or `ref` value. These will be watched and new requests made automatically with any new values if they are updated.
::

**getCachedData default:**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
 ? nuxtApp.payload.data[key] 
 : nuxtApp.static.data[key]
```
This only caches data when `experimental.payloadExtraction` in `nuxt.config` is enabled.

## Return Values

| Name | Type | Description |
| --- | --- |--- |
| `data` | `Ref<DataT \| undefined>` | The result of the asynchronous fetch. |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Function to manually refresh the data. By default, Nuxt waits until a `refresh` is finished before it can be executed again. |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Alias for `refresh`. |
| `error` | `Ref<ErrorT \| undefined>` | Error object if the data fetching failed. |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | Status of the data request. See below for possible values. |
| `clear` | `() => void` | Resets `data` to `undefined` (or the value of `options.default()` if provided), `error` to `null`, set `status` to `idle`, and cancels any pending requests. |

### Status values

- `idle`: Request has not started (e.g. `{ immediate: false }` or `{ server: false }` on server render)
- `pending`: Request is in progress
- `success`: Request completed successfully
- `error`: Request failed

::note
If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await `useFetch` on client-side, `data` will remain null within `<script setup>`.
::

### Examples

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/examples/features/data-fetching"}
