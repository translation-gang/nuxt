---
title: 'clearNuxtState'
description: Удаляет кэшированное состояние useState.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
Этот метод полезен, если вы хотите аннулировать состояние `useState`.
::

## Тип

```ts
clearNuxtState (keys?: string | string[] | ((key: string) => boolean)): void
```

## Параметры

- `keys`: Ключ или массив ключей, используемых в [`useState`](/docs/api/composables/use-state) для удаления их кэшированного состояния. Если ключи не указаны, **все состояния** будут аннулированы.
