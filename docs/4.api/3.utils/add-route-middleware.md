---
title: 'addRouteMiddleware'
description: 'addRouteMiddleware() — хелпер для динамического добавления middleware в приложение.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Route middleware — это навигационные хранители, лежащие в каталоге [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) приложения Nuxt (если не [задано иное](/docs/4.x/api/nuxt-config#middleware)).
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

Может быть строкой или функцией типа `RouteMiddleware`. Функция принимает следующий маршрут `to` первым аргументом и текущий `from` вторым — оба это объекты маршрута Vue.

Подробнее о свойствах [объектов маршрута](/docs/4.x/api/composables/use-route).

### `middleware`

- **Тип:** `RouteMiddleware`

Второй аргумент — функция типа `RouteMiddleware`. Как и выше, ей передаются объекты маршрута `to` и `from`. Он необязателен, если первый аргумент `addRouteMiddleware()` уже передан как функция.

### `options`

- **Тип:** `AddRouteMiddlewareOptions`

Необязательный аргумент `options` позволяет задать `global: true`, чтобы указать, глобален ли middleware маршрутизатора (по умолчанию `false`).

## Примеры

### Именованный route middleware

Именованный middleware задаётся строкой первым аргументом и функцией вторым:

```ts [app/plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('named middleware added in Nuxt plugin')
  })
})
```

Если это определено в плагине, оно переопределяет существующий middleware с тем же именем в каталоге `app/middleware/`.

### Глобальный route middleware

Глобальный middleware можно задать двумя способами:

- Передать функцию сразу первым аргументом без имени. Она будет считаться глобальным middleware и выполняться при каждой смене маршрута.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('anonymous global middleware that runs on every route change')
    })
  })
  ```

- Указать необязательный третий аргумент `{ global: true }`, чтобы пометить middleware как глобальный.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
      console.log('global middleware that runs on every route change')
    },
    { global: true },
    )
  })
  ```
