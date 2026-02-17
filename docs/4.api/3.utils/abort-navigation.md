---
title: 'abortNavigation'
description: "Отмена навигации с возможностью выброса ошибки."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::warning
`abortNavigation` можно вызывать только внутри [маршрутного middleware](/docs/4.x/directory-structure/app/middleware).
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

В примере ниже `abortNavigation` в маршрутном middleware запрещает доступ неавторизованным пользователям:

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

### Ошибка строкой

Можно передать строку:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Недостаточно прав.')
  }
})
```

### Ошибка объектом Error

Можно передать объект [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error), например из блока `catch`:

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* код, который может выбросить ошибку */
  } catch (err) {
    return abortNavigation(err)
  }
})
```
