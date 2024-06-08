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
addRouteMiddleware (name: string | RouteMiddleware, middleware?: RouteMiddleware, options: AddRouteMiddlewareOptions = {})
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

- **Type:** `AddRouteMiddlewareOptions`

Необязательный аргумент `options` позволяет задать значение `global` как `true`, чтобы указать, является ли middleware маршрута глобальным или нет (по умолчанию задано `false`).

## Примеры

### Анонимные Middleware маршрута

Анонимные Middleware маршрута не имеют имени. Они принимают функцию в качестве первого аргумента, что делает второй аргумент middleware избыточным:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    if (to.path === '/forbidden') {
      return false
    }
  })
})
```

### Middleware маршрута с именем

Middleware маршрута с именем принимает строку в качестве первого аргумента и функцию в качестве второго.

Когда он определен в плагине, он переопределяет любой существующий middleware с тем же именем, расположенный в директории `middleware/`:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('Middleware маршрута с именем, добавленный в плагин Nuxt')
  })
})
```

### Глобальный Middleware маршрута

Задайте необязательный третий аргумент `{ global: true }`, чтобы указать, является ли middleware маршрута глобальным:

```ts [plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-middleware', (to, from) => {
      console.log('Глобальный middleware, который выполняется при каждом изменении маршрута')
    },
    { global: true }
  )
})
```
