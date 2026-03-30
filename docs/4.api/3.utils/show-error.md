---
title: 'showError'
description: В Nuxt можно быстро показать полноэкранную страницу ошибки.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

В [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) можно вызвать `showError`, чтобы показать ошибку.

**Параметры:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, status, statusText }>`

```ts
showError('😱 Oh no, an error has been thrown.')
showError({
  status: 404,
  statusText: 'Page Not Found',
})
```

Ошибка записывается в состояние через [`useError()`](/docs/4.x/api/composables/use-error) — реактивное общее состояние ошибки, совместимое с SSR.

::tip
`showError` вызывает хук `app:error`.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
