---
title: 'useHydration'
description: 'Полный контроль над циклом гидратации: передача данных с сервера на клиент.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` — встроенный композабл: на сервере при каждом HTTP-запросе можно задать данные, а на клиенте — получить их, полностью контролируя гидратацию.

::note
Продвинутый композабл: в основном для плагинов и модулей Nuxt.
::

::note
`useHydration` нужен для **синхронизации и восстановления состояния при SSR**. Для глобального реактивного SSR-состояния лучше [`useState`](/docs/3.x/api/composables/use-state).
::

## Использование

Данные, которые вернула функция `get` на сервере, сохраняются в `nuxtApp.payload` под уникальным ключом (первый аргумент `useHydration`). При гидратации они читаются на клиенте без лишних вычислений и запросов.

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

| Параметр | Тип | Описание |
| --- | --- | --- |
| `key` | `string` | Уникальный ключ данных в приложении Nuxt. |
| `get` | `() => T` | Выполняется **только на сервере** (после SSR) и задаёт начальное значение. |
| `set` | `(value: T) => void` | Выполняется **только на клиенте** (при создании корневого экземпляра Vue) и принимает переданные данные. |

## Возвращаемые значения

Композабл ничего не возвращает.
