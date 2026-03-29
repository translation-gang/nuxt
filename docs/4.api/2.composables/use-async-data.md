---
title: 'useAsyncData'
description: "Композабл useAsyncData для асинхронных данных с поддержкой SSR."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

Вы можете использовать useAsyncData на страницах, в компонентах и плагинах, чтобы получить доступ к данным, которые разрешаются асинхронно.

::note
[`useAsyncData`](/docs/3.x/api/composables/use-async-data) — композабл для вызова внутри [контекста Nuxt](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context). Этот метод возвращает реактивные композаблы и обрабатывает добавление ответов в Nuxt payload, чтобы они могли быть переданы от сервера к клиенту **без повторной загрузки данных** на клиенте при гидратации страницы.
::

## Использование

```vue [pages/index.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
)
</script>
```

::warning
Если вы используете собственную обёртку над `useAsyncData`, не используйте `await` внутри неё — это может дать непредсказуемое поведение. См. [рецепт с пользовательским композаблом](/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch), как правильно оформить свою функцию загрузки данных.
::

::note
`data`, `status` и `error` — это `ref`; к ним нужно обращаться через `.value` внутри `<script setup>`, а `refresh`/`execute` и `clear` — обычные функции.
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
      page: page.value,
    },
  }), {
    watch: [page],
  },
)
</script>
```

### Реактивные ключи

Ключом может быть `computed`, обычный `ref` или геттер — данные перезапрашиваются при изменении ключа:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// При смене маршрута и обновлении userId данные перезапросятся автоматически
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id),
)
</script>
```

::warning
[`useAsyncData`](/docs/3.x/api/composables/use-async-data) — зарезервированное имя компилятора; свою функцию так называть нельзя.
::

:read-more{to="/docs/3.x/getting-started/data-fetching#useasyncdata"}

## Параметры

- `key`: уникальный ключ, который гарантирует, что получение данных может быть правильно дедуплицировано между запросами. Если вы не предоставляете ключ, то ключ, уникальный для имени файла и номера строки экземпляра `useAsyncData`, будет сгенерирован для вас.
- `handler`: асинхронная функция, которая должна возвращать истинное значение (например, она не должна быть `undefined` или `null`), иначе запрос может быть дублирован на клиенте.
::warning
Функция `handler` должна быть **без побочных эффектов**, чтобы поведение при SSR и гидратации на клиенте было предсказуемым. Для побочных эффектов используйте утилиту [`callOnce`](/docs/3.x/api/utils/call-once).
::
- `options`:
  - `server`: параметр, определяющий, следует ли получать данные на сервере (по умолчанию `true`)
  - `lazy`: параметр, определяющий, следует ли разрешать асинхронную функцию после загрузки маршрута, вместо блокировки навигации на клиенте. (по умолчанию `false`)
  - `immediate`: если установить значение `false`, это предотвратит немедленное выполнение запроса. (по умолчанию `true`)
  - `default`: функция-фабрика для значения по умолчанию поля `data` до завершения асинхронной функции. Это полезно при использовании параметров `lazy: true` или `immediate: false`.
  - `transform`: функция, которая может быть использована для изменения результата функции-обработчика после её разрешения.
  - `getCachedData`: функция, возвращающая кэшированные данные; при `null` или `undefined` выполняется запрос. По умолчанию:
    ```ts
    const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
      ? nuxtApp.payload.data[key]
      : nuxtApp.static.data[key]
    ```
    Кэширование работает только при включённом `experimental.payloadExtraction` в `nuxt.config`.
  - `pick`: оставить из результата `handler` только перечисленные ключи
  - `watch`: реактивные источники для автоматического обновления
  - `deep`: данные в глубоком `ref` (по умолчанию `true`); при `false` — поверхностный (`shallow`) `ref`, что может ускорить работу, если глубокая реактивность не нужна
  - `dedupe`: избегайте получения одного и того же ключа более одного раза за раз (по умолчанию `cancel`). Возможные параметры:
    - `cancel` — отменяет существующие запросы при поступлении нового
    - `defer` — вообще не делает новых запросов, если есть отложенный запрос

::note
Под капотом `lazy: false` использует `<Suspense>` и удерживает загрузку маршрута до получения данных. Для более отзывчивого интерфейса рассмотрите `lazy: true` и отображение состояния загрузки в шаблоне.
::

::read-more{to="/docs/3.x/api/composables/use-lazy-async-data"}
Вы можете использовать `useLazyAsyncData`, чтобы получить то же поведение, что и `lazy: true` с `useAsyncData`.
::

:video-accordion{title="Видео Александра Лихтера о клиентском кэшировании с getCachedData" videoId="aQPR0xn-MMk"}

### Общее состояние и согласованность опций

При одинаковом ключе у нескольких вызовов `useAsyncData` общие `data`, `error` и `status`. Это согласует компоненты, но опции должны быть согласованы.

Следующие опции **должны совпадать** у всех вызовов с одним ключом:
- функция `handler`
- опция `deep`
- функция `transform`
- массив `pick`
- функция `getCachedData`
- значение `default`

Следующие опции **могут отличаться** без предупреждений:
- `server`
- `lazy`
- `immediate`
- `dedupe`
- `watch`

```ts
// ❌ Вызовет предупреждение в режиме разработки
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { deep: false })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { deep: true })

// ✅ Допустимо
const { data: users1 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: true })
const { data: users2 } = useAsyncData('users', () => $fetch('/api/users'), { immediate: false })
```

::tip
Состояние с ключом из `useAsyncData` доступно в приложении через [`useNuxtData`](/docs/3.x/api/composables/use-nuxt-data).
::

## Возвращаемые значения

- `data`: результат работы переданной асинхронной функции.
- `refresh`/`execute`: функция, которая может быть использована для обновления данных, возвращенных функцией `handler`.
- `error`: объект ошибки, если получение данных не удалось.
- `status`: статус запроса данных:
  - `idle`: запрос ещё не начался, например:
    - `execute` ещё не вызывали и задано `{ immediate: false }`
    - рендер HTML на сервере при `{ server: false }`
  - `pending`: запрос выполняется
  - `success`: запрос успешно завершён
  - `error`: запрос завершился с ошибкой
- `clear`: сбрасывает `data` в `undefined` (или в `options.default()`, если задано), `error` в `null`, `status` в `idle` и отменяет ожидающие запросы.

По умолчанию Nuxt ждёт, пока `refresh` не будет завершён, прежде чем его можно будет выполнить снова.

::note
Если данные не запрашивались на сервере (например, при `server: false`), они _не_ появятся до завершения гидратации. Даже при `await` [`useAsyncData`](/docs/3.x/api/composables/use-async-data) на клиенте в `<script setup>` `data` останется `undefined`.
::

## Тип

```ts [Сигнатура]
function useAsyncData<DataT, DataE> (
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE> (
  key: MaybeRefOrGetter<string>,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
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
}

type AsyncDataRequestContext = {
  /** Причина этого запроса данных */
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

:read-more{to="/docs/3.x/getting-started/data-fetching"}
