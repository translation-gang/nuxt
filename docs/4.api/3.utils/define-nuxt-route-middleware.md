---
title: "defineNuxtRouteMiddleware"
description: "Создание именованного route middleware."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

Маршрутные middleware хранятся в [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) (если путь не [переопределён](/docs/4.x/api/nuxt-config#middleware)).

## Тип

```ts [Signature]
export function defineNuxtRouteMiddleware (middleware: RouteMiddleware): RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## Параметры

### `middleware`

- **Тип**: `RouteMiddleware`

Функция с двумя аргументами — объектами локации Vue Router: целевой маршрут `to` и текущий `from`.

Свойства `RouteLocationNormalized`: [документация Vue Router](https://router.vuejs.org/api/type-aliases/routelocationnormalized).

## Примеры

### Показ страницы ошибки

В middleware можно выбрасывать ошибку и показывать страницу ошибки:

```ts [app/middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }
})
```

Пользователь будет перенаправлен на кастомную страницу ошибки из `~/error.vue` с сообщением и кодом из middleware.

### Редирект

В middleware можно использовать [`useState`](/docs/4.x/api/composables/use-state) и хелпер `navigateTo` для редиректа в зависимости от авторизации:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path !== '/dashboard') {
    return navigateTo('/dashboard')
  }
})
```

[navigateTo](/docs/4.x/api/utils/navigate-to) и [abortNavigation](/docs/4.x/api/utils/abort-navigation) доступны глобально внутри `defineNuxtRouteMiddleware`.
