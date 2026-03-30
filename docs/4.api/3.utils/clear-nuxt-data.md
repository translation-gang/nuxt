---
title: 'clearNuxtData'
description: Удаляет кэшированные данные, статус ошибки и отложенные промисы useAsyncData и useFetch.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
Метод полезен, если нужно инвалидировать загрузку данных для другой страницы.
::

## Тип

```ts [Signature]
export function clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

* `keys`: Одна строка или массив ключей из [`useAsyncData`](/docs/4.x/api/composables/use-async-data), по которым удаляется кэш. Если ключи не указаны, инвалидируются **все данные**.
