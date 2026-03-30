---
title: 'useAsyncData'
description: Доступ к асинхронным данным в SSR-friendly композабле useAsyncData.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

В страницах, компонентах и плагинах `useAsyncData` загружает данные асинхронно.

::note
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) вызывают в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context). Возвращает реактивные ссылки и кладёт ответ в payload, чтобы при гидратации **не запрашивать те же данные снова на клиенте**.
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
Свою обёртку `useAsyncData` не `await`-те внутри композабла — см. рецепт.
::

::note
`data`, `status`, `pending` и `error` — refs; в `<script setup>` — `.value`. `refresh`/`execute` и `clear` — функции.
::

### Параметр watch

Опция `watch` перезапускает fetcher при изменении источников.

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

Ключ — `computed`, `ref` или геттер: при смене ключа данные перезапрашиваются.

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

### Прерываемый `handler`

Во втором аргументе есть `signal` — для отмены при уходе со страницы и т.п. `$fetch` поддерживает `AbortSignal`.

```ts
const { data, error } = await useAsyncData(
  'users',
  (_nuxtApp, { signal }) => $fetch('/api/users', { signal }),
)

refresh() // при dedupe: cancel отменит текущий $fetch
refresh()
refresh()

clear() // отменит последний висящий handler
```

`AbortSignal` можно передать в `refresh`/`execute`:

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
  abortController?.abort()
}
```

Если handler не поддерживает signal, реализуйте отмену сами:

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

Сигнал handler прерывается при:

- новом запросе с `dedupe: 'cancel'`
- вызове `clear`
- превышении `options.timeout`

::warning
[`useAsyncData`](/docs/4.x/api/composables/use-async-data) — зарезервированное имя; не называйте свою функцию так же.
::

:read-more{to="/docs/4.x/getting-started/data-fetching#useasyncdata"}

## Params

- `key`: уникальный ключ дедупликации между запросами. Если не задан — ключ по файлу и строке вызова.
- `handler`: асинхронная функция, должна вернуть истинное значение (не `undefined`/`null`), иначе на клиенте возможен дубликат запроса.
::warning
`handler` лучше делать **без побочных эффектов** для предсказуемого SSR/CSR. Побочные эффекты — через [`callOnce`](/docs/4.x/api/utils/call-once).
::
- `options`:
  - `server`: грузить на сервере (по умолчанию `true`)
  - `lazy`: разрешить навигацию до завершения (по умолчанию `false`)
  - `immediate`: `false` — не слать запрос сразу (по умолчанию `true`)
  - `default`: фабрика значения `data` до resolve — удобно с `lazy: true` или `immediate: false`
  - `transform`: постобработка результата `handler`
  - `getCachedData`: функция кэша; `undefined` — идти в сеть. По умолчанию:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    Работает при `experimental.payloadExtraction` в `nuxt.config`.
  - `pick`: оставить только перечисленные ключи из результата
  - `watch`: реактивные источники для автообновления
  - `deep`: глубокий ref для `data` (`false` по умолчанию — shallow, быстрее)
  - `dedupe`: не дублировать запросы с тем же ключом (по умолчанию `cancel`):
    - `cancel` — отменяет предыдущий при новом
    - `defer` — не стартует новый, пока висит старый
  - `timeout` — таймаут в мс (`undefined` — без таймаута)

::note
`lazy: false` использует `<Suspense>` и блокирует маршрут до загрузки. Для отзывчивости часто лучше `lazy: true` и свой индикатор загрузки.
::

::read-more{to="/docs/4.x/api/composables/use-lazy-async-data"}
То же, что `lazy: true` с `useAsyncData`, даёт `useLazyAsyncData`.
::

:video-accordion{title="Видео Александра Лихтера про клиентский кэш и getCachedData" videoId="aQPR0xn-MMk"}

### Общее состояние и согласованность опций

Один ключ — общие `data`, `error`, `status`, `pending`. Опции должны быть согласованы.

**Обязаны совпадать** для одного ключа:

- функция `handler`
- `deep`
- `transform`
- массив `pick`
- `getCachedData`
- `default`

**Могут отличаться** без предупреждений:

- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ предупреждение в dev
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: false })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { deep: true })

// ✅ допустимо
const { data: users1 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: true })
const { data: users2 } = useAsyncData('users', (_nuxtApp, { signal }) => $fetch('/api/users', { signal }), { immediate: false })
```

::tip
Состояние по ключу читается через [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data).
::

## Return Values

- `data`: результат `handler`
- `refresh`/`execute`: повторный вызов `handler`
- `error`: ошибка при неудаче
- `status`:
  - `idle`: не стартовало (`immediate: false` и `execute` ещё не вызывали; или SSR с `server: false`)
  - `pending`: в процессе
  - `success`: успех
  - `error`: ошибка
- `pending`: `true`, пока `status === 'pending'`
- `clear`: `data` → `undefined` (или `options.default()`), `error` → `undefined`, `status` → `idle`, отмена висящих запросов

По умолчанию Nuxt ждёт завершения текущего `refresh` перед следующим.

::note
Без серверного fetch (`server: false`) данные не запросятся до конца гидратации. Даже с `await useAsyncData` на клиенте в `<script setup>` `data` останется `undefined`.
::

## Type

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
