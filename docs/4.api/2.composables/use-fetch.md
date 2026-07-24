---
title: 'useFetch'
description: 'Загрузка данных из API с помощью SSR-совместимого компосабла.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

Этот композабл — удобная обёртка над [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`$fetch`](/docs/4.x/api/utils/dollarfetch).
Он автоматически генерирует ключ на основе URL и опций запроса, даёт подсказки типов для URL на основе серверных маршрутов и выводит тип ответа API.

::note
`useFetch` предназначен для вызова непосредственно в setup-функции, плагине или маршрутном мидлваре. Он возвращает реактивные значения и добавляет ответы в payload Nuxt, чтобы их можно было передать с сервера на клиент без повторной загрузки данных при гидрации страницы.
::

## Использование

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title'],
})
</script>
```

::tip{to="/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch"}
Нужен кастомный `useFetch` с заданными по умолчанию опциями (например `baseURL` или заголовки авторизации)? Используйте `createUseFetch` для создания полностью типизированного композабла.
::

::note
`await` для `useFetch` не обязателен. На сервере Nuxt в любом случае ждёт разрешения промиса перед рендером, поэтому HTML всегда содержит данные. `await` влияет на то, что происходит после вызова: с ним выполнение приостанавливается, пока `data` не заполнится, и клиентская навигация блокируется до готовности данных; без него выполнение продолжается сразу, `data` начинается со значения по умолчанию до завершения запроса, а при клиентской навигации состояния загрузки и ошибки обрабатываются самостоятельно через ref-ы `status` и `error`. Эффект похож на опцию [`lazy`](#parameters), хотя `lazy` — явный способ включить неблокирующую навигацию.
::

::note
`data`, `status` и `error` — это ref-ы Vue, к ним нужно обращаться через `.value` внутри `<script setup>`, тогда как `refresh`/`execute` и `clear` — обычные функции.
::

Опция `query` позволяет добавить поисковые параметры к запросу. Она наследуется от [unjs/ofetch](https://github.com/unjs/ofetch) и использует [unjs/ufo](https://github.com/unjs/ufo) для формирования URL. Объекты автоматически преобразуются в строку.

```ts [app/pages/index.vue]
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' },
})
```

В результате получится URL: `https://api.nuxt.com/modules?param1=value1&param2=value2`.

Также можно использовать [интерцепторы](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors):

```ts [app/pages/index.vue]
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest ({ request, options }) {
    // Установка заголовков запроса
    // требуется ofetch >= 1.4.0 — при необходимости обновите lockfile
    options.headers.set('Authorization', '...')
  },
  onRequestError ({ request, options, error }) {
    // Обработка ошибок запроса
  },
  onResponse ({ request, response, options }) {
    // Обработка данных ответа
    localStorage.setItem('token', response._data.token)
  },
  onResponseError ({ request, response, options }) {
    // Обработка ошибок ответа
  },
})
```

### Реактивные ключи и общее состояние

В качестве URL можно передать computed ref или обычный ref — тогда загрузка данных будет обновляться при изменении URL:

```vue [app/pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// При смене маршрута и обновлении id данные будут загружены заново
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

Автоматически сгенерированный ключ уникален для каждого места вызова, поэтому вызов `useFetch` с одним и тем же URL и опциями в разных компонентах **не** разделяет состояние, и каждый вызов выполняет свой запрос. Несколько экземпляров одного компонента разделяют состояние, поскольку используют одно место вызова. Чтобы разделять одни и те же ref-ы `data`, `error` и `status` между разными компонентами, передайте одинаковый явный `key` в каждый вызов:

::code-group

```vue [app/components/ComponentA.vue]
<script setup lang="ts">
// shares the data with ComponentB - only one request is made
const { data } = await useFetch('/api/random', { key: 'random' })
</script>
```

```vue [app/components/ComponentB.vue]
<script setup lang="ts">
// shares the data with ComponentA - only one request is made
const { data } = await useFetch('/api/random', { key: 'random' })
</script>
```

::

::tip
Состояние с ключом, созданное через `useFetch`, можно получить в любом месте приложения Nuxt с помощью [`useNuxtData`](/docs/4.x/api/composables/use-nuxt-data).
::

::warning
`useFetch` — зарезервированное имя, обрабатываемое компилятором, поэтому не называйте так свою функцию. Для кастомного варианта с заданными опциями используйте [`createUseFetch`](/docs/4.x/guide/recipes/custom-usefetch#custom-usefetch-with-createusefetch).
::

::warning
Если переменная `data`, полученная из `useFetch`, оказывается строкой, а не распарсенным JSON-объектом, убедитесь, что в компоненте нет импорта вроде `import { useFetch } from '@vueuse/core`.
::

