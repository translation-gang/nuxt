---
title: "useRequestHeader"
description: "Используйте useRequestHeader, чтобы получить доступ к определенному заголовку входящего запроса."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Вы можете использовать встроенный композабл [`useRequestHeader`](/docs/api/composables/use-request-header) для доступа к любому заголовку входящего запроса на ваших страницах, в компонентах и плагинах.

```ts
// Получите заголовок запроса авторизации
const authorization = useRequestHeader('authorization')
```

::tip
В браузере `useRequestHeader` вернет `undefined`.
::

## Пример

Мы можем использовать `useRequestHeader`, чтобы легко выяснить, авторизован ли пользователь или нет.

В примере ниже читается заголовок запроса `authorization`, чтобы узнать, может ли человек получить доступ к ограниченному ресурсу.

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
