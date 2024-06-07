---
title: 'definePageMeta'
description: 'Определите метаданные для компонентов вашей страницы.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` - это макрос компилятора, который вы можете использовать для установки метаданных для ваших компонентов **page**, расположенных в директории [`pages/`](/docs/guide/directory-structure/pages) (если [не указано иное](/docs/api/nuxt-config#страницы)). Таким образом, вы можете настроить пользовательские метаданные для каждого статического или динамического маршрута вашего следующего приложения.

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

:read-more{to="/docs/guide/directory-structure/pages/#page-metadata"}

## Тип

```ts
definePageMeta(meta: PageMeta) => void

interface PageMeta {
  validate?: (route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  alias?: string | string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: boolean | 'always'
  key?: false | string | ((route: RouteLocationNormalizedLoaded) => string)
  keepalive?: boolean | KeepAliveProps
  layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  scrollToTop?: boolean | ((to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean)
  [key: string]: unknown
}
```

## Параметры

### `meta`

- **Тип**: `PageMeta`

  Объект, принимающий следующие метаданные страницы:

  **`name`**

  - **Тип**: `string`

    Вы можете задать имя для маршрута этой страницы. По умолчанию имя генерируется на основе пути внутри директории [`pages/`](/docs/guide/directory-structure/pages).

  **`path`**

  - **Тип**: `string`

    Вы можете определить [пользовательское регулярное выражение](#using-a-custom-regular-expression), если у вас более сложный шаблон, чем имя файла.

  **`alias`**

  - **Тип**: `string | string[]`

    Псевдонимы для записи. Позволяет определять дополнительные пути, которые будут вести себя как копия записи. Позволяет использовать сокращенные пути, такие как `/users/:id` и `/u/:id`. Все значения `alias` и `path` должны иметь одинаковые параметры.

  **`keepalive`**

  - **Тип**: `boolean` | [`KeepAliveProps`](https://ru.vuejs.org/api/built-in-components.html#keepalive)

    Установите значение `true`, если вы хотите сохранить состояние страницы при изменении маршрута, или используйте [`KeepAliveProps`](https://ru.vuejs.org/api/built-in-components.html#keepalive) для более тонкого контроля.

  **`key`**

  - **Тип**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    Установите значение `key`, если вам нужно больше контроля над тем, когда компонент `<NuxtPage>` будет перерисовываться.

  **`layout`**

  - **Тип**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    Задайте статическое или динамическое имя лейаута для каждого маршрута. Это значение может быть установлено в `false` в случае, если макет по умолчанию должен быть отключен.

  **`layoutTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://ru.vuejs.org/api/built-in-components.html#transition)

    Задайте имя перехода, который будет применяться для текущего лейаута. Вы также можете установить это значение в `false`, чтобы отключить transition лейаута.

  **`middleware`**

  - **Тип**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/NavigationGuard.html#navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    Определение анонимного или именованного middleware непосредственно в definePageMeta. Узнайте больше о [middleware маршрутизации](/docs/guide/directory-structure/middleware).

  **`pageTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://ru.vuejs.org/api/built-in-components.html#transition)

    Установите имя перехода, которое будет применено для текущей страницы. Вы также можете установить это значение равным `false`, чтобы отключить переход страницы.

  **`viewTransition`**

  - **Тип**: `boolean | 'always'`

    **Экспериментальная функция, доступна только в том случае, если [включена в вашем файле nuxt.config](/docs/getting-started/transitions#view-transitions-api-experimental)**</br>
    Включить/выключить View Transitions для текущей страницы.
    Если установлено значение `true`, Nuxt не будет применять переход, если браузер пользователя соответствует параметру `prefers-reduced-motion: reduce` (рекомендуется). Если установлено значение `always`, Nuxt всегда будет применять переход.

  **`redirect`**

  - **Тип**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias.html#redirect-and-alias)

    Куда перенаправить, если маршрут соответствует напрямую. Перенаправление происходит до любого навигационного защитника и вызывает новую навигацию с новым целевым расположением.

  **`validate`**

  - **Тип**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    Проверьте, может ли данный маршрут быть правильно отображен с этой страницей. Верните `true`, если он действителен, или `false`, если нет. Если другого соответствия не будет найдено, это будет означать 404. Вы также можете непосредственно вернуть объект с `statusCode`/`statusMessage`, чтобы немедленно ответить с ошибкой (другие соответствия не будут проверяться).

  **`scrollToTop`**

  - **Тип**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    Укажите Nuxt, следует ли прокрутить страницу вверх перед ее отображением или нет. Если вы хотите переопределить стандартное поведение прокрутки Nuxt, вы можете сделать это в `~/app/router.options.ts` (см. [настраиваемая маршрутизация](/docs/guide/going-further/custom-routing#using-approuteroptions) для получения дополнительной информации).

  **`[key: string]`**

  - **Тип**: `any`

    Кроме вышеуказанных свойств, вы также можете задать пользовательские метаданные. Вам может потребоваться сделать это в безопасном для типов способе, [расширив тип объекта meta](/docs/guide/directory-structure/pages/#typing-custom-metadata).

## Примеры

### Базовое использование

В примере ниже демонстрируется:

- как `key` может быть функцией, которая возвращает значение;
- как свойство `keepalive` обеспечивает то, что компонент `<modal>` не кэшируется при переключении между несколькими компонентами;
- добавление `pageType` в качестве пользовательского свойства:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,

  keepalive: {
    exclude: ['modal']
  },

  pageType: 'Checkout'
})
</script>
```

### Определение Middleware

В примере ниже показано, как middleware можно определить с помощью `function` непосредственно в `definePageMeta` или установить в виде `string`, который соответствует имени файла middleware, расположенного в каталоге `middleware/`:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // определить middleware в виде функции
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
          return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    }
  ],

  // ... или в виде строки
  middleware: 'auth'

  // ... или в виде нескольких строк
  middleware: ['auth', 'another-named-middleware']
})
</script>
```

### Использование пользовательского регулярного выражения

Пользовательское регулярное выражение является хорошим способом разрешения конфликтов между пересекающимися маршрутами, например:

Два маршрута "/test-category" и "/1234-post" соответствуют как `[postId]-[postSlug].vue`, так и `[categorySlug].vue` страничным маршрутам.

Чтобы убедиться, что мы соответствуем только цифрам (`\d+`) для `postId` в маршруте `[postId]-[postSlug]`, мы можем добавить следующее в шаблон страницы `[postId]-[postSlug].vue`:

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug'
})
</script>
```

Для получения дополнительных примеров см. [Синтаксис соответствия Vue Router](https://router.vuejs.org/guide/essentials/route-matching-syntax.html).

### Определение лейаута

Вы можете определить лэйаут, который соответствует имени файла макета, расположенного (по умолчанию) в [директории `layouts/`](/docs/guide/directory-structure/layouts). Вы также можете отключить лейаут, установив для layout значение `false`:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // Установить кастомный лейаут
  layout: 'admin'

  // ... или выключить лейаут по умолчанию
  layout: false
})
</script>
```
