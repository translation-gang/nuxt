---
title: 'useAsyncData'
description: useAsyncData предоставляет доступ к данным, которые разрешаются асинхронно, в композабле, соответствующем серверному рендерингу (SSR).
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

Вы можете использовать useAsyncData на страницах, в компонентах и плагинах, чтобы получить доступ к данным, которые разрешаются асинхронно.

::note
[`useAsyncData`](/docs/api/composables/use-async-data) это композабл, предназначенный для вызова непосредственно в [Nuxt context](/docs/guide/going-further/nuxt-app#the-nuxt-context). Этот метод возвращает реактивные композаблы и обрабатывает добавление ответов в Nuxt payload, чтобы они могли быть переданы от сервера к клиенту **без повторной загрузки данных** на клиенте при гидратации страницы.
::

## Использование

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::warning
Если вы используете пользовательскую обертку `useAsyncData`, не используйте await внутри нее, так как это может привести к неожиданному поведению. Пожалуйста, следуйте [этому рецепту](/docs/guide/recipes/custom-usefetch#custom-usefetch) для получения дополнительной информации о том, как сделать пользовательскую асинхронную функцию для получения данных.
::

::note
`data`, `status` и `error` являются `ref`, и они должны быть получены с помощью `.value` при использовании внутри `<script setup>`, в то время как `refresh`/`execute` и `clear` являются обычными функциями.
::

### Наблюдение за параметрами

Встроенный параметр `watch` позволяет автоматически повторно выполнять функцию-загрузчик при обнаружении любых изменений.

```vue [pages/index.vue]
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>
```

### Reactive Keys

You can use a computed ref, plain ref or a getter function as the key, allowing for dynamic data fetching that automatically updates when the key changes:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// When the route changes and userId updates, the data will be automatically refetched
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id)
)
</script>
```

::warning
[`useAsyncData`](/docs/api/composables/use-async-data) - это зарезервированное имя функции, преобразованное компилятором, поэтому вам не следует называть свою собственную функцию [`useAsyncData`](/docs/api/composables/use-async-data).
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## Параметры

- `key`: уникальный ключ, который гарантирует, что получение данных может быть правильно дедуплицировано между запросами. Если вы не предоставляете ключ, то ключ, уникальный для имени файла и номера строки экземпляра `useAsyncData`, будет сгенерирован для вас.
- `handler`: асинхронная функция, которая должна возвращать истинное значение (например, она не должна быть `undefined` или `null`), иначе запрос может быть дублирован на клиенте.
::warning
Функция `handler` должна быть **свободна от побочных эффектов**, чтобы обеспечить предсказуемое поведение во время SSR и CSR-гидратации. Если вам нужно вызвать побочные эффекты, используйте для этого утилиту [`callOnce`](/docs/api/utils/call-once).
::
  - `options`:
    - `server`: параметр, определяющий, следует ли получать данные на сервере (по умолчанию `true`)
    - `lazy`: параметр, определяющий, следует ли разрешать асинхронную функцию после загрузки маршрута, вместо блокировки навигации на клиенте. (по умолчанию `false`)
    - `immediate`: если установить значение `false`, это предотвратит немедленное выполнение запроса. (по умолчанию `true`)
    - `default`: функция-фабрика для установки значения по умолчанию для data перед тем, как асинхронная функция будет разрешена. Это полезно при использовании параметров `lazy: true` или `immediate: false`.
    - `transform`: функция, которая может быть использована для изменения результата функции-обработчика после ее разрешения.
    - `getCachedData`: функция, которая возвращает кэшированные данные. Возвращаемое значение _null_ или _undefined_ будет вызывать выборку данных. По умолчанию это:
      ```ts
      const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
        ? nuxtApp.payload.data[key] 
        : nuxtApp.static.data[key]
      ```
      Которая кэширует данные, только если включен `experimental.payloadExtraction` из `nuxt.config`.
    - `pick`: выбрать из результата функции `handler` только указанные ключи в этом массиве
    - `watch`: следить за реактивными источниками для автоматического обновления
  - `deep`: return data in a deep ref object. It is `false` by default to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive.
    - `dedupe`: избегайте получения одного и того же ключа более одного раза за раз (по умолчанию `cancel`). Возможные параметры:
      - `cancel` - отменяет существующие запросы при поступлении нового
      - `defer` - вообще не делает новых запросов, если есть отложенный запрос

::note
Под капотом `lazy: false` использует `<Suspense>` для блокировки загрузки маршрута до того, как данные будут получены. Рассмотрите возможность использования `lazy: true` и реализации состояния загрузки вместо этого для более быстрого пользовательского опыта.
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
Вы можете использовать `useLazyAsyncData`, чтобы получить то же поведение, что и `lazy: true` с `useAsyncData`.
::

:video-accordion{title="Watch a video from Alexander Lichter about client-side caching with getCachedData" videoId="aQPR0xn-MMk"}

### Shared State and Option Consistency

When using the same key for multiple `useAsyncData` calls, they will share the same `data`, `error` and `status` refs. This ensures consistency across components but requires option consistency.

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

```ts
// ❌ This will trigger a development warning
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })

// ✅ This is allowed
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: true })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: false })
```

::tip
Keyed state created using `useAsyncData` can be retrieved across your Nuxt application using [`useNuxtData`](/docs/api/composables/use-nuxt-data).
::

## Возвращаемые значения

- `data`: результат работы переданной асинхронной функции.
- `refresh`/`execute`: функция, которая может быть использована для обновления данных, возвращенных функцией `handler`.
- `error`: объект ошибки, если получение данных не удалось.
- `status`: строка, указывающая на статус запроса данных (`"idle"`, `"pending"`, `"success"`, `"error"`).
  - `idle`: когда запрос еще не начат, например:
    - когда `execute` еще не был вызван и установлено `{ immediate: false }`
    - при рендеринге HTML на сервере и установлено `{ server: false }`
  - `pending`: запрос выполняется
  - `success`: запрос успешно завершен
  - `error`: запрос завершился с ошибкой
- `clear`: a function that can be used to set `data` to `undefined` (or the value of `options.default()` if provided), set `error` to `undefined`, set `status` to `idle`, and mark any currently pending requests as cancelled.

По умолчанию Nuxt ждет, пока `refresh` не будет завершен, прежде чем его можно будет выполнить снова.

::note
Если вы не извлекали данные на сервере (например, с `server: false`), то данные _не_ будут извлечены до завершения гидратации. Это означает, что даже если вы ожидаете [`useAsyncData`](/docs/api/composables/use-async-data) на стороне клиента, `data` останется `undefined` внутри `<script setup>`.
::

## Тип

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: MaybeRefOrGetter<string>,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
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
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
