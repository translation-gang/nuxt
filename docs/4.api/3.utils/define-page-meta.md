---
title: 'definePageMeta'
description: 'Задаёт метаданные для компонентов страниц.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` — компиляторный макрос для метаданных **страничных** компонентов в [`app/pages/`](/docs/4.x/directory-structure/app/pages) (если не [задано иное](/docs/4.x/api/nuxt-config#pages)). Так задаются свои метаданные для каждого статического или динамического маршрута.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/4.x/directory-structure/app/pages#page-metadata"}

## Тип

```ts [Signature]
export function definePageMeta (meta: PageMeta): void

interface PageMeta {
  validate?: ((route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>)
  redirect?: RouteRecordRedirectOption
  name?: string
  path?: string
  props?: RouteRecordRaw['props']
  alias?: string | string[]
  groups?: string[]
  pageTransition?: boolean | TransitionProps
  layoutTransition?: boolean | TransitionProps
  viewTransition?: ViewTransitionPageOptions['enabled'] | ViewTransitionPageOptions
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

  Объект с такими полями метаданных страницы:

  **`name`**

  - **Тип**: `string`

    Имя маршрута этой страницы. По умолчанию имя строится по пути внутри каталога [`app/pages/`](/docs/4.x/directory-structure/app/pages).

  **`path`**

  - **Тип**: `string`

    Можно задать [пользовательское регулярное выражение](/docs/4.x/api/utils/define-page-meta#using-a-custom-regular-expression), если шаблон сложнее, чем выражается именем файла.

  **`props`**
  
  - **Тип**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    Параметры маршрута `params` передаются в страницу как пропсы.

  **`alias`**

  - **Тип**: `string | string[]`

    Псевдонимы записи: дополнительные пути, ведущие себя как копия записи. Удобно для сокращений вроде `/users/:id` и `/u/:id`. У всех значений `alias` и `path` должны совпадать параметры.

  **`groups`**

  - **Тип**: `string[]`

    Группы маршрутов, к которым относится страница, по структуре папок. Автоматически заполняется для страниц внутри [групп маршрутов](/docs/4.x/guide/directory-structure/app/pages#route-groups).

  **`keepalive`**

  - **Тип**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)

    `true`, чтобы сохранять состояние страницы при смене маршрута, или [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive) для тонкой настройки.

  **`key`**

  - **Тип**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    Явный `key`, когда нужно управлять перерисовкой `<NuxtPage>`.

  **`layout`**

  - **Тип**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    Статическое или реактивное имя layout для маршрута. `false` отключает layout по умолчанию.

  **`layoutTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    Имя перехода для текущего layout или `false`, чтобы отключить переход layout.

  **`middleware`**

  - **Тип**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    Анонимный или именованный middleware прямо в `definePageMeta`. Подробнее — [route middleware](/docs/4.x/directory-structure/app/middleware).

  **`pageTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)

    Имя перехода для страницы или `false`, чтобы отключить переход страницы.

  **`viewTransition`**

  - **Тип**: `boolean | 'always' | ViewTransitionPageOptions`

    **Экспериментально, только при [включении в nuxt.config](/docs/4.x/getting-started/transitions#view-transitions-api-experimental)**</br>
    Включает или отключает View Transitions для страницы.
    При `true` Nuxt не применит переход, если у пользователя `prefers-reduced-motion: reduce` (рекомендуется). При `always` переход применяется всегда.

    Объект `ViewTransitionPageOptions` настраивает [типы view transition](/docs/4.x/getting-started/transitions#view-transition-types):
    - `enabled`: `boolean | 'always'` — включить/выключить переход
    - `types`: `string[] | (to, from) => string[]` — типы для любого перехода, связанного с этой страницей
    - `toTypes`: `string[] | (to, from) => string[]` — только при переходе **на** эту страницу
    - `fromTypes`: `string[] | (to, from) => string[]` — только при переходе **с** этой страницы

  **`redirect`**

  - **Тип**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    Куда редиректить при прямом совпадении маршрута. Редирект до навигационных хранителей и запускает новую навигацию.

  **`validate`**

  - **Тип**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    Проверка, можно ли отрисовать этот маршрут этой страницей. `true` — да, `false` — нет; при отсутствии другого совпадения — 404. Можно вернуть объект с `status`/`statusText` для немедленной ошибки (другие совпадения не проверяются).

  **`scrollToTop`**

  - **Тип**: `boolean | (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean`

    Прокручивать ли вверх перед рендером страницы. Переопределить поведение по умолчанию можно в `~/router.options.ts` (см. [кастомный роутинг](/docs/4.x/guide/recipes/custom-routing#using-routeroptions)).

  **`[key: string]`**

  - **Тип**: `any`

    Помимо перечисленного, можно задать **пользовательские** метаданные. Для типобезопасности — [расширение типа объекта `meta`](/docs/4.x/directory-structure/app/pages/#typing-custom-metadata).

## Примеры

### Базовое использование

Пример показывает:

- `key` как функцию, возвращающую значение;
- `keepalive`, чтобы `<modal>` не кэшировался при переключении между компонентами;
- пользовательское свойство `pageType`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,

  keepalive: {
    exclude: ['modal'],
  },

  pageType: 'Checkout',
})
</script>
```

### Объявление middleware

Middleware можно задать функцией прямо в `definePageMeta` или строкой — именем файла в `app/middleware/`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // define middleware as a function
  middleware: [
    function (to, from) {
      const auth = useState('auth')

      if (!auth.value.authenticated) {
        return navigateTo('/login')
      }

      if (to.path !== '/checkout') {
        return navigateTo('/checkout')
      }
    },
  ],

  // ... or a string
  middleware: 'auth',

  // ... or multiple strings
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### Пользовательское регулярное выражение

Помогает разрешить конфликты перекрывающихся маршрутов.

Маршруты «/test-category» и «/1234-post» совпадают и с `[postId]-[postSlug].vue`, и с `[categorySlug].vue`.

Чтобы для `postId` в `[postId]-[postSlug]` принимались только цифры (`\d+`), в шаблоне страницы `[postId]-[postSlug].vue` можно указать:

```vue [app/pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

Другие примеры — [синтаксис сопоставления Vue Router](https://router.vuejs.org/guide/essentials/route-matching-syntax).

### Задание layout

Имя layout совпадает с именем файла в [`app/layouts/`](/docs/4.x/directory-structure/app/layouts) (по умолчанию). `layout: false` отключает layout:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // set custom layout
  layout: 'admin',

  // ... or disable a default layout
  layout: false,
})
</script>
```
