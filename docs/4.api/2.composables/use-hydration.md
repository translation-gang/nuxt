---
title: 'useHydration'
description: 'Позволяет полностью контролировать цикл гидратации, задавать и получать данные с сервера.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/hydrate.ts
    size: xs
---

::note
Продвинутый композабл: в основном для плагинов, чаще всего используется в модулях Nuxt.
::

::note
`useHydration` нужен, чтобы **синхронизировать и восстанавливать состояние при SSR**. Если нужен глобальный реактивный SSR-совместимый стейт в Nuxt, лучше [`useState`](/docs/3.x/api/composables/use-state).
::

`useHydration` — это встроенный композабл, который предоставляет возможность задавать данные на стороне сервера при каждом новом HTTP-запросе и получать их на стороне клиента. Таким образом, `useHydration` позволяет вам полностью контролировать цикл гидратации.

Данные, которые вернула функция `get` на сервере, попадают в `nuxtApp.payload` под уникальным ключом — первым аргументом `useHydration`. При гидратации они читаются на клиенте, без лишних вычислений и запросов.

## Использование

::code-group

```ts [Без useHydration]
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

```ts [С useHydration]
export default defineNuxtPlugin((nuxtApp) => {
  const myStore = new MyStore()

  useHydration(
    'myStoreState', 
    () => myStore.getState(), 
    (data) => myStore.setState(data)
  )
})
```
::

## Тип

```ts [Сигнатура]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## Параметры

- `key`: уникальный ключ, идентифицирующий данные в приложении Nuxt.
- `get`: функция, выполняемая **только на сервере** (после завершения SSR), задаёт начальное значение.
- `set`: функция, выполняемая **только на клиенте** (при создании начального экземпляра Vue), получает переданные данные.