:video-accordion{title="Видео от Alexander Lichter: как не использовать useFetch неправильно" videoId="njsGVmcWviY"}

:read-more{to="/docs/4.x/getting-started/data-fetching"}

### Реактивные опции запроса

Опции запроса могут быть реактивными: поддерживаются `computed`, `ref` и [computed getters](https://vuejs.org/guide/essentials/computed). При обновлении реактивной опции будет выполнен повторный запрос с новым значением.

```ts [app/pages/index.vue]
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
})
// запускает повторный запрос: /api/search?q=new%20search
searchQuery.value = 'new search'
```

При необходимости отключить это поведение можно опцией `watch: false`:

```ts [app/pages/index.vue]
const searchQuery = ref('initial')
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false,
})
// повторный запрос не выполняется
searchQuery.value = 'new search'
```

## Тип

```ts [Signature]
export function useFetch<ResT, ErrorT = NuxtError<unknown>, DataT = ResT> (
  url: string | Request | Ref<string | Request> | (() => string | Request),
  options?: UseFetchOptions<ResT, DataT>,
): AsyncData<DataT, ErrorT> & Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<ResT, DataT = ResT> = {
  key?: MaybeRefOrGetter<string>
  method?: MaybeRefOrGetter<string>
  query?: MaybeRefOrGetter<SearchParams>
  params?: MaybeRefOrGetter<SearchParams>
  body?: MaybeRefOrGetter<RequestInit['body'] | Record<string, any>>
  headers?: MaybeRefOrGetter<Record<string, string> | [key: string, value: string][] | Headers>
  baseURL?: MaybeRefOrGetter<string>
  cache?: false | 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload'
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp, ctx: AsyncDataRequestContext) => DataT | undefined
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  timeout?: number
  enabled?: MaybeRefOrGetter<boolean>
  default?: () => DataT | Ref<DataT>
  transform?: (input: ResT) => DataT | Promise<DataT>
  pick?: string[]
  $fetch?: typeof globalThis.$fetch
  watch?: MultiWatchSources | false
}

type AsyncDataRequestContext = {
  /** Причина запроса данных */
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

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): URL или объект запроса. Может быть строкой, объектом Request, ref Vue или функцией, возвращающей строку/Request. Поддерживается реактивность для динамических URL.

- `options` (object): настройки запроса. Расширяет опции [unjs/ofetch](https://github.com/unjs/ofetch) и [`AsyncDataOptions`](/docs/4.x/api/composables/use-async-data#params). Любая опция может быть статическим значением, `ref` или computed.

| Опция          | Тип                                                                    | По умолчанию | Описание                                                                                                      |
|----------------|-------------------------------------------------------------------------|--------------|---------------------------------------------------------------------------------------------------------------|
| `key`          | `MaybeRefOrGetter<string>`                                              | auto-gen     | Уникальный ключ для дедупликации. Если не задан — генерируется из URL, опций и места вызова в исходном коде. |
| `method`       | `MaybeRefOrGetter<string>`                                              | `'GET'`      | HTTP-метод запроса.                                                                                           |
| `query`        | `MaybeRefOrGetter<SearchParams>`                                        | -            | Параметры запроса в URL. Синоним: `params`.                                                                   |
| `params`       | `MaybeRefOrGetter<SearchParams>`                                        | -            | Синоним для `query`.                                                                                          |
| `body`         | `MaybeRefOrGetter<RequestInit['body'] \| Record<string, any>>`          | -            | Тело запроса. Объекты автоматически сериализуются.                                                            |
| `headers`      | `MaybeRefOrGetter<Record<string, string> \| [key, value][] \| Headers>` | -            | Заголовки запроса.                                                                                            |
| `baseURL`      | `MaybeRefOrGetter<string>`                                              | -            | Базовый URL запроса.                                                                                          |
| `cache`        | `false \| string`                                                       | -            | Управление кэшем. `false` отключает кэш; можно использовать значения Fetch API: `default`, `no-store` и т.д. |
| `server`       | `boolean`                                                               | `true`       | Выполнять ли запрос на сервере.                                                                               |
| `lazy`         | `boolean`                                                               | `false`      | Если `true`, данные подгружаются после перехода по маршруту (не блокируют навигацию).                        |
| `immediate`    | `boolean`                                                               | `true`       | Если `false`, запрос не выполняется сразу.                                                                    |
| `default`      | `() => DataT`                                                           | -            | Фабрика значения по умолчанию для `data` до завершения асинхронной загрузки.                                  |
| `timeout`      | `number` :badge[v4.2]{color="info" size="xs" class="align-middle"}      | -            | Таймаут в миллисекундах (по умолчанию `undefined` — без таймаута).                                            |
| `transform`    | `(input: DataT) => DataT \| Promise<DataT>`                             | -            | Функция преобразования результата после загрузки.                                                              |
| `getCachedData`| `(key, nuxtApp, ctx) => DataT \| undefined` :badge[v3.8]{color="info" size="xs" class="align-middle"} | - | Функция возврата кэшированных данных. Значение по умолчанию см. ниже.                                         |
| `pick`         | `string[]`                                                              | -            | Выбрать из результата только указанные ключи.                                                                  |
| `watch`        | `MultiWatchSources \| false`                                            | -            | Массив реактивных источников для отслеживания и автообновления. `false` отключает отслеживание.                |
| `deep`         | `boolean` :badge[v3.8]{color="info" size="xs" class="align-middle"}    | `false`      | Возвращать данные в виде глубокого ref. По умолчанию `false` для лучшей производительности (shallow ref).     |
| `dedupe`       | `'cancel' \| 'defer'` :badge[v3.9]{color="info" size="xs" class="align-middle"} | `'cancel'` | Не выполнять повторный запрос с тем же ключом одновременно.                                                   |
| `enabled`      | `boolean` :badge[v4.5]{color="info" size="xs" class="align-middle"}     | `true`       | Барьер, определяющий, может ли выполняться запрос. При `false` блокируется каждое выполнение (начальная загрузка, `execute`/`refresh` и срабатывания watch), а переключение `true` → `false` отменяет текущий запрос без очистки `data`. Повторное включение само по себе не перезапрашивает данные. |
| `$fetch`       | `typeof globalThis.$fetch` :badge[v3.2]{color="info" size="xs" class="align-middle"} | - | Собственная реализация $fetch. См. [Кастомный useFetch в Nuxt](/docs/4.x/guide/recipes/custom-usefetch)        |

::note
Любая опция запроса может быть задана как `computed` или `ref`. Такие значения отслеживаются, и при их изменении автоматически выполняется новый запрос (если `watch` не установлен в `false`).
::

**Значение по умолчанию для getCachedData:**

```ts [Default getCachedData Implementation]
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating
  ? nuxtApp.payload.data[key]
  : nuxtApp.static.data[key]
```
Кэширование работает только при включённой опции `experimental.payloadExtraction` в `nuxt.config`.

## Возвращаемые значения

Этот композабл возвращает `Promise`, который можно ожидать через `await`, — тогда `data` доступна сразу в `<script setup>` (значение уже есть, а не `undefined`). Можно также деструктурировать значения без `await`; в этом случае `data` может быть `undefined` в `<script setup>` до завершения запроса.

::tip
Даже без `await` во время SSR Nuxt дождётся завершения запроса и отправит клиенту готовые данные.
::

::note
Если данные не загружались на сервере (например, при `server: false`), они не будут загружены до завершения гидрации. То есть даже при `await useFetch` на клиенте `data` останется `undefined` внутри `<script setup>`.
::

| Имя      | Тип                                                | Описание                                                                                                                                                          |
|----------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`   | `Ref<DataT \| undefined>`                          | Результат асинхронной загрузки.                                                                                                                                   |
| `refresh`| `(opts?: AsyncDataExecuteOptions) => Promise<void>`| Функция ручного обновления данных. По умолчанию Nuxt ждёт завершения `refresh`, прежде чем выполнить его снова.                                                   |
| `execute`| `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Синоним для `refresh`.                                                                                                                                            |
| `error`  | `Ref<ErrorT \| undefined>`                         | Объект ошибки при неудачной загрузке.                                                                                                                              |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>`  | Статус запроса. Используйте для различения `idle`, `pending`, `success` и `error`.                                                                                |
| `pending`| `Ref<boolean>`                                     | `true`, пока запрос выполняется. При [`experimental.pendingWhenIdle`](/docs/4.x/guide/going-further/experimental-features#pendingwhenidle) также `true`, когда `status` равен `idle` и кэшированных данных нет. |
| `clear`  | `() => void`                                       | Сбрасывает `data` в `undefined` (или в `options.default()`, если задано), `error` в `undefined`, устанавливает `status` в `idle` и отменяет ожидающие запросы.   |

::tip
Методы `Promise` (`then`, `catch` и `finally`) можно безопасно деструктурировать, если вы не ожидали возвращаемое значение через `await`.
::

### Значения status

- `idle`: Запрос ещё не начат (например, при `{ immediate: false }` или `{ server: false }` при серверном рендере)
- `pending`: Запрос выполняется
- `success`: Запрос успешно завершён
- `error`: запрос завершился с ошибкой

### Примеры

:link-example{to="/docs/4.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/4.x/examples/features/data-fetching"}
