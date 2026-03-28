---
title: 'clearNuxtData'
description: Удаляет кэшированные данные, статус ошибки и ожидающиеся промисы useAsyncData и useFetch.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
Этот метод полезен, если вы хотите аннулировать получение данных для другой страницы.
::

## Тип

```ts
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

* `keys`: Ключ или массив ключей, которые используются в [`useAsyncData`](/docs/api/composables/use-async-data) для удаления их кэшированных данных. Если ключи не указаны, **все данные** будут аннулированы.
