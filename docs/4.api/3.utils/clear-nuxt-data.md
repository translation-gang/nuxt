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
Удобно, когда нужно инвалидировать данные загрузки для другой страницы.
::

## Тип

```ts [Signature]
export function clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

* `keys`: один ключ, массив ключей или функция `(key: string) => boolean` — ключи из [`useAsyncData`](/docs/4.x/api/composables/use-async-data) / useFetch, кэш которых нужно удалить. Если не передать — инвалидируются **все** данные.
