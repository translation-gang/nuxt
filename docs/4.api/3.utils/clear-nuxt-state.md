---
title: 'clearNuxtState'
description: Удаляет кэшированное состояние useState.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

::note
Метод полезен, если нужно инвалидировать состояние `useState`. Состояние можно сбросить к начальному значению, передав вторым параметром `{ reset: true }`.
::

## Тип

```ts [Signature]
export function clearNuxtState (keys?: string | string[] | ((key: string) => boolean), opts?: ClearNuxtStateOptions): void
```

## Параметры

- `keys`: Одна строка или массив ключей из [`useState`](/docs/4.x/api/composables/use-state), по которым удаляется кэш. Если ключи не указаны, инвалидируется **всё состояние**.
- `opts`: Объект опций поведения очистки.
  - `reset`: при `true` сбрасывает состояние к начальному значению из функции `init` в [`useState`](/docs/4.x/api/composables/use-state), а не к `undefined`. Если не задано, используется значение `experimental.defaults.useState.resetOnClear` в конфиге Nuxt (при `compatibilityVersion: 5` по умолчанию `true`).
