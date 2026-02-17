---
title: 'useHydration'
description: 'Полный контроль над циклом гидратации для передачи и получения данных с сервера.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` — встроенный композабл для передачи данных с сервера при каждом новом HTTP-запросе и получения их на клиенте. Даёт полный контроль над циклом гидратации.

::note
Продвинутый композабл, в основном для плагинов и модулей Nuxt.
::

::note
`useHydration` нужен для **синхронизации и восстановления состояния при SSR**. Для глобального реактивного состояния, совместимого с SSR, рекомендуют [`useState`](/docs/4.x/api/composables/use-state).
::

## Использование

Данные, возвращаемые функцией `get` на сервере, сохраняются в `nuxtApp.payload` под ключом (первый аргумент `useHydration`). При гидрации они читаются на клиенте, без повторных вычислений или запросов.

::code-group

```ts [With useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState',
    () => myStore.getState(),
    data => myStore.setState(data),
  )
})
```

```ts [Without useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      nuxtApp.payload.myStoreState = myStore.getState()
    })
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      myStore.setState(nuxtApp.payload.myStoreState)
    })
  }
})
```
::

## Тип

```ts [Signature]
export function useHydration<T> (key: string, get: () => T, set: (value: T) => void): void
```

## Параметры

| Parameter | Тип | Описание |
| --- | --- | --- |
| `key` | `string` | Уникальный ключ данных в приложении Nuxt. |
| `get` | `() => T` | Функция, вызываемая **только на сервере** (после завершения SSR) — задаёт начальное значение. |
| `set` | `(value: T) => void` | Функция, вызываемая **только на клиенте** (при создании экземпляра Vue) — получает данные. |

## Возвращаемые значения

Композабл ничего не возвращает.
