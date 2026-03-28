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
Middleware маршрутов - это защитники навигации, хранящиеся в директории [`middleware/`](/docs/3.x/directory-structure/middleware) вашего приложения Nuxt (за исключением случаев, когда [задано иное](/docs/3.x/api/nuxt-config#middleware)).
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

Узнайте больше о доступных свойствах [объектов маршрута](/docs/3.x/api/composables/use-route).

### `middleware`

- **Тип:** `RouteMiddleware`

Второй аргумент - это функция типа `RouteMiddleware`. Как и выше, она предоставляет объекты маршрута `to` и `from`. Он становится необязательным, если первый аргумент в `addRouteMiddleware()` уже передан в виде функции.

### `options`

- **Тип:** `AddRouteMiddlewareOptions`

Необязательный аргумент `options` позволяет задать значение `global` как `true`, чтобы указать, является ли middleware маршрута глобальным или нет (по умолчанию задано `false`).

## Примеры

### Именованный middleware маршрута

Именованный middleware задаётся строкой первым аргументом и функцией вторым:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Middleware маршрута с именем, добавленный в плагин Nuxt')
  })
})
```

Если middleware объявлен в плагине, он переопределяет одноимённый файл из каталога `middleware/`.

### Глобальный middleware маршрута

Глобальный middleware можно задать двумя способами:

- Передать функцию первым аргументом без имени — она считается глобальной и выполняется при каждой смене маршрута.

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('анонимный глобальный middleware при каждой смене маршрута')
    })
  })
  ```

Задайте необязательный третий аргумент `{ global: true }`, чтобы указать, является ли middleware маршрута глобальным:

  ```ts [plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
        console.log('именованный глобальный middleware при каждой смене маршрута')
      },
      { global: true }
    )
  })
  ```
