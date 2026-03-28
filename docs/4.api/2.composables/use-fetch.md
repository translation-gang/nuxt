---
title: 'useFetch'
description: 'Получение данных из эндпоинта API с помощью SSR-композабла.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

Этот композабл — удобная обёртка над [`useAsyncData`](/docs/3.x/api/composables/use-async-data) и [`$fetch`](/docs/3.x/api/utils/dollarfetch).
Он сам строит ключ из URL и параметров запроса, подсказывает типы для URL по серверным маршрутам и выводит тип ответа API.

::note
`useFetch` вызывают напрямую в `setup`, плагине или middleware маршрута. Он возвращает реактивные ссылки и кладёт ответ в payload Nuxt, чтобы при гидратации не запрашивать те же данные на клиенте повторно.
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
Если вы используете собственную обёртку над `useFetch`, не используйте `await` внутри неё — это может дать непредсказуемое поведение. См. [рецепт с пользовательским композаблом](/docs/3.x/guide/recipes/custom-usefetch#custom-usefetch), как правильно оформить свою функцию загрузки данных.
::

::note
`data`, `status` и `error` — это ref из Vue; к ним следует обращаться через `.value` внутри `<script setup>`, а `refresh`/`execute` и `clear` — обычные функции.
::

Используя свойство `query`, вы можете добавить параметры поиска в запрос. Эта опция расширена из [unjs/ofetch](https://github.com/unjs/ofetch) и использует [unjs/ufo](https://github.com/unjs/ufo) для создания URL. Объекты автоматически превращаются в строку.

```ts
const param1 = ref('value1')
const { data, status, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

В результате приведённого выше примера получится `https://api.nuxt.com/modules?param1=value1&param2=value2`.

Вы также можете использовать [перехватчики](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors):

```ts
const { data, status, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // Устанавливает заголовки запроса
    // нужен ofetch >= 1.4.0 — при необходимости обновите lockfile
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

### Реактивный URL и общее состояние

URL может быть `computed`, обычным `ref` или функцией — данные обновятся при смене адреса:

```vue [pages/[id\\].vue]
<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)

// При смене маршрута и обновлении id данные перезапросятся автоматически
const { data: post } = await useFetch(() => `/api/posts/${id.value}`)
</script>
```

При одинаковом URL и опциях в нескольких компонентах общие `data`, `error` и `status` — состояние согласовано между ними.

::tip
Состояние с ключом из `useFetch` доступно в приложении через [`useNuxtData`](/docs/3.x/api/composables/use-nuxt-data).
::

::warning
`useFetch` — зарезервированное имя, которое обрабатывает компилятор; свою функцию так называть нельзя.
::

::warning
Если вы столкнулись с тем, что переменная `data`, деструктурированная из `useFetch`, возвращает строку, а не разобранный JSON-объект, убедитесь, что ваш компонент не включает оператор импорта, подобный `import { useFetch } from '@vueuse/core'`.
::

:video-accordion{title="Видео Александра Лихтера: как не ошибаться с useFetch" videoId="njsGVmcWviY"}

:read-more{to="/docs/3.x/getting-started/data-fetching"}

## Тип

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

## Параметры

- `URL` (`string | Request | Ref<string | Request> | () => string | Request`): URL или объект `Request`. Может быть строкой, `Request`, ref Vue или функцией; поддерживается реактивность.

- `options` (object): настройки запроса. Расширяет [unjs/ofetch](https://github.com/unjs/ofetch) и [`AsyncDataOptions`](/docs/3.x/api/composables/use-async-data#params). Любая опция может быть константой, `ref` или `computed`.

| Опция | Тип | По умолчанию | Описание |
| ---| --- | --- | --- |
| `key` | `MaybeRefOrGetter<string>` | авто | Уникальный ключ дедупликации; если не задан — из URL и опций. |
| `method` | `string` | `'GET'` | HTTP-метод. |
| `query` | `object` | - | Параметры строки запроса. Псевдоним: `params`. Поддержка ref/computed. |
| `params` | `object` | - | То же, что `query`. |
| `body` | `RequestInit['body'] \| Record<string, any>` | - | Тело запроса; объекты сериализуются. Поддержка ref/computed. |
| `headers` | `Record<string, string> \| [key, value][] \| Headers` | - | Заголовки. |
| `baseURL` | `string` | - | Базовый URL. |
| `timeout` | `number` | - | Таймаут в мс до отмены запроса. |
| `cache` | `boolean \| string` | - | Кэш: `false` отключает или значения Fetch API: `default`, `no-store` и т.д. |
| `server` | `boolean` | `true` | Выполнять ли запрос на сервере. |
| `lazy` | `boolean` | `false` | При `true` — после загрузки маршрута (не блокирует навигацию). |
| `immediate` | `boolean` | `true` | При `false` запрос не стартует сразу. |
| `default` | `() => DataT` | - | Значение `data` до завершения асинхронной части. |
| `transform` | `(input: DataT) => DataT \| Promise<DataT>` | - | Преобразование результата после получения. |
| `getCachedData`| `(key, nuxtApp, ctx) => DataT \| undefined` | - | Возврат кэшированных данных; см. значение по умолчанию ниже. |
| `pick` | `string[]` | - | Оставить в результате только перечисленные ключи. |
| `watch` | `MultiWatchSources \| false` | - | Реактивные источники для автообновления; `false` отключает. |
| `deep` | `boolean` | `true` | Глубокий `ref`; при `false` — поверхностный (`shallow`), быстрее, если глубокая реактивность не нужна. |
| `dedupe` | `'cancel' \| 'defer'` | `'cancel'` | Не дублировать запросы с одним ключом. |
| `$fetch` | `typeof globalThis.$fetch` | - | Своя реализация `$fetch`. |

::note
Любую опцию можно задать через `computed` или `ref` — при изменении выполнится новый запрос.
::

**Значение `getCachedData` по умолчанию:**

```ts
const getDefaultCachedData = (key, nuxtApp, ctx) => nuxtApp.isHydrating 
 ? nuxtApp.payload.data[key] 
 : nuxtApp.static.data[key]
```
Кэширование срабатывает только при включённом `experimental.payloadExtraction` в `nuxt.config`.

## Возвращаемое значение

| Имя | Тип | Описание |
| --- | --- |--- |
| `data` | `Ref<DataT \| undefined>` | Результат асинхронного запроса. |
| `refresh` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Ручное обновление. По умолчанию Nuxt ждёт завершения текущего `refresh` перед следующим вызовом. |
| `execute` | `(opts?: AsyncDataExecuteOptions) => Promise<void>` | Синоним `refresh`. |
| `error` | `Ref<ErrorT \| undefined>` | Ошибка, если запрос не удался. |
| `status` | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | Статус запроса (см. ниже). |
| `clear` | `() => void` | Сброс `data` в `undefined` (или `options.default()`), `error` в `null`, `status` в `idle`, отмена ожидающих запросов. |

### Значения `status`

- `idle`: запрос ещё не начался (например, `{ immediate: false }` или `{ server: false }` при SSR)
- `pending`: запрос выполняется
- `success`: успех
- `error`: ошибка

::note
Если на сервере данные не запрашивались (например, `server: false`), они _не_ загрузятся до завершения гидратации. Даже при `await useFetch` на клиенте в `<script setup>` `data` может оставаться `null`.
::

### Примеры

:link-example{to="/docs/3.x/examples/advanced/use-custom-fetch-composable"}

:link-example{to="/docs/3.x/examples/features/data-fetching"}
