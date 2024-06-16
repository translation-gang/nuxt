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
const { data, pending, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>
```

::note
`data`, `pending`, `status` и `error` являются `ref`, и они должны быть получены с помощью `.value` при использовании внутри `<script setup>`, в то время как `refresh`/`execute` и `clear` являются обычными функциями.
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

::warning
[`useAsyncData`](/docs/api/composables/use-async-data) является зарезервированным именем функции, которое трансформируется компилятором, поэтому вы не должны называть свою собственную функцию с этим именем [`useAsyncData`](/docs/api/composables/use-async-data) .
::

:read-more{to="/docs/getting-started/data-fetching#useasyncdata"}

## Параметры

- `key`: уникальный ключ, который гарантирует, что получение данных может быть правильно дедуплицировано между запросами. Если вы не предоставляете ключ, то ключ, уникальный для имени файла и номера строки экземпляра `useAsyncData`, будет сгенерирован для вас.
- `handler`: асинхронная функция, которая должна возвращать истинное значение (например, она не должна быть `undefined` или `null`), иначе запрос может быть дублирован на клиенте.
- `options`:
  - `server`: параметр, определяющий, следует ли получать данные на сервере (по умолчанию `true`)
  - `lazy`: параметр, определяющий, следует ли разрешать асинхронную функцию после загрузки маршрута, вместо блокировки навигации на клиенте. (по умолчанию `false`)
  - `immediate`: если установить значение `false`, это предотвратит немедленное выполнение запроса. (по умолчанию `true`)
  - `default`: функция-фабрика для установки значения по умолчанию для data перед тем, как асинхронная функция будет разрешена. Это полезно при использовании параметров `lazy: true` или `immediate: false`.
  - `transform`: функция, которая может быть использована для изменения результата функции-обработчика после ее разрешения.
  - `getCachedData`: функция, которая возвращает кэшированные данные. Возвращаемое значение _null_ или _undefined_ будет вызывать выборку данных. По умолчанию это: `key => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]`, которая кэширует данные, только если включено `payloadExtraction`.
  - `pick`: выбрать из результата функции `handler` только указанные ключи в этом массиве
  - `watch`: следить за реактивными источниками для автоматического обновления
  - `deep`: возвращать данные в виде глубокого ref-объекта (по умолчанию это `true`). Можно установить значение `false`, чтобы возвращать данные в виде объекта с неглубокой реактивностью, что может повысить производительность, если ваши данные не нуждаются в этом.
  - `dedupe`: избегайте получения одного и того же ключа более одного раза за раз (по умолчанию `cancel`). Возможные параметры:
    - `cancel` - отменяет существующие запросы при поступлении нового
    - `defer` - вообще не делает новых запросов, если есть отложенный запрос

::note
Под капотом `lazy: false` использует `<Suspense>` для блокировки загрузки маршрута до того, как данные будут получены. Рассмотрите возможность использования `lazy: true` и реализации состояния загрузки вместо этого для более быстрого пользовательского опыта.
::

::read-more{to="/docs/api/composables/use-lazy-async-data"}
Вы можете использовать `useLazyAsyncData`, чтобы получить то же поведение, что и `lazy: true` с `useAsyncData`.
::

::tip{icon="i-simple-icons-youtube" color="gray" to="https://www.youtube.com/watch?v=aQPR0xn-MMk" target="_blank"}
Узнайте, как использовать `transform` и `getCachedData`, чтобы избежать лишних обращений к API и кэшировать данные для посетителей на клиенте.
::

## Возвращаемые значения

- `data`: результат работы переданной асинхронной функции.
- `pending`: булево значение, указывающее, продолжается ли получение данных.
- `refresh`/`execute`: функция, которая может быть использована для обновления данных, возвращенных функцией `handler`.
- `error`: объект ошибки, если получение данных не удалось.
- `status`: строка, указывающая на статус запроса данных (`"idle"`, `"pending"`, `"success"`, `"error"`).
`clear`: функция, которая установит `data` в `undefined`, `error` в `null`, `pending` в `false`, `status` в `idle`, и отметит любые текущие ожидающие запросы как отмененные.

По умолчанию Nuxt ждет, пока `refresh` не будет завершен, прежде чем его можно будет выполнить снова.

::note
Если вы не извлекали данные на сервере (например, с `server: false`), то данные _не_ будут извлечены до завершения гидратации. Это означает, что даже если вы ожидаете [`useAsyncData`](/docs/api/composables/use-async-data) на стороне клиента, `data` останется `null` внутри `<script setup>`.
::

## Тип

```ts [Signature]
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[]
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
```

:read-more{to="/docs/getting-started/data-fetching"}
