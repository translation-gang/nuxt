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
Он автоматически генерирует ключ на основе URL и параметров выборки, предоставляет подсказки типизации для url-запроса на основе маршрутов сервера и определяет тип ответа API.

::note
`useFetch` - это композабл, предназначенный для прямого вызова в функции setup, плагине или мидлваре маршрута. Он возвращает реактивные композаблы и обрабатывает добавление ответов в полезную нагрузку Nuxt, чтобы их можно было передавать от сервера к клиенту без повторной выборки данных на стороне клиента, когда на странице происходит гидратация.
::

## Использование

```vue [pages/modules.vue]
<script setup lang="ts">
const { data, pending, error, refresh, clear } = await useFetch('/api/modules', {
  pick: ['title']
})
</script>
```

::warning
Если вы используете пользовательскую обертку `useFetch`, не используйте await внутри нее, так как это может привести к неожиданному поведению. Пожалуйста, следуйте [этому рецепту](/docs/guide/recipes/custom-usefetch#custom-usefetch) для получения дополнительной информации о том, как сделать пользовательскую асинхронную функцию для получения данных.
::

::note
`data`, `pending`, `status` и `error` - это ref из Vue, и к ним следует обращаться с помощью `.value` при использовании внутри `<script setup>`, а `refresh`/`execute` и `clear` - это обычные функции...
::

Используя свойство `query`, вы можете добавить параметры поиска в запрос. Эта опция расширена из [unjs/ofetch](https://github.com/unjs/ofetch) и использует [unjs/ufo](https://github.com/unjs/ufo) для создания URL. Объекты автоматически превращаются в строку.

```ts
const param1 = ref('value1')
const { data, pending, error, refresh } = await useFetch('/api/modules', {
  query: { param1, param2: 'value2' }
})
```

В результате приведенного выше примера получается `https://api.nuxt.com/modules?param1=value1&param2=value2`.

Вы также можете использовать [перехватчики](https://github.com/unjs/ofetch#%EF%B8%8F-interceptors):

```ts
const { data, pending, error, refresh, clear } = await useFetch('/api/auth/login', {
  onRequest({ request, options }) {
    // Устанавливает заголовки запроса
    options.headers = options.headers || {}
    options.headers.authorization = '...'
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

::warning
`useFetch` - это зарезервированное имя функции, преобразованное компилятором, поэтому вы не должны называть свою функцию `useFetch`.
::

::tip{icon="i-ph-video-duotone" to="https://www.youtube.com/watch?v=njsGVmcWviY" target="_blank"}
Посмотрите видео от Александра Лихтера, чтобы избежать неправильного использования `useFetch`!
::

:link-example{to="/docs/examples/advanced/use-custom-fetch-composable"}

:read-more{to="/docs/getting-started/data-fetching"}

:link-example{to="/docs/examples/features/data-fetching"}

## Параметры

- `URL`: URL-адрес для получения данных.
- `Options` (расширяет опции [unjs/ofetch](https://github.com/unjs/ofetch) и [опции AsyncData](/docs/api/composables/use-async-data#params)):
  - `method`: Метод запроса.
  - `query`: Добавляет квери-параметры запроса к URL с помощью [ufo](https://github.com/unjs/ufo).
  - `params`: Псевдоним для `query`.
  - `body`: Тело запроса - автоматически превращается в строку (если передан объект).
  - `headers`: Заголовки запроса.
  - `baseURL`: Базовый URL для запроса.
  - `timeout`: Миллисекунды для автоматического прерывания запроса.
  - `cache`: Управляет кэшем в соответствии с [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#cache).
    - Вы можете передать boolean, чтобы отключить кэш, или передать одно из следующих значений: `default`, `no-store`, `reload`, `no-cache`, `force-cache` и `only-if-cached`.

::note
Все параметры запроса могут быть `computed` или `ref`. Они будут отслеживаться, и новые запросы будут автоматически выполняться с новыми значениями, если они будут обновлены.
::

- `Options` (из [`useAsyncData`](/docs/api/composables/use-async-data)):
  - `key`: Уникальный ключ для обеспечения правильной дедупликации данных в запросах. Если ключ не указан, он будет сгенерирован автоматически на основе URL и параметров запроса.
  - `server`: Следует ли получать данные на сервере (по умолчанию `true`).
  - `lazy`: Разрешать ли async-функцию после загрузки маршрута, чтобы не блокировать навигацию на стороне клиента (по умолчанию `false`).
  - `immediate`: Если установить значение `false`, то запрос не будет выполняться немедленно. (по умолчанию `true`).
  - `default`: Фабричная функция для установки значения по умолчанию для `data` перед разрешением async-функции - полезно при использовании опции `lazy: true` или `immediate: false`.
  - `transform`: Функция, которая может быть использована для изменения результата функции `handler` после разрешения.
  - `getCachedData`: Функция, которая возвращает кэшированные данные. Возвращаемое значение _null_ или _undefined_ будет перевыполнять запрос. По умолчанию это: `key => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]`, которая кэширует данные, только если включено `payloadExtraction`.
  - `pick`: Выбор из результата функции `handler` только указанные ключи в этом массиве.
  - `watch`: Следит за массивом реактивных источников и автоматически обновляет данные при их изменении. По умолчанию отслеживаются параметры запроса и URL. Вы можете полностью игнорировать реактивные источники, используя `watch: false`. Вместе с `immediate: false` это позволяет использовать `useFetch` полностью в ручном режиме. (Пример использования `watch` можно посмотреть здесь](/docs/getting-started/data-fetching#watch)).
  - `deep`: Возвращает данные в виде глубокого ref-объекта (по умолчанию `true`). Можно установить значение `false`, чтобы возвращать данные в неглубоком объекте, что может повысить производительность, если ваши данные не нуждаются в глубокой реактивности.
  - `dedupe`: Позволяет избегать получения одного и того же ключа более одного раза за вызов (по умолчанию `cancel`). Возможные опции:
    - `cancel` - Отменяет существующие запросы при выполнении нового.
    - `defer` - не делает новых запросов вообще, если есть ожидающий запрос.

::note
Если вы предоставите функцию или ref в качестве параметра `url`, или если вы предоставите функции в качестве аргументов параметра `options`, то вызов `useFetch` не будет соответствовать другим вызовам `useFetch` в других местах вашей кодовой базы, даже если опции кажутся идентичными. Если вы хотите, чтобы совпадение было принудительным, вы можете указать свой собственный ключ в `options`.
::

::note
Если вы используете `useFetch` для вызова (внешнего) HTTPS URL с самоподписанным сертификатом в разработке, вам нужно будет установить `NODE_TLS_REJECT_UNAUTHORIZED=0` в вашем окружении.
::

::tip{icon="i-simple-icons-youtube" color="gray" to="https://www.youtube.com/watch?v=aQPR0xn-MMk" target="_blank"}
Узнайте, как использовать `transform` и `getCachedData`, чтобы избежать лишних обращений к API и кэшировать данные для посетителей на стороне клиента.
::

## Возвращаемые значения

- `data`: результат работы переданной асинхронной функции.
- `pending`: булево значение, указывающее, продолжается ли извлечение данных.
- `refresh`/`execute`: функция, которая может быть использована для обновления данных, возвращенных функцией `handler`.
- `error`: объект ошибки, если запрос данных не удался.
- `status`: строка, указывающая на статус запроса данных (`"idle"`, `"pending"`, `"success"`, `"error"`).
- `clear`: функция, которая установит `data` в `undefined`, `error` в `null`, `pending` в `false`, `status` в `"idle"`, и пометит все текущие запросы как отмененные.

По умолчанию Nuxt ждет, пока `refresh` не будет завершен, прежде чем его можно будет выполнить снова.

::note
Если вы не получили данные на сервере (например, с помощью `server: false`), то данные _не_ будут получены до завершения гидратации. Это означает, что даже если вы ожидаете `useFetch` на стороне клиента, `data` останется null внутри `<script setup>`.
::

## Тип

```ts [Signature]
function useFetch<DataT, ErrorT>(
  url: string | Request | Ref<string | Request> | () => string | Request,
  options?: UseFetchOptions<DataT>
): Promise<AsyncData<DataT, ErrorT>>

type UseFetchOptions<DataT> = {
  key?: string
  method?: string
  query?: SearchParams
  params?: SearchParams
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[] | false
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
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
