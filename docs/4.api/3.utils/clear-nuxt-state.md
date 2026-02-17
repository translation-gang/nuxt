---
title: 'clearNuxtState'
description: "Очистка закэшированного состояния useState."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
Удобно для инвалидации состояния, созданного через `useState`.
::

## Тип

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

- `keys`: один ключ, массив ключей или функция `(key: string) => boolean` — ключи из [`useState`](/docs/4.x/api/composables/use-state), кэш которых удалить. Без аргумента инвалидируется **весь** state.
