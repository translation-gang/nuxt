---
title: "useRequestHeader"
description: "Доступ к отдельному заголовку входящего запроса через композабл useRequestHeader."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Композабл `useRequestHeader` позволяет прочитать любой заголовок входящего запроса на страницах, в компонентах и плагинах.

```ts
// Заголовок Authorization
const authorization = useRequestHeader('authorization')
```

::tip
В браузере `useRequestHeader` возвращает `undefined`.
::

## Пример

С помощью `useRequestHeader` удобно проверить, передан ли токен авторизации.

Ниже читается заголовок `authorization`, чтобы решить, пускать ли пользователя к защищённому ресурсу.

```ts [middleware/authorized-only.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})
```
