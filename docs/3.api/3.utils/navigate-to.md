---
title: "navigateTo"
description: navigateTo - это вспомогательная функция, которая осуществляет программную навигацию пользователей.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
`navigateTo` доступен как на сервере, так и на клиенте (но не в маршрутах Nitro).
::

## Использование

Функция `navigateTo` доступна как на сервере, так и на клиенте. Ее можно использовать внутри [Nuxt-контекста](/docs/guide/going-further/nuxt-app#the-nuxt-context) или напрямую для осуществления постраничной навигации.

::tip
Чтобы отправить редирект с эндпоинта сервера, используйте вместо этого [`sendRedirect`](https://h3.unjs.io/utils/response#sendredirectevent-location-code).
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

:read-more{to="/docs/guide/directory-structure/middleware"}

### Внешний URL

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

### Использование open()

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
navigateTo(to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => Promise<void | NavigationFailure> | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}
```

::warning
Обязательно используйте `await` или `return` для результата `navigateTo` при его вызове.
::

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

- `replace` (опционально)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  По умолчанию `navigateTo` пробрасывает заданный маршрут в экземпляр Vue Router на стороне клиента.

  Это поведение можно изменить, установив `replace` в `true`, чтобы указать, что данный маршрут должен быть заменен.

- `redirectCode` (опционально)

  **Тип**: `number`

  **По умолчанию**: `302`

  `navigateTo` перенаправляет на указанный путь и устанавливает код перенаправления на [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) по умолчанию, когда перенаправление происходит на стороне сервера.

  Это поведение по умолчанию можно изменить, указав другой `redirectCode`. Обычно для постоянных перенаправлений используется [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301).

- `external` (опционально)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  Позволяет переходить на внешний URL, если установлено значение `true`. В противном случае `navigateTo` выдаст ошибку, так как внешняя навигация по умолчанию запрещена.

- `open` (опционально)

  **Тип**: `OpenOptions`

  Позволяет перейти к URL с помощью метода [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) окна. Этот параметр применим только на стороне клиента и будет игнорироваться на стороне сервера.

  Объект, принимающий следующие свойства:

  - `target`

    **Тип**: `string`

    **По умолчанию**: `'_blank'`

    Строка без пробелов, указывающая имя контекста просмотра, в который загружается ресурс.

  - `windowFeatures` (опционально)

    **Тип**: `OpenWindowFeatures`

    Объект, принимающий следующие свойства:

    - `popup` (опционально)

      **Тип**: `boolean`

    - `width` или `innerWidth` (опционально)

      **Тип**: `number`

    - `height` или `innerHeight` (опционально)

      **Тип**: `number`

    - `left` или `screenX` (опционально)

      **Тип**: `number`

    - `top` или `screenY` (опционально)

      **Тип**: `number`

    - `noopener` (опционально)

      **Тип**: `boolean`

    - `noreferrer` (опционально)

      **Тип**: `boolean`

    Более подробную информацию о свойствах **windowFeatures** см. в [документации](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).
