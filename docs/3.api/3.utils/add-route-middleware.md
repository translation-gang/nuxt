---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() является вспомогательной функцией для динамического добавления middleware в ваше приложение.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Middleware маршрутов - это защитники навигации, хранящиеся в директории [`middleware/`](/docs/guide/directory-structure/middleware) вашего приложения Nuxt (за исключением случаев, когда [задано иное](/docs/api/nuxt-config#middleware)).
::

## Тип

```ts
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}
```

## Параметры

### `name`

- **Тип:** `string` | `RouteMiddleware`

Middleware маршрута может быть либо строкой, либо функцией типа `RouteMiddleware`. Функция принимает следующий маршрут `to` в качестве первого аргумента и текущий маршрут `from` в качестве второго аргумента, оба из которых являются объектами маршрута Vue.

Узнайте больше о доступных свойствах [объектов маршрута](/docs/api/composables/use-route).

### `middleware`

- **Тип:** `RouteMiddleware`

Второй аргумент - это функция типа `RouteMiddleware`. Как и выше, она предоставляет объекты маршрута `to` и `from`. Он становится необязательным, если первый аргумент в `addRouteMiddleware()` уже передан в виде функции.

### `options`

- **Тип:** `AddRouteMiddlewareOptions`

Необязательный аргумент `options` позволяет задать значение `global` как `true`, чтобы указать, является ли middleware маршрута глобальным или нет (по умолчанию задано `false`).

## Примеры

### Middleware маршрута с именем

Named route middleware is defined by providing a string as the first argument and a function as the second:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Middleware маршрута с именем, добавленный в плагин Nuxt')
  })
})
```

When defined in a plugin, it overrides any existing middleware of the same name located in the `middleware/` directory.

### Глобальный Middleware маршрута

Global route middleware can be defined in two ways:

- Pass a function directly as the first argument without a name. It will automatically be treated as global middleware and applied on every route change.

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('anonymous global middleware that runs on every route change')
    })
  })
  ```

- Задайте необязательный третий аргумент `{ global: true }`, чтобы указать, является ли middleware маршрута глобальным:

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('Глобальный middleware, который выполняется при каждом изменении маршрута')
      },
      { global: true }
    )
  })
  ```
