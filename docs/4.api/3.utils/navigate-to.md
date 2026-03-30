---
title: "navigateTo"
description: navigateTo — хелпер для программной навигации пользователя.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Использование

`navigateTo` доступен на сервере и на клиенте. Его можно вызывать в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) или напрямую для перехода по страницам.

::warning
Всегда используйте `await` или `return` для результата `navigateTo`.
::

::note
В маршрутах Nitro `navigateTo` не применяется. Для серверного редиректа в Nitro используйте [`sendRedirect`](https://h3.dev/utils/response#redirectlocation-status-statustext).
::

### В компоненте Vue

```vue
<script setup lang="ts">
// passing 'to' as a string
await navigateTo('/search')

// ... or as a route object
await navigateTo({ path: '/search' })

// ... or as a route object with query parameters
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### В route middleware

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

В route middleware **нужно возвращать** результат `navigateTo`, иначе поток выполнения middleware нарушится.

Так **работать не будет**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ This will not work as expected
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

`navigateTo` выполнится, но без `return` возможно непредсказуемое поведение.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

### Переход на внешний URL

Параметр `external` влияет на обработку URL:

- **Без `external: true`**:
  - внутренние URL работают как обычно;
  - внешние URL вызывают ошибку.

- **С `external: true`**:
  - внутренние URL открываются с полной перезагрузкой страницы;
  - внешние URL работают как ожидается.

#### Пример

```vue
<script setup lang="ts">
// will throw an error;
// navigating to an external URL is not allowed by default
await navigateTo('https://nuxt.com')

// will redirect successfully with the 'external' parameter set to 'true'
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### Открытие страницы в новой вкладке

```vue
<script setup lang="ts">
// will open 'https://nuxt.com' in a new tab
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500,
    },
  },
})
</script>
```

## Тип

```ts [Signature]
export function navigateTo (
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions,
): Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}

type OpenOptions = {
  target: string
  windowFeatures?: OpenWindowFeatures
}

type OpenWindowFeatures = {
  popup?: boolean
  noopener?: boolean
  noreferrer?: boolean
} & XOR<{ width?: number }, { innerWidth?: number }>
  & XOR<{ height?: number }, { innerHeight?: number }>
  & XOR<{ left?: number }, { screenX?: number }>
  & XOR<{ top?: number }, { screenY?: number }>
```

## Параметры

### `to`

**Тип**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/routelocationoptions) | `undefined` | `null`

**По умолчанию**: `'/'`

`to` — строка или объект маршрута. При `undefined` или `null` подставляется `'/'`.

#### Пример

```ts
// Passing the URL directly will redirect to the '/blog' page
await navigateTo('/blog')

// Using the route object, will redirect to the route with the name 'blog'
await navigateTo({ name: 'blog' })

// Redirects to the 'product' route while passing a parameter (id = 1) using the route object.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (необязательно)

**Тип**: `NavigateToOptions`

Объект с полями:

- `replace`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`
  - По умолчанию `navigateTo` делает push маршрута в экземпляр Vue Router на клиенте.

    `replace: true` заменяет текущую запись в истории вместо push.

- `redirectCode`

  - **Тип**: `number`
  - **По умолчанию**: `302`

  - При редиректе на сервере по умолчанию выставляется [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302).

    Другой код, например [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301), задаётся через `redirectCode`.

- `external`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`

  - При `true` разрешён переход на внешний URL. Иначе `navigateTo` выбросит ошибку.

- `open`

  - **Тип**: `OpenOptions`
  - Навигация через [window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open). Только на клиенте; на сервере игнорируется.

    Поля:

  - `target`

    - **Тип**: `string`
    - **По умолчанию**: `'_blank'`

    - Имя контекста просмотра без пробелов.

  - `windowFeatures`

    - **Тип**: `OpenWindowFeatures`

    - Свойства:

      | Свойство                  | Тип       | Описание                                                                                       |
      |---------------------------|-----------|------------------------------------------------------------------------------------------------|
      | `popup`                   | `boolean` | Минимальное всплывающее окно вместо новой вкладки; вид решает браузер.                          |
      | `width` или `innerWidth`   | `number`  | Ширина области контента (не меньше 100 px), с полосами прокрутки.                              |
      | `height` или `innerHeight` | `number`  | Высота области контента (не меньше 100 px), с полосами прокрутки.                               |
      | `left` или `screenX`       | `number`  | Горизонтальная позиция окна от левого края экрана.                                             |
      | `top` или `screenY`        | `number`  | Вертикальная позиция окна от верхнего края экрана.                                              |
      | `noopener`                | `boolean` | Новое окно не получает доступ к исходному через `window.opener`.                                |
      | `noreferrer`              | `boolean` | Не отправлять заголовок Referer; неявно включает `noopener`.                                   |

      Подробнее — [документация](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures) по **windowFeatures**.
