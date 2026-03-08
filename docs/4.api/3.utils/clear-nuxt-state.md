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
Удобно для инвалидации состояния, созданного через `useState`. Сбросить состояние к начальному значению можно, передав вторым аргументом `{ reset: true }`.
::

## Тип

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean), opts?: ClearNuxtStateOptions): void
```

## Параметры

- `keys`: один ключ, массив ключей или функция `(key: string) => boolean` — ключи из [`useState`](/docs/4.x/api/composables/use-state), кэш которых удалить. Без аргумента инвалидируется **весь** state.
- `opts`: объект опций. `reset`: при `true` состояние сбрасывается к начальному значению (функция `init` в [`useState`](/docs/4.x/api/composables/use-state)), а не в `undefined`. По умолчанию берётся из `experimental.defaults.useState.resetOnClear` в nuxt.config (при `compatibilityVersion: 5` — `true`).
