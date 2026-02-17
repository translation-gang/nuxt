---
title: "useRequestHeader"
description: "Доступ к указанному заголовку входящего запроса."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Встроенный композабл [`useRequestHeader`](/docs/4.x/api/composables/use-request-header) даёт доступ к любому заголовку входящего запроса в страницах, компонентах и плагинах.

```ts
// Получить заголовок authorization
const authorization = useRequestHeader('authorization')
```

::tip
В браузере `useRequestHeader` возвращает `undefined`.
::

## Пример

С помощью `useRequestHeader` можно проверить, авторизован ли пользователь.

В примере ниже читается заголовок `authorization`, чтобы определить доступ к защищённому ресурсу.

```ts [app/middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
