---
title: 'useNuxtApp'
description: 'Доступ к общему runtime-контексту приложения Nuxt.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` — встроенный композабл для доступа к общему runtime-контексту Nuxt ([контекст Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)). Доступен на клиенте и сервере (но не внутри маршрутов Nitro). Через него доступны экземпляр Vue-приложения, runtime-хуки, переменные runtime config и внутреннее состояние (`ssrContext`, `payload`).

```vue [app/app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

Если контекст недоступен, `useNuxtApp` выбросит исключение. В композаблах, где `nuxtApp` не обязателен, или для проверки наличия контекста без исключения используйте [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp).

## Методы

### `provide (name, value)`

`nuxtApp` — runtime-контекст, который можно расширять [плагинами Nuxt](/docs/4.x/directory-structure/app/plugins). Функция `provide` создаёт плагины и делает значения и методы доступными во всём приложении.

`provide` принимает параметры `name` и `value`.

```ts
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', name => `Hello ${name}!`)

// Prints "Hello name!"
console.log(nuxtApp.$hello('name'))
```

В примере выше `$hello` становится частью контекста `nuxtApp` и доступен везде, где доступен `nuxtApp`.

### `hook(name, cb)`

Хуки `nuxtApp` позволяют настраивать runtime-поведение приложения. Их можно использовать в композаблах Vue и [плагинах Nuxt](/docs/4.x/directory-structure/app/plugins), чтобы встроиться в жизненный цикл рендеринга.

Функция `hook` добавляет логику в определённую точку жизненного цикла. Чаще всего используется при создании плагинов.

Список runtime-хуков: [Runtime Hooks](/docs/4.x/api/advanced/hooks#app-hooks-runtime).

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

`callHook` возвращает promise при вызове с именем существующего хука.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## Свойства

`useNuxtApp()` предоставляет следующие свойства для расширения приложения и общего состояния.

### `vueApp`

`vueApp` — глобальный [экземпляр приложения Vue](https://vuejs.org/api/application#application-api), доступный через `nuxtApp`.

Полезные методы:
- [`component()`](https://vuejs.org/api/application#app-component) — регистрация глобального компонента или получение уже зарегистрированного.
- [`directive()`](https://vuejs.org/api/application#app-directive) — регистрация глобальной директивы или получение уже зарегистрированной [(пример)](/docs/4.x/directory-structure/app/plugins#vue-directives).
- [`use()`](https://vuejs.org/api/application#app-use) — установка [плагина Vue](https://vuejs.org/guide/reusability/plugins) [(пример)](/docs/4.x/directory-structure/app/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` создаётся при SSR и доступен только на сервере.

