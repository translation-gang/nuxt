---
title: 'definePageMeta'
description: 'Определите метаданные для компонентов вашей страницы.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` — это макрос компилятора, который вы можете использовать для установки метаданных для компонентов **страниц** в каталоге [`pages/`](/docs/3.x/directory-structure/pages) (если [не задано иное](/docs/3.x/api/nuxt-config#pages)). Так вы задаёте свои метаданные для каждого статического или динамического маршрута приложения Nuxt.

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

:read-more{to="/docs/3.x/directory-structure/pages#page-metadata"}

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

- **тип**: `PageMeta`

  Объект с метаданными страницы:

  **`name`**

  - **тип**: `string`

    Имя маршрута этой страницы. По умолчанию оно выводится из пути внутри каталога [`pages/`](/docs/3.x/directory-structure/pages).

  **`path`**

  - **тип**: `string`

    Можно задать [пользовательское регулярное выражение](/docs/3.x/api/utils/define-page-meta#using-a-custom-regular-expression), если шаблон сложнее, чем имя файла.

  **`props`**

  - **тип**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)

    Доступ к `params` маршрута как к пропсам компонента страницы.

  **`alias`**

  - **тип**: `string | string[]`

    Псевдонимы записи: дополнительные пути с тем же поведением, например `/users/:id` и `/u/:id`. У всех значений `alias` и `path` должны совпадать параметры.

  **`groups`**

  - **тип**: `string[]`

    Группы маршрутов страницы по структуре папок. Заполняется автоматически для страниц внутри [групп маршрутов](/docs/3.x/guide/directory-structure/app/pages#route-groups).

  **`keepalive`**

  - **тип**: `boolean` | [`KeepAliveProps`](https://ru.vuejs.org/api/built-in-components.html#keepalive)

    `true` — сохранять состояние страницы при смене маршрута; либо уточните поведение через [`KeepAliveProps`](https://ru.vuejs.org/api/built-in-components.html#keepalive).

  **`key`**

  - **тип**: `false` | `string` | `((route: RouteLocationNormalizedLoaded) => string)`

    Значение `key`, если нужно управлять перерисовкой `<NuxtPage>`.

  **`layout`**

  - **тип**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`

    Статическое или динамическое имя лейаута для маршрута. `false` — отключить лейаут по умолчанию.

  **`layoutTransition`**

  - **тип**: `boolean` | [`TransitionProps`](https://ru.vuejs.org/api/built-in-components.html#transition)

    Имя перехода для текущего лейаута; `false` — отключить переход лейаута.

  **`middleware`**

  - **тип**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | `Array<MiddlewareKey | NavigationGuard>`

    Анонимный или именованный middleware внутри `definePageMeta`. Подробнее — [middleware маршрутов](/docs/3.x/directory-structure/middleware).

  **`pageTransition`**

  - **тип**: `boolean` | [`TransitionProps`](https://ru.vuejs.org/api/built-in-components.html#transition)

    Имя перехода для страницы; `false` — отключить переход страницы.

  **`viewTransition`**

  - **тип**: `boolean | 'always'`

    **Экспериментально, только если [включено в nuxt.config](/docs/3.x/getting-started/transitions#view-transitions-api-experimental)**</br>
    Включить или выключить View Transitions для страницы.
    При `true` Nuxt не применит переход, если у пользователя `prefers-reduced-motion: reduce` (рекомендуется). При `always` переход применяется всегда.

  **`redirect`**

  - **тип**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)

    Куда перенаправить при прямом совпадении маршрута. Выполняется до хуков навигации и запускает новую навигацию.

  **`validate`**

  - **тип**: `(route: RouteLocationNormalized) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`

    Проверка, подходит ли маршрут для этой страницы: `true` / `false`; без другого совпадения — 404. Можно вернуть объект с `status`/`statusText` для немедленной ошибки (остальные совпадения не проверяются).

  **`scrollToTop`**

  - **тип**: `boolean | (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => boolean`

    Прокручивать ли страницу вверх перед отрисовкой. Своё поведение можно задать в `~/router.options.ts` (см. [кастомную маршрутизацию](/docs/3.x/guide/recipes/custom-routing#using-routeroptions)).

  **`[key: string]`**

  - **тип**: `any`

    Произвольные **пользовательские** метаданные; типобезопасно — через [расширение типа `meta`](/docs/3.x/directory-structure/pages/#typing-custom-metadata).

## Примеры

### Базовое использование

Ниже показано:

- как `key` может быть функцией;
- как `keepalive` исключает кэширование `<modal>` при переключении;
- как добавить пользовательское поле `pageType`:

```vue [pages/some-page.vue]
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

### Определение middleware

Middleware задаётся функцией прямо в `definePageMeta`, строкой с именем файла из `middleware/` или массивом строк:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // middleware функцией
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

  // ... или строкой
  middleware: 'auth',

  // ... или несколькими строками
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### Пользовательское регулярное выражение

Регулярка помогает разрешить конфликт пересекающихся маршрутов.

Маршруты «/test-category» и «/1234-post» подходят и под `[postId]-[postSlug].vue`, и под `[categorySlug].vue`.

Чтобы для `[postId]-[postSlug]` `postId` совпадал только с цифрами (`\d+`), в шаблоне страницы можно указать:

```vue [pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

Ещё примеры — [синтаксис сопоставления Vue Router](https://router.vuejs.org/guide/essentials/route-matching-syntax).

### Определение лейаута

Имя лейаута совпадает с именем файла в [`layouts/`](/docs/3.x/directory-structure/layouts) (по умолчанию). `layout: false` отключает лейаут:

```vue [pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // свой лейаут
  layout: 'admin',

  // ... или без лейаута по умолчанию
  layout: false,
})
</script>
```
