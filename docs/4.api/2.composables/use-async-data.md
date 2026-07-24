---
title: 'useAsyncData'
description: 'Доступ к асинхронным данным через SSR-совместимый компосабл.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

В страницах, компонентах и плагинах можно использовать `useAsyncData` для доступа к данным, загружаемым асинхронно.

::note
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) предназначен для вызова в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context). Он возвращает реактивные значения и добавляет ответы в payload Nuxt, чтобы их можно было передать с сервера на клиент **без повторной загрузки при гидрации**.
::

## Использование

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data, status, pending, error, refresh, clear } = await useAsyncData(
  'mountains',
  (_nuxtApp, { signal }) => $fetch('https://api.nuxtjs.dev/mountains', { signal }),
)
</script>
```

::tip{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
Нужен кастомный `useAsyncData` с заданными по умолчанию опциями? Используйте `createUseAsyncData` для создания полностью типизированного композабла. Подробнее в [рецепте кастомного useFetch](/docs/4.x/guide/recipes/custom-usefetch).
::

::note
`await` для `useAsyncData` не обязателен. На сервере Nuxt в любом случае ждёт разрешения промиса перед рендером, поэтому HTML всегда содержит данные. `await` влияет на то, что происходит после вызова: с ним выполнение приостанавливается, пока `data` не заполнится, и клиентская навигация блокируется до готовности данных; без него выполнение продолжается сразу, `data` начинается со значения по умолчанию до завершения запроса, а при клиентской навигации состояния загрузки и ошибки обрабатываются самостоятельно через ref-ы `status` и `error`. Эффект похож на опцию [`lazy`](#parameters), хотя `lazy` — явный способ включить неблокирующую навигацию.
::

::note
`data`, `status`, `pending` и `error` — это ref-ы Vue, к ним нужно обращаться через `.value` внутри `<script setup>`, тогда как `refresh`/`execute` и `clear` — обычные функции.
::

### Отслеживание параметров

Встроенная опция `watch` позволяет автоматически перезапускать функцию загрузки при обнаружении изменений.

```vue [app/pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  (_nuxtApp, { signal }) => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value,
    },
    signal,
  }), {
    watch: [page],
  },
)
</script>
```

### Реактивные ключи

В качестве ключа можно использовать computed ref, обычный ref или getter-функцию — данные будут автоматически обновляться при изменении ключа:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// При смене маршрута и обновлении userId данные будут загружены заново
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

### Отмена обработчика (handler)

Обработчик можно сделать отменяемым, используя `signal` из второго аргумента. Это полезно для отмены запросов при уходе пользователя со страницы. `$fetch` поддерживает abort signals.

```ts [app/pages/index.vue]
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // отменяет текущий $fetch (при dedupe: cancel)
refresh()
clear() // отменяет последний ожидающий обработчик
```

В `refresh`/`execute` можно передать `AbortSignal`, чтобы вручную отменять отдельные запросы.

```ts [app/pages/index.vue]
const { refresh } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)
let abortController: AbortController | undefined

function handleUserAction () {
  abortController = new AbortController()
  refresh({ signal: abortController.signal })
}

