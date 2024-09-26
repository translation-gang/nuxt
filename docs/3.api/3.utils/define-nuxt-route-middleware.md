---
title: "defineNuxtRouteMiddleware"
description: "Создайте middleware маршрута с помощью хелпера defineNuxtRouteMiddleware и присвойте ему имя."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

Маршрутные middleware хранятся в директории [`middleware/`](/docs/guide/directory-structure/middleware) вашего приложения Nuxt (если не [задано иное](/docs/api/nuxt-config#middleware)).

## Тип

```ts
defineNuxtRouteMiddleware(middleware: RouteMiddleware) => RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}
```

## Параметры

### `middleware`

- **тип**: `RouteMiddleware`

Функция, которая принимает два объекта нормализованного расположения маршрута Vue Router в качестве параметров: следующий маршрут `to` в качестве первого и текущий маршрут `from` в качестве второго.

Узнайте больше о доступных свойствах `RouteLocationNormalized` в **[документации Vue Router](https://router.vuejs.org/api/#RouteLocationNormalized)**.

## Примеры

### Показ страницы ошибки

Вы можете использовать middleware маршрутов для генерации ошибок и отображения полезных сообщений об ошибках:

```ts [middleware/error.ts]
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
  }
})
```

Этот middleware маршрута перенаправит пользователя на пользовательскую страницу ошибки, определенную в файле `~/error.vue`, и предоставит сообщение об ошибке и код, переданные из middleware.

### Перенаправление

Используйте [`useState`](/docs/api/composables/use-state) в сочетании с хелпером `navigateTo` в middleware маршрута для перенаправления пользователей на разные маршруты в зависимости от их статуса авторизации:

```ts [middleware/auth.ts]
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

Обе функции [navigateTo](/docs/api/utils/navigate-to) и [abortNavigation](/docs/api/utils/abort-navigation) являются глобально доступными хелперами, которые вы можете использовать внутри `defineNuxtRouteMiddleware`.
