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

::warning{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetchuseasyncdata"}
При использовании собственной обёртки `useAsyncData` не вызывайте в ней `await` — это может привести к неожиданному поведению. См. рецепт кастомного загрузчика асинхронных данных.
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

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // отменяет текущий $fetch (при dedupe: cancel)
refresh()
clear() // отменяет последний ожидающий обработчик
```

В `refresh`/`execute` можно передать `AbortSignal`, чтобы вручную отменять отдельные запросы.

```ts
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

```ts
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

export function useAsyncData<DataT, DataE> (
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE>
export function useAsyncData<DataT, DataE> (
  key: MaybeRefOrGetter<string>,
  handler: AsyncDataHandler<DataT>,
  options?: AsyncDataOptions<DataT>,
): Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: MultiWatchSources | false
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  timeout?: number
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
