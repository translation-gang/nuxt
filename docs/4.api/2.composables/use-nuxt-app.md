---
title: 'useNuxtApp'
description: 'Доступ к общему контексту времени выполнения приложения Nuxt.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` — это встроенный композабл, предоставляющий доступ к общему контексту времени выполнения Nuxt, также известному как [Nuxt-контекст](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context), который доступен как на клиенте, так и на сервере. Он помогает вам получить доступ к экземпляру приложения Vue, runtime-хукам, переменным runtime-конфига и внутренним состояниям, таким как `ssrContext` и `payload`.

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

Если контекст времени выполнения недоступен в вашей области видимости, `useNuxtApp` выбросит исключение при вызове. Вместо этого вы можете использовать [`tryUseNuxtApp`](#tryusenuxtapp) для композаблов, которые не требуют `nuxtApp`, или просто для проверки доступности контекста без исключения.

<!--
По умолчанию общий runtime-контекст Nuxt изолирован с помощью опции [`buildId`](/docs/3.x/api/nuxt-config#buildid), чтобы поддерживать несколько контекстов.

## Параметры

- `appName`: необязательное имя приложения. Если не указано, используется `buildId` из Nuxt; иначе должно совпадать с существующим `buildId`. -->

## Методы

### `provide (name, value)`

`nuxtApp` — это контекст времени выполнения, который вы можете расширить с помощью [Nuxt-плагинов](/docs/3.x/directory-structure/plugins). Используйте функцию `provide` для создания плагинов Nuxt, чтобы сделать значения и вспомогательные методы доступными для всех композаблов и компонентов вашего приложения Nuxt.

Функция `provide` принимает параметры `name` и `value`.

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Привет, ${name}!`)

// Выведет "Привет, name!"
console.log(nuxtApp.$hello('name'))
```

Как в примере выше, `$hello` становится частью `nuxtApp` и доступен везде, где есть контекст Nuxt.

### `hook(name, cb)`

Хуки, доступные в `nuxtApp`, позволяют вам настраивать аспекты времени выполнения вашего Nuxt-приложения. Вы можете использовать runtime-хуки в композаблах Vue.js и [Nuxt-плагинах](/docs/3.x/directory-structure/plugins), чтобы подключиться к жизненному циклу рендеринга.

`hook` подключает вашу логику к этапам рендеринга; чаще всего его вызывают из Nuxt-плагинов.

Смотрите [хуки жизненного цикла](/docs/3.x/api/advanced/hooks#app-hooks-runtime) для получения информации о доступных runtime-хуках, вызываемых Nuxt.

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* ваш код находится здесь */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('хук vue:error')
    // только клиент (пример):
    // if (import.meta.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)`

`callHook` возвращает промис при вызове любого из существующих хуков.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## Свойства

Функция `useNuxtApp()` открывает следующие свойства, которые вы можете использовать для расширения и настройки вашего приложения, а также для обмена состоянием, данными и переменными.

### `vueApp`

`vueApp` — это глобальный [экземпляр приложения](https://ru.vuejs.org/api/application.html#application-api) Vue.js, к которому вы можете получить доступ через `nuxtApp`.

Некоторые полезные методы:
- [`component()`](https://ru.vuejs.org/api/application.html#app-component) — Регистрирует глобальный компонент, если передаётся имя в виде строки и определение компонента, или извлекает уже зарегистрированный компонент, если передаётся только имя.
- [`directive()`](https://ru.vuejs.org/api/application.html#app-directive) — Регистрирует глобальную пользовательскую директиву, если передаётся имя в виде строки и определение директивы, или извлекает уже зарегистрированную, если передано только имя [(пример)](/docs/3.x/directory-structure/plugins#vue-directives).
- [`use()`](https://ru.vuejs.org/api/application.html#app-use) — подключает **[плагин Vue](https://ru.vuejs.org/guide/reusability/plugins.html)** [(пример)](/docs/3.x/directory-structure/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://ru.vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` генерируется во время рендеринга на сервере и доступен только на сервере.

Nuxt предоставляет через `ssrContext`:
- `url` (`string`) — URL текущего запроса;
- `event` (объект события [h3](https://github.com/h3js/h3)) — доступ к запросу и ответу;
- `payload` (`object`) — объект payload приложения Nuxt.

### `payload`

`payload` передаёт данные и переменные состояния с сервера на клиент. Следующие ключи будут доступны клиенту после того, как они будут переданы с сервера:

- `serverRendered` (`boolean`) — ответ уже отрисован на сервере;
- `data` (`object`) — при загрузке через [`useFetch`](/docs/3.x/api/composables/use-fetch) или [`useAsyncData`](/docs/3.x/api/composables/use-async-data) результат попадает в `payload.data`; записи кэшируются, чтобы не дублировать одинаковые запросы.

  ::code-group
  ```vue [app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', () => $fetch('/api/count'))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler(event => {
    return { count: 1 }
  })
  ```
  ::

  После получения значения `count` с помощью [`useAsyncData`](/docs/3.x/api/composables/use-async-data) в примере выше, если вы обратитесь к `payload.data`, вы увидите `{ count: 1 }`, записанные в нём.

  Обращаясь к тем же `payload.data` из [`ssrContext`](#ssrcontext), на сервере вы получите то же значение.

- `state` (`object`) — при использовании [`useState`](/docs/3.x/api/composables/use-state) общее состояние доступно как `payload.state.<ключ-состояния>`.
-
  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  Также можно использовать более сложные типы, такие как `ref`, `reactive`, `shallowRef`, `shallowReactive` и `NuxtError`.

  Начиная с [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements), можно определить свой собственный редьюсер/ревайвер для типов, которые не поддерживаются Nuxt.

  :video-accordion{title="Посмотрите видео от Александра Лихтера о сериализации полезной нагрузки, особенно в отношении классов" videoId="8w6ffRBs8a4"}

  В примере ниже мы определяем редьюсер (или сериализатор) и ревайвер (или десериализатор) для класса [Luxon](https://moment.github.io/luxon/#/) DateTime, используя плагин полезной нагрузки.

  ```ts [plugins/date-time-payload.ts]
  /**
   * Такого рода плагины запускаются в самом начале жизненного цикла Nuxt, до того, как мы получим полезную нагрузку.
   * У вас не будет доступа к маршрутизатору или другим внедряемым свойствам Nuxt.
   *
   * Обратите внимание, что строка "DateTime" является идентификатором типа и должна
   * быть одинаковой как на редьюсере, так и на ревайвере.
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

Используйте `nuxtApp.isHydrating` (boolean), чтобы проверить, гидрируется ли приложение Nuxt на клиенте.

```ts [components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  }
})
```

### `runWithContext`

::note
Скорее всего, вы попали сюда, потому что получили сообщение «Экземпляр Nuxt недоступен» (`Nuxt instance unavailable`). Пожалуйста, используйте этот метод осторожно и сообщайте о примерах, вызывающих проблемы, чтобы в конечном итоге их можно было решить на уровне фреймворка.
::

Метод `runWithContext` предназначен для вызова функции и передачи ей явного контекста Nuxt. Обычно контекст Nuxt передаётся неявно, и вам не нужно беспокоиться об этом. Однако в сложных сценариях с `async`/`await` в middleware или плагинах контекст может сброситься после асинхронного шага.

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // компилятор Vue/Nuxt теряет контекст из-за try/catch с await
  } catch (e) {
    user = null
  }
  if (!user) {
    // а теперь применяем к нашему вызову `navigateTo` правильный Nuxt-контекст.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### Использование

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext` — любая функция, которой нужен текущий контекст Nuxt; контекст подставится автоматически.

`runWithContext` вернёт то, что вернёт `functionWithContext`.

#### Более глубокое объяснение контекста

Composition API Vue (и композаблы Nuxt) опираются на неявный контекст: в ходе жизненного цикла Vue кладёт текущий компонент (а Nuxt — `nuxtApp`) в глобальную переменную и снимает её в том же тике. На сервере параллельно идут запросы разных пользователей при одном процессе, поэтому Nuxt и Vue сразу снимают глобальный экземпляр, чтобы не смешивать контексты.

Итог: композаблы доступны только в том же тике, до первой асинхронной операции:

```js
// --- Внутренняя часть Vue ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt устанавливает глобальную переменную, ссылающуюся на текущий компонент, в _vueInstance при вызове setup()
async function setup() {
  getCurrentInstance() // Работает
  await someAsyncOperation() // Vue отменяет контекст в том же тике перед async-операцией!
  getCurrentInstance() // null
}
```

Классический обход — сохранить `const instance = getCurrentInstance()` и передавать экземпляр явно во вложенные вызовы, но тогда композаблы перестают опираться на неявный контекст — это компромисс дизайна, а не «баг» Vue.

Чтобы преодолеть это ограничение, Vue выполняет некоторую закулисную работу при компиляции кода нашего приложения и восстанавливает контекст после каждого вызова `<script setup>`:

```js
const __instance = getCurrentInstance() // Генерируется компилятором Vue
getCurrentInstance() // Работает!
await someAsyncOperation() // Vue "снимает" контекст
__restoreInstance(__instance) // Генерируется компилятором Vue
getCurrentInstance() // снова работает
```

Для лучшего описания того, что на самом деле делает Vue, смотрите [unjs/unctx#2 (комментарий)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723).

#### Решение

Именно здесь можно использовать `runWithContext` для восстановления контекста, аналогично тому, как работает `<script setup>`.

Внутри Nuxt использует [unjs/unctx](https://github.com/unjs/unctx), чтобы плагины и прослойки маршрутов (middleware) вели себя как композаблы Vue: `navigateTo()` и аналоги работают без явной передачи `nuxtApp`.

У Nuxt-композаблов та же модель, что у Composition API, поэтому нужна такая же поддержка контекста. См. [unjs/unctx#2](https://github.com/unjs/unctx/issues/2), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4) и [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884).

Vue пока поддерживает восстановление async-контекста для `<script setup>` при использовании async/await. В Nuxt добавлена трансформация для `defineNuxtPlugin()` и `defineNuxtRouteMiddleware()`: при их использовании Nuxt автоматически применяет восстановление контекста.

#### Остающиеся проблемы

Автовосстановление контекста в unctx пока некорректно ведёт себя с `try/catch`, внутри которых есть `await`; со временем это должно убрать необходимость в обходных путях вроде `runWithContext`.

#### Нативный async-контекст

Используя новую экспериментальную возможность, можно включить нативную поддержку асинхронного контекста, используя [`AsyncLocalStorage` Node.js](https://nodejs.org/api/async_context.html#class-asynclocalstorage) и новую поддержку unctx, чтобы сделать асинхронный контекст доступным **нативно** для **любого вложенного асинхронного композабла** без необходимости преобразования или ручной передачи/вызова контекста.

::tip
Нативная поддержка async-контекста в настоящее время работает в Bun и Node.
::

:read-more{to="/docs/3.x/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

Эта функция работает точно так же, как и `useNuxtApp`, но вместо исключения возвращает `null`, если контекст недоступен.

Вы можете использовать её для композаблов, которые не требуют `nuxtApp`, или для простой проверки наличия или отсутствия контекста без исключения.

Пример использования:

```ts [composable.ts]
export function useStandType() {
  // Всегда работает на клиенте
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Параметры

- `appName`: необязательное имя приложения; если не задано — используется `buildId` Nuxt, иначе должно совпадать с существующим `buildId`. -->
