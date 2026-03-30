---
title: 'useFetch'
description: 'Загрузка данных с API в SSR-friendly композабле.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

Удобная обёртка над [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`$fetch`](/docs/4.x/api/utils/dollarfetch).
Автоматически строит ключ из URL и опций fetch, подсказывает типы URL по серверным маршрутам и выводит тип ответа API.

::note
`useFetch` вызывают в `setup`, плагине или route middleware. Возвращает реактивные ссылки и кладёт ответ в payload Nuxt, чтобы при гидратации не запрашивать те же данные снова на клиенте.
::

## Использование

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title'],
})
</script>
```

::warning{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata"}
Если у вас своя обёртка `useFetch`, не используйте `await` внутри неё — возможны сюрпризы. См. рецепт про кастомный fetcher.
::

::note
`data`, `status` и `error` — это Vue refs; в `<script setup>` обращайтесь через `.value`. `refresh`/`execute` и `clear` — обычные функции.
::

Опция `query` из [unjs/ofetch](https://github.com/unjs/ofetch), URL собирается через [unjs/ufo](https://github.com/unjs/ufo). Объекты сериализуются в строку запроса.

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

В итоге URL вида `https://api.nuxt.com/modules?param1=value1&param2=value2`.

Можно использовать [интерцепторы](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors):

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // Заголовки запроса
    // нужен ofetch >= 1.4.0 — при необходимости обновите lockfile
    options.headers.set('Authorization', '...')
  },
  onRequestError ({ request, options, error }) {
    // Ошибки запроса
  },
  onResponse ({ request, response, options }) {
    // Обработка ответа
    localStorage.setItem('token', response._data.token)
  },
  onResponseError ({ request, response, options }) {
    // Ошибки ответа
  },
})
```

### Реактивные ключи и общее состояние

URL можно передать как `computed` или `ref` — при смене URL данные перезапрашиваются:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

Одинаковый URL и опции в разных компонентах дают общие `data`, `error` и `status`.

::tip
Состояние по ключу можно читать через [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data).
::

::warning
`useFetch` — зарезервированное имя компилятора; не называйте свою функцию `useFetch`.
::

::warning
Если из `useFetch` в `data` приходит строка вместо JSON-объекта, проверьте, нет ли `import { useFetch } from '@vueuse/core'`.
::

:video-accordion{title="Видео Александра Лихтера: как не ошибаться с useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/4.x/getting-started/data-fetching"}

### Реактивные опции fetch

Опции могут быть реактивными (`computed`, `ref`, [геттеры](https://vuejs.org/guide/essentials/computed)). При обновлении выполняется повторный запрос с новыми значениями.

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// повторный запрос: /api/search?q=new%20search
searchQuery.value = 'new search'
```

Отключить отслеживание: `watch: false`:

```ts
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false,
})
searchQuery.value = 'new search'
```

## Тип

```ts [Signature]
export function useFetch<DataT, ErrorT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<DataT>,
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
  timeout?: MaybeRefOrGetter<number>
}

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | undefined>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

## Параметры

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): URL или `Request`, ref или функция. Реактивно для динамических эндпоинтов.

- `options`: настройки запроса. Расширяет [unjs/ofetch](https://github.com/unjs/ofetch) и [`AsyncDataOptions`](/docs/4.x/api/composables/use-async-data#params). Значение, `ref` или computed.

| Option          | Type                                                                    | Default    | Description                                                                                                      |
|-----------------|-------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------|
| `key`           | `MaybeRefOrGetter<string>`                                              | auto-gen   | Ключ дедупликации; если не задан — из URL и опций.                                                               |
| `method`        | `MaybeRefOrGetter<string>`                                              | `'GET'`    | HTTP-метод.                                                                                                      |
| `query`         | `MaybeRefOrGetter<SearchParams>`                                        | -          | Query-параметры. Алиас: `params`.                                                                                |
| `params`        | `MaybeRefOrGetter<SearchParams>`                                        | -          | Алиас для `query`.                                                                                               |
| `body`          | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -          | Тело запроса; объекты сериализуются.                                                                             |
| `headers`       | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -          | Заголовки запроса.                                                                                               |
| `baseURL`       | `MaybeRefOrGetter<string>`                                              | -          | Базовый URL.                                                                                                     |
| `timeout`       | `MaybeRefOrGetter<number>`                                              | -          | Таймаут в мс.                                                                                                    |
| `cache`         | `boolean \| string`                                                     | -          | Кэш: `boolean` или значения Fetch API: `default`, `no-store` и т.д.                                              |
| `server`        | `boolean`                                                               | `true`     | Выполнять ли запрос на сервере.                                                                                  |
| `lazy`          | `boolean`                                                               | `false`    | Не блокировать навигацию до завершения.                                                                          |
| `immediate`     | `boolean`                                                               | `true`     | `false` — не слать запрос сразу.                                                                               |
| `default`       | `() => DataT`                                                           | -          | Значение `data` до завершения async.                                                                             |
| `timeout`       | `number`                                                                | -          | Таймаут в мс (`undefined` — без таймаута).                                                                       |
| `transform`     | `(input: DataT) => DataT \| Promise<DataT>`                             | -          | Преобразование результата после получения.                                                                       |
| `getCachedData` | `(key, nuxtApp, ctx) => DataT \| undefined`                             | -          | Возврат кэшированных данных. См. ниже.                                                                           |
| `pick`          | `string[]`                                                              | -          | Оставить только перечисленные ключи результата.                                                                  |
| `watch`         | `MultiWatchSources \| false`                                            | -          | Источники для автообновления; `false` отключает.                                                                |
| `deep`          | `boolean`                                                               | `false`    | Глубокий ref для `data`.                                                                                         |
| `dedupe`        | `'cancel' \| 'defer'`                                                   | `'cancel'` | Не дублировать параллельные запросы с тем же ключом.                                                             |
| `$fetch`        | `typeof globalThis.$fetch`                                              | -          | Своя реализация $fetch. См. [Custom useFetch](/docs/4.x/guide/recipes/custom-usefetch)                            |

::note
Любая опция fetch может быть `computed` или `ref` — при изменении уйдёт новый запрос.
::

**Значение `getCachedData` по умолчанию:**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
Кэш только при включённом `experimental.payloadExtraction` в `nuxt.config`.

## Возвращаемые значения

| Name      | Type                                                | Description                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | Результат асинхронного запроса.                                                                                                                                   |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Ручное обновление. По умолчанию Nuxt ждёт завершения предыдущего `refresh`.                                                                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Синоним `refresh`.                                                                                                                                                |
| `error`   | `Ref<ErrorT \| undefined>`                          | Ошибка при неудаче.                                                                                                                                               |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | Статус запроса. См. ниже.                                                                                                                                         |
| `pending` | `Ref<boolean>`                                      | `true`, пока идёт запрос.                                                                                                                                         |
| `clear`   | `() => void`                                        | Сброс `data` в `undefined` (или `options.default()`), `error`, `status` → `idle`, отмена висящих запросов.                                                        |

### Значения status

- `idle`: запрос ещё не начат (`immediate: false` или `server: false` на SSR)
- `pending`: запрос выполняется
- `success`: успех
- `error`: ошибка

::note
Если на сервере данные не запрашивались (`server: false`), fetch до конца гидратации не пойдёт. Даже при `await useFetch` на клиенте в `<script setup>` `data` останется `null`.
::

### Примеры

:link-example{to="/docs/4.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/4.x/examples/features/data-fetching"}
