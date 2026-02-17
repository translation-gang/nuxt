---
title: 'reloadNuxtApp'
description: "Полная перезагрузка страницы."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` выполняет полную перезагрузку приложения: страница и зависимости запрашиваются с сервера заново.
::

По умолчанию сохраняется текущий `state` приложения (доступный через `useState`).

::read-more{to="/docs/4.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
Восстановление этого state при перезагрузке включается опцией `experimental.restoreState` в `nuxt.config`.
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

- `path` (необязательно): путь для перезагрузки (по умолчанию текущий). Если отличается от текущего — выполняется навигация и добавляется запись в историю.
  **Тип**: `string`,
    **по умолчанию**: `window.location.pathname`.

- `ttl` (необязательно): интервал в миллисекундах, в течение которого повторные вызовы перезагрузки игнорируются (защита от цикла перезагрузок).
  **Тип**: `number`,
  **по умолчанию**: `10000`.

- `force` (необязательно): при `true` перезагрузка выполняется даже внутри TTL.
  **Тип**: `boolean`,
  **по умолчанию**: `false`.

- `persistState` (необязательно): сохранять ли текущий state Nuxt в sessionStorage (ключ `nuxt:reload:state`). Без `experimental.restoreState` или своей логики восстановления эффекта не даёт.

  **Тип**: `boolean`,
  **по умолчанию**: `false`.
