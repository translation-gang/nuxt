---
title: 'clearNuxtData'
description: "Очистка кэша, статуса ошибки и ожидающих промисов useAsyncData и useFetch."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
This method is useful if you want to invalidate the data fetching for another page.
::

## Тип

```ts [Signature]
export function clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

* `keys`: One or an array of keys that are used in [`useAsyncData`](/docs/4.x/api/composables/use-async-data) to delete their cached data. If no keys are provided, **all data** will be invalidated.
