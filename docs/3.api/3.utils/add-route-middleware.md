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

Именованный middleware маршрута определяется путем передачи строки в качестве первого аргумента и функции в качестве второго:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Middleware маршрута с именем, добавленный в плагин Nuxt')
  })
})
```

При определении в плагине он переопределяет любой существующий middleware с таким же именем, находящийся в директории `middleware/`.

### Глобальный Middleware маршрута

Глобальный middleware маршрута может быть определен двумя способами:

- Передача функции напрямую в качестве первого аргумента без имени. Она автоматически будет рассматриваться как глобальный middleware и применяться при каждом изменении маршрута.

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