function handleCancel () {
  abortController?.abort() // отменяет выполняющийся запрос refresh
}
```

Если ваш `handler` не поддерживает abort signals, можно реализовать свою логику отмены, используя переданный `signal`.

```ts [app/pages/index.vue]
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => {
    return new Promise((resolve, reject) => {
      signal?.addEventListener('abort', () => {
        reject(new Error('Request aborted'))
      })
      return Promise.resolve(callback.call(this, yourHandler)).then(resolve, reject)
    })
  },
)
```

Сигнал обработчика отменяется в случаях:

- Выполняется новый запрос при `dedupe: 'cancel'`
- Вызывается функция `clear`
- Превышено время `options.timeout`

::warning
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) — зарезервированное имя, обрабатываемое компилятором, поэтому не называйте так свою функцию.
::

:read-more{to="/docs/4.x/getting-started/data-fetching#useasyncdata"}

## Параметры

- `key`: уникальный ключ для дедупликации запросов. Если не задан, генерируется по имени файла и строке вызова `useAsyncData`.
- `handler`: асинхронная функция, которая должна возвращать значение (не `undefined` и не `null`), иначе запрос может дублироваться на клиенте.
::warning
Функция `handler` должна быть **без побочных эффектов** для предсказуемого поведения при SSR и гидрации. Для побочных эффектов используйте утилиту [`callOnce`](/docs/4.x/api/utils/call-once).
::
- `options`:
  - `server`: выполнять ли загрузку на сервере (по умолчанию `true`)
  - `lazy`: разрешать ли асинхронную функцию после перехода по маршруту, не блокируя навигацию (по умолчанию `false`)
  - `immediate`: при `false` запрос не выполняется сразу (по умолчанию `true`)
  - `default`: фабрика значения по умолчанию для `data` до завершения асинхронной функции; полезна при `lazy: true` или `immediate: false`
  - `transform`: функция для изменения результата `handler` после загрузки
  - `getCachedData`: функция, возвращающая кэшированные данные. Значение `undefined` запускает загрузку. По умолчанию:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    Кэширование работает только при включённой опции `experimental.payloadExtraction` в `nuxt.config`.
  - `pick`: выбрать из результата `handler` только указанные в массиве ключи
  - `watch`: отслеживать реактивные источники для автообновления
  - `deep`: возвращать данные в виде глубокого ref (по умолчанию `false` — shallow ref, что может улучшить производительность)
  - `dedupe`: не выполнять повторный запрос с тем же ключом одновременно (по умолчанию `cancel`). Варианты:
    - `cancel` — отменяет текущие запросы при новом
    - `defer` — не создаёт новый запрос, пока есть ожидающий
  - `timeout` — таймаут в миллисекундах (по умолчанию `undefined`)

::note
При `lazy: false` внутри используется `<Suspense>`, блокирующий переход до загрузки данных. Для более отзывчивого интерфейса рассмотрите `lazy: true` и индикатор загрузки.
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
`useLazyAsyncData` даёт то же поведение, что и `useAsyncData` с `lazy: true`.
::

:video-accordion{title="Видео от Alexander Lichter про кэширование на клиенте с getCachedData" videoId="aQPR0xn-MMk"}

### Общее состояние и согласованность опций

При одном и том же ключе в нескольких вызовах `useAsyncData` они разделяют одни и те же ref-ы `data`, `error`, `status` и `pending`. Для согласованности между компонентами опции должны совпадать.

Эти опции **должны совпадать** во всех вызовах с одним ключом:
- функция `handler`
- опция `deep`
- функция `transform`
- массив `pick`
- функция `getCachedData`
- значение `default`

Эти опции **могут отличаться** без предупреждений:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ Вызовет предупреждение в режиме разработки
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ Допустимо
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
Состояние с ключом, созданное через `useAsyncData`, можно получить в приложении с помощью [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data).
::

## Возвращаемые значения

- `data`: результат переданной асинхронной функции.
- `refresh`/`execute`: функция для повторной загрузки данных из `handler`.
- `error`: объект ошибки при неудачной загрузке.
- `status`: статус запроса:
  - `idle`: запрос не начат (например, при `{ immediate: false }` до вызова `execute` или при `{ server: false }` на сервере)
  - `pending`: запрос выполняется
  - `success`: запрос успешно завершён
  - `error`: запрос завершился с ошибкой
- `pending`: `Ref<boolean>`, равен `true`, пока выполняется запрос (т.е. пока `status.value === 'pending'`).
- `clear`: функция сброса `data` в `undefined` (или в `options.default()`), `error` в `undefined`, установки `status` в `idle` и отмены ожидающих запросов.

По умолчанию Nuxt ждёт завершения `refresh`, прежде чем выполнить его снова.

::note
Если данные не загружались на сервере (например, при `server: false`), они не будут загружены до завершения гидрации. То есть даже при `await useAsyncData` на клиенте `data` останется `undefined` внутри `<script setup>`.
::

## Тип

```ts [Signature]
export type AsyncDataHandler<ResT> = (nuxtApp: NuxtApp, options: { signal: AbortSignal }) => Promise<ResT>

