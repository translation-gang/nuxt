---
title: "navigateTo"
description: navigateTo - это вспомогательная функция, которая осуществляет программную навигацию пользователей.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Использование

Функция `navigateTo` доступна как на сервере, так и на клиенте. Ее можно использовать внутри [Nuxt-контекста](/docs/guide/going-further/nuxt-app#the-nuxt-context) или напрямую для осуществления постраничной навигации.

::warning
Make sure to always use `await` or `return` on result of `navigateTo` when calling it.
::

::note
`navigateTo` cannot be used within Nitro routes. To perform a server-side redirect in Nitro routes, use [`sendRedirect`](https://h3.dev/utils/response#sendredirectevent-location-code) instead.
::

### Внутри компонента Vue

```vue
<script setup lang="ts">
// передаем 'to' в виде строки
await navigateTo('/search')

// ... или в виде объекта маршрута
await navigateTo({ path: '/search' })

// ... или как объект маршрута с параметрами запроса
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### Внутри Route Middleware

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // установка кода редиректа на '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

When using `navigateTo` within route middleware, you must **return its result** to ensure the middleware execution flow works correctly.

For example, the following implementation **will not work as expected**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ This will not work as expected
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

In this case, `navigateTo` will be executed but not returned, which may lead to unexpected behavior.

:read-more{to="/docs/guide/directory-structure/middleware"}

### Navigating to an External URL

Параметр `external` в `navigateTo` влияет на то, как будет осуществляться переход по URL:

- **Без параметра `external: true`**:
  - Внутренние URL переходят, как и ожидалось.
  - Внешние URL-адреса выдают ошибку.

- **С `external: true`**:
  - Внутренние URL переходят с полной перезагрузкой страницы.
  - Внешние URL переходят, как и ожидалось.

#### Пример

```vue
<script setup lang="ts">
// выкинет ошибку;
// переход на внешний URL по умолчанию запрещен
await navigateTo('https://nuxt.com')

// произойдет успешная переадресация с параметром 'external', установленным в значение 'true'
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### Opening a Page in a New Tab

```vue
<script setup lang="ts">
// откроет 'https://nuxt.com' в новой вкладке
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})
</script>
```

## Тип

```ts
function navigateTo(
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions
) => Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw 

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

**Тип**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**По умолчанию**: `'/'`

`to` может быть простой строкой или объектом маршрута, на который нужно перенаправить. Если передать `undefined` или `null`, то по умолчанию будет указано `'/'`.

#### Example

```ts
// Passing the URL directly will redirect to the '/blog' page
await navigateTo('/blog')

// Using the route object, will redirect to the route with the name 'blog'
await navigateTo({ name: 'blog' })

// Redirects to the 'product' route while passing a parameter (id = 1) using the route object.
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (опционально)

**Тип**: `NavigateToOptions`

Объект, принимающий следующие свойства:

- `replace`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`
  - По умолчанию `navigateTo` пробрасывает заданный маршрут в экземпляр Vue Router на стороне клиента.

    Это поведение можно изменить, установив `replace` в `true`, чтобы указать, что данный маршрут должен быть заменен.

- `redirectCode`

  - **Тип**: `number`
  - **По умолчанию**: `302`

  - `navigateTo` перенаправляет на указанный путь и устанавливает код перенаправления на [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) по умолчанию, когда перенаправление происходит на стороне сервера.

  Это поведение по умолчанию можно изменить, указав другой `redirectCode`. Обычно для постоянных перенаправлений используется [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301).

- `external`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`

  - Позволяет переходить на внешний URL, если установлено значение `true`. В противном случае `navigateTo` выдаст ошибку, так как внешняя навигация по умолчанию запрещена.

- `open`

  - **Тип**: `OpenOptions`
  - Позволяет перейти к URL с помощью метода [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) окна. Этот параметр применим только на стороне клиента и будет игнорироваться на стороне сервера.

  Объект, принимающий следующие свойства:

  - `target`

    - **Тип**: `string`
    - **По умолчанию**: `'_blank'`

    - A string, without whitespace, specifying the name of the browsing context the resource is being loaded into.

  - `windowFeatures`

    - **Тип**: `OpenWindowFeatures`

    - An object accepting the following properties:

      | Property | Type    | Description |
      |----------|---------|--------------|
      | `popup`  | `boolean` | Requests a minimal popup window instead of a new tab, with UI features decided by the browser. |
      | `width` or `innerWidth`  | `number`  | Specifies the content area's width (minimum 100 pixels), including scrollbars. |
      | `height` or `innerHeight` | `number`  | Specifies the content area's height (minimum 100 pixels), including scrollbars. |
      | `left` or `screenX`   | `number`  | Sets the horizontal position of the new window relative to the left edge of the screen. |
      | `top` or `screenY`   | `number`  | Sets the vertical position of the new window relative to the top edge of the screen. |
      | `noopener` | `boolean` | Prevents the new window from accessing the originating window via `window.opener`. |
      | `noreferrer` | `boolean` | Prevents the Referer header from being sent and implicitly enables `noopener`. |

      Refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures) for more detailed information on the **windowFeatures** properties.
