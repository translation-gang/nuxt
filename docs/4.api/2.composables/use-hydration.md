---
title: 'useHydration'
description: 'Полный контроль цикла гидратации: установка данных на сервере и получение на клиенте.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

`useHydration` задаёт данные на сервере при каждом HTTP-запросе и восстанавливает их на клиенте — полный контроль над гидратацией.

::note
Продвинутый композабл, в основном для плагинов и модулей Nuxt.
::

::note
`useHydration` нужен для **синхронизации и восстановления состояния при SSR**. Для глобального реактивного SSR-friendly состояния лучше [`useState`](/docs/4.x/api/composables/use-state).
::

## Использование

Результат `get` на сервере попадает в `nuxtApp.payload` под уникальным ключом. При гидратации клиент читает эти данные и не дублирует вычисления или запросы.

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

| Parameter | Type | Description |
| --- | --- | --- |
| `key` | `string` | Уникальный ключ данных в приложении. |
| `get` | `() => T` | Вызывается **только на сервере** (после SSR) для начального значения. |
| `set` | `(value: T) => void` | Вызывается **только на клиенте** (при создании Vue) для приёма данных. |

## Возвращаемые значения

Композабл ничего не возвращает.
