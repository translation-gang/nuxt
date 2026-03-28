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
This is an advanced composable, primarily designed for use within plugins, mostly used by Nuxt modules.
::

::note
`useHydration` is designed to **ensure state synchronization and restoration during SSR**. If you need to create a globally reactive state that is SSR-friendly in Nuxt, [`useState`](/docs/api/composables/use-state) is the recommended choice.
::

`useHydration` - это встроенный композабл, который предоставляет возможность задавать данные на стороне сервера при каждом новом HTTP-запросе и получать их на стороне клиента. Таким образом, `useHydration` позволяет вам полностью контролировать цикл гидратации.

The data returned from the `get` function on the server is stored in `nuxtApp.payload` under the unique key provided as the first parameter to `useHydration`. During hydration, this data is then retrieved on the client, preventing redundant computations or API calls.

## Usage

::code-group

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

```ts [With useHydration]
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

```ts [signature]
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => void
```

## Parameters

- `key`: A unique key that identifies the data in your Nuxt application.
- `get`: A function executed **only on the server** (called when SSR rendering is done) to set the initial value.
- `set`: A function executed **only on the client** (called when initial vue instance is created) to receive the data.
