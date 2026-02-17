---
title: 'definePageMeta'
description: "Метаданные страничных компонентов."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

`definePageMeta` — компиляторный макрос для задания метаданных **страничных** компонентов из [`app/pages/`](/docs/4.x/directory-structure/app/pages) (если путь не [переопределён](/docs/4.x/api/nuxt-config#pages)). Позволяет задать метаданные для каждого статического или динамического маршрута.

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

  Объект с метаданными страницы:

  **`name`**

  - **Тип**: `string`  
  Имя маршрута страницы. По умолчанию генерируется по пути в [`app/pages/`](/docs/4.x/directory-structure/app/pages).

  **`path`**

  - **Тип**: `string`  
  [Своё регулярное выражение](/docs/4.x/api/utils/define-page-meta#using-a-custom-regular-expression) для маршрута, если имени файла недостаточно.

  **`props`**

  - **Тип**: [`RouteRecordRaw['props']`](https://router.vuejs.org/guide/essentials/passing-props)  
  Передавать `params` маршрута как пропсы в страничный компонент.

  **`alias`**

  - **Тип**: `string | string[]`  
  Псевдонимы маршрута — дополнительные пути, ведущие на ту же страницу (например `/users/:id` и `/u/:id`). Параметры у `alias` и `path` должны совпадать.

  **`groups`**

  - **Тип**: `string[]`  
  Группы маршрутов по структуре папок. Заполняется автоматически для [route groups](/docs/4.x/guide/directory-structure/app/pages#route-groups).

  **`keepalive`**

  - **Тип**: `boolean` | [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)  
  `true` — сохранять состояние страницы при смене маршрута; объект — тонкая настройка KeepAlive.

  **`key`**

  - **Тип**: `false` | `string` | `((route) => string)`  
  Ключ для управления перерисовкой `<NuxtPage>`.

  **`layout`**

  - **Тип**: `false` | `LayoutKey` | `Ref<LayoutKey>` | `ComputedRef<LayoutKey>`  
  Имя макета для маршрута (статическое или реактивное). `false` — отключить макет по умолчанию.

  **`layoutTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)  
  Имя перехода для смены макета. `false` — отключить переход.

  **`middleware`**

  - **Тип**: `MiddlewareKey` | [`NavigationGuard`](https://router.vuejs.org/api/interfaces/navigationguard) | массив  
  Middleware для страницы (анонимный или по имени). Подробнее: [маршрутный middleware](/docs/4.x/directory-structure/app/middleware).

  **`pageTransition`**

  - **Тип**: `boolean` | [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)  
  Имя перехода для страницы. `false` — отключить.

  **`viewTransition`**

  - **Тип**: `boolean | 'always'`  
  **Экспериментально, нужно [включить в nuxt.config](/docs/4.x/getting-started/transitions#view-transitions-api-experimental).**  
  Включить/выключить View Transitions для страницы. `true` — не применять при `prefers-reduced-motion: reduce`. `'always'` — применять всегда.

  **`redirect`**

  - **Тип**: [`RouteRecordRedirectOption`](https://router.vuejs.org/guide/essentials/redirect-and-alias)  
  Куда редиректить при прямом совпадении маршрута. Редирект выполняется до навигационных охранников.

  **`validate`**

  - **Тип**: `(route) => boolean | Promise<boolean> | Partial<NuxtError> | Promise<Partial<NuxtError>>`  
  Проверка, можно ли отобразить маршрут этой страницей. `true` — да, `false` — нет (при отсутствии других совпадений — 404). Можно вернуть объект с `status`/`statusText` для немедленной ошибки.

  **`scrollToTop`**

  - **Тип**: `boolean | (to, from) => boolean`  
  Прокручивать ли вверх перед отображением страницы. Глобальное поведение можно переопределить в `~/router.options.ts` ([кастомный роутинг](/docs/4.x/guide/recipes/custom-routing#using-routeroptions)).

  **`[key: string]`**

  - **Тип**: `any`  
  Произвольные метаданные. Типы можно расширить [через augmentation](/docs/4.x/directory-structure/app/pages/#typing-custom-metadata).

## Примеры

### Базовое использование

В примере:

- `key` задаётся функцией;
- `keepalive` исключает компонент `<modal>` из кэша при переключении;
- добавлено кастомное свойство `pageType`:

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

### Определение middleware

Middleware можно задать функцией прямо в `definePageMeta` или строкой — именем файла из `app/middleware/`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  // middleware как функция
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

  // или строка (имя файла)
  middleware: 'auth',

  // или несколько
  middleware: ['auth', 'another-named-middleware'],
})
</script>
```

### Своё регулярное выражение

Своё регулярное выражение помогает развести пересекающиеся маршруты. Например, "/test-category" и "/1234-post" могут совпадать и с `[postId]-[postSlug].vue`, и с `[categorySlug].vue`.

Чтобы в `[postId]-[postSlug]` только цифры в `postId`, задайте `path`:

```vue [app/pages/[postId\\]-[postSlug\\].vue]
<script setup lang="ts">
definePageMeta({
  path: '/:postId(\\d+)-:postSlug',
})
</script>
```

Подробнее: [синтаксис совпадения маршрутов Vue Router](https://router.vuejs.org/guide/essentials/route-matching-syntax).

### Выбор макета

Имя макета должно совпадать с именем файла в [`app/layouts/`](/docs/4.x/directory-structure/app/layouts). Чтобы отключить макет по умолчанию, задайте `layout: false`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
definePageMeta({
  layout: 'admin',

  // отключить макет по умолчанию
  layout: false,
})
</script>
```
