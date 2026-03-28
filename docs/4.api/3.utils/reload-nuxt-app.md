---
title: 'reloadNuxtApp'
description: reloadNuxtApp выполнит жесткую перезагрузку страницы.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/chunk.ts
    size: xs
---

::note
`reloadNuxtApp` выполнит жесткую перезагрузку вашего приложения, повторно запрашивая страницу и ее зависимости у сервера.
::

По умолчанию функция также сохраняет текущий `state` приложения (в том числе состояние из `useState`).

::read-more{to="/docs/3.x/guide/going-further/experimental-features#restorestate" icon="i-lucide-star"}
Вы можете включить экспериментальное восстановление этого состояния, включив опцию `experimental.restoreState` в файле `nuxt.config`.
::

## Тип

```ts
reloadNuxtApp(options?: ReloadNuxtAppOptions)

interface ReloadNuxtAppOptions {
  ttl?: number
  force?: boolean
  path?: string
  persistState?: boolean
}
```

### `options` (опционально)

**Тип**: `ReloadNuxtAppOptions`

Объект, принимающий следующие свойства:

- `path` (опционально)

  **Тип**: `string`

  **По умолчанию**: `window.location.pathname`

  Путь для перезагрузки (по умолчанию - текущий путь). Если он отличается от текущего местоположения окна (window.location), это вызовет навигацию и добавит запись в историю браузера.

- `ttl` (опционально)

  **Тип**: `number`

  **По умолчанию**: `10000`

  Количество миллисекунд, в течение которых следует игнорировать последующие запросы на перезагрузку. При повторном вызове в течение этого периода времени,
  `reloadNuxtApp` не будет перезагружать ваше приложение, чтобы избежать циклов перезагрузки.

- `force` (опционально)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  Эта опция позволяет полностью обойти защиту от циклов перезагрузки и принудительно перезагрузить приложение, даже если перезагрузка уже была в пределах заданного TTL.

- `persistState` (опционально)

  **Тип**: `boolean`

  **По умолчанию**: `false`

  Нужно ли сбрасывать текущее состояние Nuxt в sessionStorage (как `nuxt:reload:state`). По умолчанию это не будет иметь никакого эффекта на перезагрузку, если только `experimental.restoreState` также не установлен, или если вы сами не занимаетесь восстановлением состояния.
