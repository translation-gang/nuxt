---
title: "defineNuxtRouteMiddleware"
description: "Именованный route middleware через хелпер defineNuxtRouteMiddleware."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

Route middleware хранятся в [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) приложения Nuxt (если не [задано иное](/docs/4.x/api/nuxt-config#middleware)).

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

Функция с двумя аргументами — объектами расположения маршрута Vue Router: следующий маршрут `to` и текущий `from`.

Подробнее о свойствах `RouteLocationNormalized` см. в **[документации Vue Router](https://router.vuejs.org/api/type-aliases/routelocationnormalized)**.

## Примеры

### Страница ошибки

В route middleware можно выбрасывать ошибки и показывать понятные сообщения:

```ts [app/middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }
})
```

Пользователь попадёт на кастомную страницу ошибки из `~/error.vue` с кодом и текстом из middleware.

### Редирект

Сочетайте [`useState`](/docs/4.x/api/composables/use-state) с хелпером `navigateTo` внутри middleware, чтобы перенаправлять в зависимости от авторизации:

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
