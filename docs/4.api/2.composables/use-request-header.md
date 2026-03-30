---
title: "useRequestHeader"
description: "useRequestHeader читает один входящий заголовок запроса."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Встроенный [`useRequestHeader`](/docs/4.x/api/composables/use-request-header) читает любой заголовок входящего запроса на страницах, в компонентах и плагинах.

```ts
// Заголовок authorization
const authorization = useRequestHeader('authorization')
```

::tip
В браузере `useRequestHeader` возвращает `undefined`.
::

## Пример

Проверка авторизации по заголовку `authorization`:

```ts [app/middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