Через `ssrContext` доступны:
- `url` (string) — URL текущего запроса.
- `event` ([h3](https://github.com/h3js/h3)) — объект запроса и ответа текущего маршрута.
- `payload` (object) — объект payload NuxtApp.

### `payload`

`payload` передаёт данные и состояние с сервера на клиент. На клиенте после передачи доступны:

- `serverRendered` (boolean) — ответ отрендерен на сервере.
- `data` (object) — данные, полученные через [`useFetch`](/docs/4.x/api/composables/use-fetch) или [`useAsyncData`](/docs/4.x/api/composables/use-async-data), доступны в `payload.data`. Они кэшируются и предотвращают повторную загрузку при одинаковых запросах.

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

  После загрузки `count` через [`useAsyncData`](/docs/4.x/api/composables/use-async-data) в `payload.data` будет запись `{ count: 1 }`.

  Тот же `payload.data` доступен на сервере через [`ssrContext`](/docs/4.x/api/composables/use-nuxt-app#ssrcontext).

- `state` (object) — общее состояние, заданное композаблом [`useState`](/docs/4.x/api/composables/use-state), доступно в `payload.state.[имя-состояния]`.

  ```ts [app/plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  It is also possible to use more advanced types, such as `ref`, `reactive`, `shallowRef`, `shallowReactive` and `NuxtError`.

#### Собственный reducer/reviver

  С [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) можно задать свой reducer/reviver для типов, не поддерживаемых Nuxt.

  :video-accordion{title="Видео Alexander Lichter: сериализация payload, в том числе классов" videoId="8w6ffRBs8a4"}

  В примере ниже заданы reducer (сериализатор) и reviver (десериализатор) для класса [Luxon](https://moment.github.io/luxon/#/) DateTime через payload-плагин.

  ```ts [app/plugins/date-time-payload.ts]
  /**
   * Такой плагин выполняется очень рано, до восстановления payload.
   * Роутер и другие свойства Nuxt ещё недоступны.
   * Строка "DateTime" — идентификатор типа, должна совпадать в reducer и reviver.
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

`nuxtApp.isHydrating` (boolean) — идёт ли гидрация приложения на клиенте.

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
Сюда часто попадают из-за сообщения «Nuxt instance unavailable». Используйте метод по необходимости и присылайте примеры проблем, чтобы их можно было решить на уровне фреймворка.
::

`runWithContext` вызывает функцию с явно переданным контекстом Nuxt. Обычно контекст передаётся неявно, но в сложных сценариях с `async`/`await` в middleware/плагинах контекст может сброситься после асинхронного вызова.

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // контекст Vue/Nuxt теряется здесь из-за try/catch
  } catch (e) {
    user = null
  }
  if (!user) {
    // восстанавливаем контекст Nuxt для вызова navigateTo
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### Использование

```ts
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: функция, которой нужен контекст текущего приложения Nuxt. Контекст подставится автоматически.

`runWithContext` возвращает результат вызова `functionWithContext`.

#### Подробнее о контексте

Composition API Vue (и композаблы Nuxt) опираются на неявный контекст. Vue сохраняет текущий экземпляр компонента (а Nuxt — nuxtApp) в глобальную переменную и сбрасывает её в том же тике. На сервере обрабатываются запросы разных пользователей в одном глобальном контексте, поэтому Nuxt и Vue сбрасывают экземпляр сразу после использования, чтобы не утекала общая ссылка.

Итог: Composition API и композаблы Nuxt доступны только в рамках жизненного цикла и до первого await:

```ts
// --- Vue internal ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue/Nuxt записывает текущий компонент в _vueInstance при вызове setup()
async function setup () {
  getCurrentInstance() // работает
  await someAsyncOperation() // перед await контекст сбрасывается!
  getCurrentInstance() // null
}
```

Классическое решение — сохранить экземпляр в переменную при первом вызове (`const instance = getCurrentInstance()`), но тогда вложенные композаблы должны принимать экземпляр явно. Это ограничение дизайна, а не баг.

В `<script setup>` Vue при компиляции подставляет восстановление контекста после асинхронных вызовов:

```ts
const __instance = getCurrentInstance() // Generated by Vue compiler
getCurrentInstance() // работает
await someAsyncOperation() // контекст сброшен
__restoreInstance(__instance) // генерирует компилятор Vue
getCurrentInstance() // снова работает
```

Подробнее о том, как Vue восстанавливает контекст: [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723).

#### Решение

`runWithContext` восстанавливает контекст вручную, по аналогии с тем, как это делает `<script setup>`.

Nuxt использует [unjs/unctx](https://github.com/unjs/unctx) для поддержки композаблов в плагинах и middleware. Благодаря этому `navigateTo()` и другие работают без явной передачи `nuxtApp`. Подробнее: [unjs/unctx#2](https://github.com/unjs/unctx/issues/2), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4), [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884).

Vue восстанавливает контекст только в `<script setup>`. В Nuxt такая трансформация добавлена для `defineNuxtPlugin()` и `defineNuxtRouteMiddleware()` — при их использовании контекст восстанавливается автоматически.

#### Известные проблемы

Трансформация unctx для авто-восстановления контекста некорректно ведёт себя с `try/catch`, внутри которого есть `await` — в таких случаях нужен ручной вызов `runWithContext`.

#### Нативный async-контекст

Экспериментальная возможность — [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) и поддержка в unctx: async-контекст доступен **нативно** в любых вложенных асинхронных композаблах без трансформации и без ручной передачи контекста.

::tip
Нативный async-контекст сейчас работает в Bun и Node.
::

:read-more{to="/docs/4.x/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

Работает так же, как `useNuxtApp`, но при недоступном контексте возвращает `null` вместо исключения.

Подходит для композаблов, которым не обязателен `nuxtApp`, или для проверки наличия контекста без исключения.

Пример:

```ts [composable.ts]
export function useStandType () {
  // На клиенте всегда есть контекст
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->
