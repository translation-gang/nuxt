---
title: 'useNuxtApp'
description: 'Доступ к общему контексту выполнения приложения Nuxt.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` — встроенный композабл для доступа к общему контексту выполнения Nuxt ([контекст Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)) на клиенте и сервере (но не в маршрутах Nitro). Через него доступны экземпляр Vue-приложения, хуки времени выполнения, runtime config и внутреннее состояние вроде `ssrContext` и `payload`.

```vue [app/app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

Если контекст в текущей области недоступен, `useNuxtApp` бросит ошибку. Для опционального контекста используйте [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp).

<!--
note
По умолчанию общий контекст выполнения Nuxt изолируется с помощью опции [`buildId`](/docs/4.x/api/nuxt-config#buildid). Это позволяет поддерживать несколько контекстов выполнения.

## Params

- `appName`: необязательное имя приложения. Если не указать, используется опция Nuxt `buildId`. Иначе значение должно совпадать с существующим `buildId`. -->

## Методы

### `provide (name, value)`

`nuxtApp` расширяют [плагины Nuxt](/docs/4.x/directory-structure/app/plugins). `provide` добавляет значения и хелперы, доступные во всех композаблах и компонентах.

Параметры: `name` и `value`.

```ts
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', name => `Hello ${name}!`)

// Выведет "Hello name!"
console.log(nuxtApp.$hello('name'))
```

В примере `$hello` стал частью контекста `nuxtApp` и доступен везде, где есть `nuxtApp`.

### `hook(name, cb)`

Хуки `nuxtApp` настраивают поведение приложения во время выполнения. Их используют в композаблах Vue и [плагинах](/docs/4.x/directory-structure/app/plugins), подключаясь к жизненному циклу рендеринга.

`hook` чаще всего в плагинах.

Список хуков — [Runtime Hooks](/docs/4.x/api/advanced/hooks#app-hooks-runtime).

```ts [app/plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* your code goes here */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (import.meta.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)`

`callHook` для существующих хуков возвращает промис.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## Свойства

`useNuxtApp()` открывает свойства для расширения приложения и общего состояния.

### `vueApp`

`vueApp` — глобальный [экземпляр приложения Vue](https://vuejs.org/api/application#application-api) через `nuxtApp`.

Полезные методы:
- [`component()`](https://vuejs.org/api/application#app-component) — глобальная регистрация компонента по имени и определению или получение уже зарегистрированного.
- [`directive()`](https://vuejs.org/api/application#app-directive) — глобальная директива или получение по имени [(пример)](/docs/4.x/directory-structure/app/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application#app-use) — установка **[плагина Vue](https://vuejs.org/guide/reusability/plugins)** [(пример)](/docs/4.x/directory-structure/app/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` создаётся при SSR и есть только на сервере.

Через `ssrContext` Nuxt отдаёт:
- `url` (string) — URL текущего запроса.
- `event` ([h3js/h3](https://github.com/h3js/h3)) — запрос и ответ текущего маршрута.
- `payload` (object) — объект payload NuxtApp.

### `payload`

`payload` переносит данные и состояние с сервера на клиент. После передачи с сервера на клиенте доступны:

- `serverRendered` (boolean) — ответ отрендерен на сервере.
- `data` (object) — при [`useFetch`](/docs/4.x/api/composables/use-fetch) или [`useAsyncData`](/docs/4.x/api/composables/use-async-data) результат лежит в `payload.data`, кэшируется и не дублирует одинаковые запросы.

  ::code-group
  ```vue [app/app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', (_nuxtApp, { signal }) => $fetch('/api/count', { signal }))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler((event) => {
    return { count: 1 }
  })
  ```
  ::

  После примера выше в `payload.data` будет `{ count: 1 }`.

  То же значение на сервере — через [`ssrcontext`](/docs/4.x/api/composables/use-nuxt-app#ssrcontext).

- `state` (object) — общее состояние [`useState`](/docs/4.x/api/composables/use-state) доступно как `payload.state.[имя-состояния]`.

  ```ts [app/plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  Поддерживаются и более сложные типы: `ref`, `reactive`, `shallowRef`, `shallowReactive`, `NuxtError`.

#### Пользовательский reducer/reviver

  С [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) можно задать свой reducer/reviver для типов, которые Nuxt не сериализует из коробки.

  :video-accordion{title="Видео Александра Лихтера о сериализации payload, в том числе классов" videoId="8w6ffRBs8a4"}

  Ниже — reducer/reviver для класса DateTime из [Luxon](https://moment.github.io/luxon/#/) в payload-плагине.

  ```ts [app/plugins/date-time-payload.ts]
  /**
   * Такой плагин выполняется очень рано, до восстановления payload.
   * Роутер и другие инъекции Nuxt недоступны.
   *
   * Строка "DateTime" — идентификатор типа; должна совпадать в reducer и reviver.
   */
  export default definePayloadPlugin((nuxtApp) => {
    definePayloadReducer('DateTime', (value) => {
      return value instanceof DateTime && value.toJSON()
    })
    definePayloadReviver('DateTime', (value) => {
      return DateTime.fromISO(value)
    })
  })
  ```

### `isHydrating`

`nuxtApp.isHydrating` (boolean) — идёт ли гидратация на клиенте.

```ts [app/components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  },
})
```

### `runWithContext`

::note
Если вы попали сюда из-за «Nuxt instance unavailable», используйте метод редко и сообщайте о сценариях — лучше починить на уровне фреймворка.
::

`runWithContext` вызывает функцию с явным контекстом Nuxt. Обычно контекст передаётся неявно; в сложных `async`/`await` в middleware/плагинах после `await` контекст может пропасть.

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // из-за try/catch компилятор Vue/Nuxt теряет контекст
  } catch (e) {
    user = null
  }
  if (!user) {
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### Использование

```ts
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: любая функция, которой нужен контекст текущего приложения Nuxt — он будет применён автоматически.

`runWithContext` возвращает то, что вернула `functionWithContext`.

#### Контекст подробнее

Composition API Vue (и композаблы Nuxt) опираются на неявный контекст. Во время жизненного цикла Vue временно кладёт текущий компонент (и Nuxt — `nuxtApp`) в глобальную переменную и сбрасывает в том же тике. На сервере параллельно много запросов и экземпляров `nuxtApp` в одном глобальном контексте, поэтому Nuxt и Vue сразу сбрасывают глобальный экземпляр, чтобы не протечь между пользователями.

Итог: Composition API и композаблы Nuxt доступны только в жизненном цикле и в том же тике до первого `await`:

```ts
// --- Vue internal ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

async function setup () {
  getCurrentInstance() // работает
  await someAsyncOperation() // контекст сброшен в том же тике до async!
  getCurrentInstance() // null
}
```

Классический обход — сохранить экземпляр в локальную переменную при первом вызове, но тогда вложенные композаблы должны явно принимать экземпляр — ограничение дизайна композаблов.

Vue при компиляции восстанавливает контекст после шагов в `<script setup>`:

```ts
const __instance = getCurrentInstance() // из компилятора Vue
getCurrentInstance() // работает
await someAsyncOperation()
__restoreInstance(__instance) // из компилятора Vue
getCurrentInstance() // снова работает
```

Подробнее — [unjs/unctx#2 (комментарий)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723).

#### Решение

`runWithContext` восстанавливает контекст, как `<script setup>`.

Внутри Nuxt использует [unjs/unctx](https://github.com/unjs/unctx), чтобы композаблы в плагинах и middleware вели себя как во Vue — `navigateTo()` и др. без явной передачи `nuxtApp`.

Композаблы Nuxt устроены как Composition API Vue, поэтому нужен похожий механизм. См. [unjs/unctx#2](https://github.com/unjs/unctx/issues/2), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4), [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884).

Vue пока восстанавливает async-контекст в основном для `<script setup>`. В Nuxt добавлена трансформация для `defineNuxtPlugin()` и `defineNuxtRouteMiddleware()` с восстановлением контекста.

#### Оставшиеся проблемы

Трансформация `unjs/unctx` с `try/catch` и `await` может вести себя нестабильно — это нужно исправить, чтобы убрать обход через `runWithContext`.

#### Нативный async-контекст

Экспериментально можно включить нативный async-контекст через [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) и поддержку в unctx — контекст **нативно** для **любых вложенных async-композаблов** без трансформации и ручного `runWithContext`.

::tip
Нативный async-контекст сейчас работает в Bun и Node.
::

:read-more{to="/docs/4.x/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

Как `useNuxtApp`, но при отсутствии контекста возвращает `null` вместо исключения.

Для композаблов, где `nuxtApp` не обязателен, или чтобы проверить наличие контекста.

Пример:

```ts [composable.ts]
export function useStandType () {
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: необязательное имя приложения. Если не указать, используется опция Nuxt `buildId`. Иначе значение должно совпадать с существующим `buildId`. -->