export function useAsyncData<ResT, DataE = unknown, DataT = ResT> (
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>
export function useAsyncData<ResT, DataE = unknown, DataT = ResT> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<ResT>,
  options?: AsyncDataOptions<ResT, DataT>,
): AsyncData<DataT, DataE> & Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<ResT, DataT = ResT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT>
  transform?: (input: ResT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: MultiWatchSources
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  timeout?: number
  enabled?: MaybeRefOrGetter<boolean>
}

type AsyncDataRequestContext = {
  /** The reason for this data request */
  cause: 'initial' | 'refresh:manual' | 'refresh:hook' | 'watch'
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | undefined>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | undefined>
  status: Ref<AsyncDataRequestStatus>
  pending: Ref<boolean>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  signal?: AbortSignal
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/4.x/getting-started/data-fetching"}

## Parameters

- `key`: a unique key to ensure that data fetching can be properly de-duplicated across requests. If you do not provide a key, then a key that is unique to the file name and line number of the instance of `useAsyncData` will be generated for you.
- `handler`: an asynchronous function that must return a truthy value (for example, it should not be `undefined` or `null`) or the request may be duplicated on the client side.
::warning
The `handler` function should be **side-effect free** to ensure predictable behavior during SSR and CSR hydration. If you need to trigger side effects, use the [`callOnce`](/docs/4.x/api/utils/call-once) utility to do so.
::
- `options` (object): Configuration for the asynchronous function call. All options can be a static value, a `ref`, or a computed value.

| Option                                                                    | Type                                        | Default    | Description                                                                                                                                                                                                                                                                          |
|---------------------------------------------------------------------------|---------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `server`                                                                  | `boolean`                                   | `true`     | Whether to call the function on the server.                                                                                                                                                                                                                                          |
| `lazy`                                                                    | `boolean`                                   | `false`    | If true, resolves after route loads (does not block navigation).                                                                                                                                                                                                                     |
| `immediate`                                                               | `boolean`                                   | `true`     | If false, prevents function from being called immediately.                                                                                                                                                                                                                           |
| `default`                                                                 | `() => DataT`                               | -          | Factory for default value of `data` before async resolves.                                                                                                                                                                                                                           |
| `timeout` :badge[v4.2]{color="info" size="xs" class="align-middle"}       | `number`                                    | -          | A number in milliseconds to wait before timing out the call (defaults to `undefined`, which means no timeout)                                                                                                                                                                        |
| `transform`                                                               | `(input: DataT) => DataT \| Promise<DataT>` | -          | Function to transform the result after resolving.                                                                                                                                                                                                                                    |
| `getCachedData` :badge[v3.8]{color="info" size="xs" class="align-middle"} | `(key, nuxtApp, ctx) => DataT \| undefined` | -          | Function to return cached data. See below for default.                                                                                                                                                                                                                               |
| `pick`                                                                    | `string[]`                                  | -          | Only pick specified keys from the result.                                                                                                                                                                                                                                            |
| `watch`                                                                   | `MultiWatchSources`                         | -          | Array of reactive sources to watch and auto-refresh.                                                                                                                                                                                                                                 |
| `deep` :badge[v3.8]{color="info" size="xs" class="align-middle"}          | `boolean`                                   | `false`    | Return data in a deep ref object. Defaults to `false` for improved performance (shallow ref object).                                                                                                                                                                                 |
| `dedupe` :badge[v3.9]{color="info" size="xs" class="align-middle"}        | `'cancel' \| 'defer'`                       | `'cancel'` | Policy when triggering an execution more than once at a time.                                                                                                                                                                                                                        |
| `enabled` :badge[v4.5]{color="info" size="xs" class="align-middle"}       | `boolean`                                   | `true`     | Barrier that gates whether the `handler` may run. While `false`, every execution is blocked (initial fetch, `execute`/`refresh`, and watch triggers), and switching `true` → `false` cancels any in-flight request without clearing `data`. Re-enabling does not refetch on its own. |

::note
All options can be given a `computed` or `ref` value. These will be watched and new requests made automatically with any new values if they are updated.
::

**getCachedData default:**

```ts [Default getCachedData Implementation]
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
This only caches data when `experimental.payloadExtraction` in `nuxt.config` is enabled.

::note
Under the hood, `lazy: false` uses `<Suspense>` to block the loading of the route before the data has been fetched. Consider using `lazy: true` and implementing a loading state instead for a snappier user experience.
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
You can use `useLazyAsyncData` to have the same behavior as `lazy: true` with `useAsyncData`.
::

:video-accordion{title="Watch a video from Alexander Lichter about client-side caching with getCachedData" videoId="aQPR0xn-MMk"}

### Shared State and Option Consistency

When multiple `useAsyncData` calls use the same key, they share the same `data`, `error`, `status`, and `pending` refs. Keep the options listed below consistent across these calls.

The following options **must be consistent** across all calls with the same key:
- `handler` function
- `deep` option
- `transform` function
- `pick` array
- `getCachedData` function
- `default` value

The following options **can differ** without triggering warnings:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`
- `enabled`

```ts [app/pages/index.vue]
// ❌ This will trigger a development warning
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ This is allowed
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
Keyed state created using `useAsyncData` can be retrieved across your Nuxt application using [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data).
::

## Return Values

This composable returns a `Promise` that can be awaited, which makes it possible to use `data` directly within the `<script setup>` (i.e. a value will be present, instead of being undefined). You can also directly pull the values without awaiting the return value, in which case `data` can be undefined within `<script setup>` until the fetch completes.

::tip
Even if you do not await the return value, during SSR Nuxt will wait for the request to finish and send the resolved data to the client.
::

::note
If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await [`useAsyncData`](/docs/4.x/api/composables/use-async-data) on the client side, `data` will remain `undefined` within `<script setup>`.
::

| Name      | Type                                                | Description                                                                                                                                                       |
|-----------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`    | `Ref<DataT \| undefined>`                           | The result of the asynchronous function that is passed in.                                                                                                        |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Function to manually refresh the data. By default, Nuxt waits until a `refresh` is finished before it can be executed again.                                      |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Alias for `refresh`.                                                                                                                                              |
| `error`   | `Ref<ErrorT \| undefined>`                          | Error object if the asynchronous function threw an error.                                                                                                         |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | Status of the asynchronous function call. Use it to distinguish `idle`, `pending`, `success`, and `error`.                                                        |
| `pending` | `Ref<boolean>`                                      | `true` while a request is in flight. With [`experimental.pendingWhenIdle`](/docs/4.x/guide/going-further/experimental-features#pendingwhenidle), it is also `true` when `status` is `idle` and no cached data is available. |
| `clear`   | `() => void`                                        | Resets `data` to `undefined` (or the value of `options.default()` if provided), `error` to `undefined`, set `status` to `idle`, and cancels any pending calls.    |

::tip
Functions from the `Promise` (`then`, `catch`, and `finally`) can safely be destructured, if you did not await the return value.
::

### Status Values

- `idle`: Function has not been called yet (e.g. `{ immediate: false }` or `{ server: false }` on server render)
- `pending`: Function has been called and the promise is pending
- `success`: Function returned a value
- `error`: Function threw an error
