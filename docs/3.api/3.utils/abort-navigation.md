---
title: 'abortNavigation'
description: 'abortNavigation это хелпер функция, которая предотвращает навигацию и выбрасывает ошибку, если она задана в качестве параметра.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` можно использовать только внутри [обработчика middleware маршрута](/docs/guide/directory-structure/middleware).
::

## Тип

```ts
abortNavigation(err?: Error | string): false
```

## Параметры

### `err`

- **тип**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`

  Опциональная ошибка, которая будет выброшена при вызове `abortNavigation`.

## Примеры

В примере ниже показано, как можно использовать `abortNavigation` в middleware маршрута для предотвращения несанкционированного доступа к маршруту:

```ts [middleware/auth.ts]
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

### `err` в виде String

Вы можете передать ошибку в виде строки:

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Недостаточно прав.')
  }
})
```

### `err` в виде Error Object

Вы можете передать ошибку в виде объекта [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error), например, пойманную блоком `catch`:

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* код, который может вызвать ошибку */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
