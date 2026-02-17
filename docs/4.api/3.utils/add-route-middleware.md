---
title: 'addRouteMiddleware'
description: "Динамическое добавление middleware в приложение."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
Маршрутные middleware — это навигационные охранники из папки [`app/middleware/`](/docs/4.x/directory-structure/app/middleware) (если не [переопределено](/docs/4.x/api/nuxt-config#middleware)).
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

Строка (имя) или функция типа `RouteMiddleware`. Функция получает целевой маршрут `to` и текущий `from` (объекты маршрута Vue).

Подробнее: [свойства объекта маршрута](/docs/4.x/api/composables/use-route).

### `middleware`

- **Тип:** `RouteMiddleware`

Второй аргумент — функция типа `RouteMiddleware` с `to` и `from`. Необязателен, если первым передан уже функция.

### `options`

- **Тип:** `AddRouteMiddlewareOptions`

Необязательный объект. `global: true` — middleware глобальный (применяется при каждой смене маршрута). По умолчанию `false`.

## Примеры

### Именованный middleware

Имя — строка первым аргументом, функция — вторым:

```ts [app/plugins/my-plugin.ts]
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('именованный middleware из плагина')
  })
})
```

При определении в плагине переопределяет одноимённый middleware из `app/middleware/`.

### Глобальный middleware

Два варианта:

- Передать только функцию первым аргументом (без имени) — она считается глобальной и выполняется при каждой смене маршрута.

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware((to, from) => {
      console.log('анонимный глобальный middleware при каждой смене маршрута')
    })
  })
  ```

- Третий аргумент `{ global: true }` для именованного middleware:

  ```ts [app/plugins/my-plugin.ts]
  export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', (to, from) => {
      console.log('глобальный middleware при каждой смене маршрута')
    },
    { global: true },
    )
  })
  ```
