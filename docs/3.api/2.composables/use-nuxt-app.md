---
title: 'useNuxtApp'
description: 'Доступ к общему контексту времени выполнения приложения Nuxt.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` - это встроенный композабл, предоставляющий доступ к общему контексту времени выполнения Nuxt, также известному как [Nuxt-контекст](/docs/guide/going-further/nuxt-app#the-nuxt-context), который доступен как на клиенте, так и на сервере. Он помогает вам получить доступ к экземпляру приложения Vue, хукам времени выполнения, переменным runtime-конфига и внутренним состояниям, таким как `ssrContext` и `payload`.

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

Если контекст времени выполнения недоступен в вашей области видимости, `useNuxtApp` выбросит исключение при вызове. Вы можете использовать [`tryUseNuxtApp`](#tryusenuxtapp) вместо этого для композаблов, которые не требуют `nuxtApp`, или чтобы просто проверить, доступен ли контекст или нет без исключения.

<!--
note
By default, the shared runtime context of Nuxt is namespaced under the [`buildId`](/docs/api/nuxt-config#buildid) option. It allows the support of multiple runtime contexts.

## Параметры

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->

## Методы

### `provide (name, value)`

`nuxtApp` - это контекст времени выполнения, который вы можете расширить с помощью [Nuxt-плагинов](/docs/guide/directory-structure/plugins). Используйте функцию `provide` для создания плагинов Nuxt, чтобы значения и вспомогательные методы стали доступны в вашем приложении Nuxt для всех композаблов и компонентов.

Функция `provide` принимает параметры `name` и `value`.

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Привет, ${name}!`)

// Выведет "Привет, name!"
console.log(nuxtApp.$hello('name'))
```

Как видно из примера выше, `$hello` стал новой и пользовательской частью контекста `nuxtApp` и доступен во всех местах, где доступен `nuxtApp`.

### `hook(name, cb)`

Хуки, доступные в `nuxtApp`, позволяют вам настраивать аспекты времени выполнения вашего Nuxt-приложения. Вы можете использовать хуки времени выполнения в композаблах Vue.js и [Nuxt-плагинах](/docs/guide/directory-structure/plugins), чтобы подключиться к жизненному циклу рендеринга.

Функция `hook` полезна для добавления пользовательской логики, подключаясь к жизненному циклу рендеринга в определенной точке. Функция `hook` в основном используется при создании плагинов Nuxt.

Смотрите [хуки жизненного цикла](/docs/api/advanced/hooks#app-hooks-runtime) для доступных runtime-хуков, вызываемых Nuxt.

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* ваш код находится здесь */
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

`callHook` возвращает промис при вызове любого из существующих хуков.

```ts
await nuxtApp.callHook('my-plugin:init')
```

## Свойства

Функция `useNuxtApp()` открывает следующие свойства, которые вы можете использовать для расширения и настройки вашего приложения, а также для обмена состоянием, данными и переменными.

### `vueApp`

`vueApp` - это глобальный Vue.js [экземпляр приложения](https://ru.vuejs.org/api/application.html#application-api), к которому вы можете получить доступ через `nuxtApp`.

Некоторые полезные методы:
- [`component()`](https://ru.vuejs.org/api/application.html#app-component) - Регистрирует глобальный компонент, если передается имя в виде строки и определение компонента, или извлекает уже зарегистрированный компонент, если передается только имя.
- [`directive()`](https://ru.vuejs.org/api/application.html#app-directive) - Регистрирует глобальную пользовательскую директиву, если передается имя в виде строки и определение директивы, или извлекает уже зарегистрированную, если передано только имя [(пример)](/docs/guide/directory-structure/plugins#vue-directives).
- [`use()`](https://ru.vuejs.org/api/application.html#app-use) - Устанавливает **[Vue.js-плагин](https://ru.vuejs.org/guide/reusability/plugins.html)** [(пример)](/docs/guide/directory-structure/plugins#vue-plugins).

:read-more{icon="i-simple-icons-vuedotjs" to="https://ru.vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` генерируется во время рендеринга на сервере и доступен только на сервере.

Nuxt раскрывает следующие свойства через `ssrContext`:
- `url` (string) - Текущий url запроса.
- `event` (request event - [unjs/h3](https://github.com/unjs/h3)) - Доступ к запросу и ответу текущего маршрута.
- `payload` (object) - Объект полезной нагрузки NuxtApp.

### `payload`

`payload` передает данные и переменные состояния с сервера на клиента. Следующие ключи будут доступны клиенту после того, как они будут переданы с сервера:

- `ServerRendered` (boolean) - Указывает, что ответ уже отрендерен на сервере.
- `data` (object) - Когда вы получаете данные из конечной точки API, используя либо [`useFetch`](/docs/api/composables/use-fetch), либо [`useAsyncData`](/docs/api/composables/use-async-data), результирующая полезная нагрузка может быть доступна из `payload.data`. Эти данные кэшируются и помогают предотвратить получение одних и тех же данных в случае, если идентичный запрос выполняется несколько раз.

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

  После получения значения `count` с помощью [`useAsyncData`](/docs/api/composables/use-async-data) в примере выше, если вы обратитесь к `payload.data`, вы увидите `{ count: 1 }`, записанные в нем.

  При обращении к тому же `payload.data` из [`ssrcontext`](#ssrcontext), вы можете получить доступ к тому же значению и на стороне сервера.

- `state` (object) - Когда вы используете композабл [`useState`](/docs/api/composables/use-state) в Nuxt для установки общего состояния, доступ к этим данным состояния осуществляется через `payload.state.[название-вашего-состояния]`.
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

  ::tip{icon="i-ph-video-duotone" to="https://www.youtube.com/watch?v=8w6ffRBs8a4" target="_blank"}
  Посмотрите видео от Александра Лихтера о сериализации полезной нагрузки, особенно в отношении классов.
  ::

  В примере ниже мы определяем редьюсер (или сериализатор) и ревайвер (или десериализатор) для класса [Luxon](https://moment.github.io/luxon/#/) DateTime, используя плагин полезной нагрузки.

  ```ts [plugins/date-time-payload.ts]
  /**
   * Этот вид плагина запускается в самом начале жизненного цикла Nuxt, до того, как мы получим полезную нагрузку.
   * У вас не будет доступа к маршрутизатору или другим инжектированным свойствам Nuxt.
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
Скорее всего, вы попали сюда, потому что получили сообщение "Nuxt instance unavailable". Пожалуйста, используйте этот метод осторожно и сообщайте о примерах, вызывающих проблемы, чтобы в конечном итоге их можно было решить на уровне фреймворка.
::

Метод `runWithContext` предназначен для вызова функции и передачи ей явного контекста Nuxt. Обычно контекст Nuxt передается неявно, и вам не нужно беспокоиться об этом. Однако при работе со сложными сценариями `async`/`await` в middleware/плагинах вы можете столкнуться с ситуацией, когда текущий экземпляр был сброшен после вызова async.

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // компилятор Vue/Nuxt теряет контекст из-за блока try/catch.
  } catch (e) {
    user = null
  }
  if (!user) {
    // а теперь применяем правильный Nuxt-контекст к нашему вызову `navigateTo`.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### Использование

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: Любая функция, которая требует контекста текущего приложения Nuxt. Этот контекст будет правильно применен автоматически.

`runWithContext` вернет то, что возвращает `functionWithContext`.

#### Более глубокое объяснение контекста

Vue.js Composition API (и композаблы Nuxt аналогично) работают в зависимости от неявного контекста. Во время жизненного цикла Vue устанавливает временный экземпляр текущего компонента (а Nuxt - временный экземпляр nuxtApp) в глобальную переменную и отменяет его в том же тике. При рендеринге на сервере происходит множество запросов от разных пользователей, а nuxtApp работает в одном глобальном контексте. Поэтому Nuxt и Vue немедленно отменяют установку этого глобального инстанса, чтобы избежать утечки общей ссылки между двумя пользователями или компонентами.

Что это значит? Composition API и Nuxt-композаблы доступны только во время жизненного цикла и в том же тике перед любой асинхронной операцией:

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

Классическим решением этого является кэширование текущего экземпляра при первом вызове в локальную переменную типа `const instance = getCurrentInstance()` и использование ее в следующем вызове композабла, но проблема в том, что теперь любой вложенный вызов композабла должен явно принимать экземпляр в качестве аргумента, а не зависеть от неявного контекста Composition API. Это ограничение дизайна композаблов, а не проблема как таковая.

Чтобы преодолеть это ограничение, Vue выполняет некоторую закулисную работу при компиляции кода нашего приложения и восстанавливает контекст после каждого вызова `<script setup>`:

```js
const __instance = getCurrentInstance() // Генерируется компилятором Vue
getCurrentInstance() // Работает!
await someAsyncOperation() // Vue "снимает" контекст
__restoreInstance(__instance) // Генерируется компилятором Vue
getCurrentInstance() // Все ещё работает!
```

Для лучшего описания того, что на самом деле делает Vue, смотрите [unjs/unctx#2 (комментарий)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723).

#### Решение

Именно здесь можно использовать `runWithContext` для восстановления контекста, аналогично тому, как работает `<script setup>`.

Nuxt 3 внутренне использует [unjs/unctx](https://github.com/unjs/unctx) для поддержки композаблов, подобных Vue, для плагинов и middleware. Это позволяет композаблам, таким как `navigateTo()`, работать без непосредственной передачи им `nuxtApp` - привнося DX и преимущества производительности Composition API во весь фреймворк Nuxt.

Nuxt-композаблы имеют тот же дизайн, что и Vue Composition API, и поэтому нуждаются в аналогичном решении, чтобы волшебным образом выполнять это преобразование. Посмотрите [unjs/unctx#2](https://github.com/unjs/unctx/issues/2) (предложение), [unjs/unctx#4](https://github.com/unjs/unctx/pull/4) (реализация трансформации) и [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884) (интеграция в Nuxt).

В настоящее время Vue поддерживает только асинхронное восстановление контекста для `<script setup>` при использовании async/await. В Nuxt 3 была добавлена поддержка преобразования для `defineNuxtPlugin()` и `defineNuxtRouteMiddleware()`, что означает, что при их использовании Nuxt автоматически преобразует с восстановлением контекста.

#### Остающиеся проблемы

Преобразование `unjs/unctx` для автоматического восстановления контекста, похоже, имеет ошибку с операторами `try/catch`, содержащими `await`, которая в конечном итоге должна быть решена, чтобы устранить необходимость в предложенном выше обходном пути.

#### Нативный async-контекст

Используя новую экспериментальную возможность, можно включить нативную поддержку асинхронного контекста, используя [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) и новую поддержку unctx, чтобы сделать асинхронный контекст доступным **нативно** для **любого вложенного асинхронного композабла** без необходимости преобразования или ручной передачи/вызова контекста.

::tip
Нативная поддержка async-контекста в настоящее время работает в Bun и Node.
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

Эта функция работает точно так же, как и `useNuxtApp`, но вместо исключения возвращает `null`, если контекст недоступен.

Вы можете использовать ее для композаблов, которые не требуют `nuxtApp`, или для простой проверки наличия или отсутствия контекста без исключения.

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

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->
