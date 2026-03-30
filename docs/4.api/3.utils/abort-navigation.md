---
title: 'abortNavigation'
description: 'abortNavigation — хелпер, который отменяет навигацию и при необходимости выбрасывает ошибку, переданную параметром.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` можно использовать только внутри [обработчика route middleware](/docs/4.x/directory-structure/app/middleware).
::

## Тип

```ts [Signature]
export function abortNavigation (err?: Error | string): false
```

## Параметры

### `err`

- **Тип**: [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  Необязательная ошибка, которую выбросит `abortNavigation`.

## Примеры

Ниже показано, как использовать `abortNavigation` в route middleware, чтобы запретить доступ к маршруту без авторизации:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation()
  }

  if (to.path !== '/edit-post') {
    return navigateTo('/edit-post')
  }
})
```

### `err` в виде строки

Ошибку можно передать строкой:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})
```

### `err` как объект Error

Ошибку можно передать как объект [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error), например пойманный в блоке `catch`:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* code that might throw an error */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
