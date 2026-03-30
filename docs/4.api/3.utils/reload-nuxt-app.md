---
title: 'reloadNuxtApp'
description: reloadNuxtApp выполняет жёсткую перезагрузку страницы.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` жёстко перезагружает приложение: страница и зависимости запрашиваются с сервера заново.
::

По умолчанию сохраняется текущее `state` приложения (то, к чему относится `useState`).

::read-more{to="/docs/4.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
Экспериментальное восстановление состояния — опция `experimental.restoreState` в `nuxt.config`.
::

## Тип

```ts [Signature]
export function reloadNuxtApp (options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options` (необязательно)

**Тип**: `ReloadNuxtAppOptions`

Поля:

- `path` (необязательно)

  **Тип**: `string`

  **По умолчанию**: `window.location.pathname`

  Путь для перезагрузки (по умолчанию текущий). Если он отличается от адреса окна, произойдёт навигация и запись в истории браузера.

- `ttl` (необязательно)

  **Тип**: `number`

  **По умолчанию**: `10000`

  Интервал в миллисекундах, в течение которого последующие запросы перезагрузки игнорируются. Повторный вызов внутри этого окна не перезагрузит приложение, чтобы избежать циклов.

- `force` (необязательно)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  Обходит защиту от циклов: перезагрузка даже если недавно уже была в пределах TTL.

- `persistState` (необязательно)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  Сохранять ли текущее состояние Nuxt в sessionStorage (ключ `nuxt:reload:state`). Само по себе на перезагрузку не влияет, пока не включён `experimental.restoreState` или пока вы сами не восстановите состояние.
