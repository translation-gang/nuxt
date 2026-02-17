---
title: 'showError'
description: "Показ полноэкранной страницы ошибки."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

В [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) `showError` показывает полноэкранную страницу ошибки.

**Параметры:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, status, statusText }>`

```ts
showError('😱 Произошла ошибка.')
showError({
  status: 404,
  statusText: 'Page Not Found',
})
```

Ошибка записывается в состояние через [`useError()`](/docs/4.x/api/composables/use-error) — общее реактивное состояние для SSR и компонентов.

::tip
`showError` вызывает хук `app:error`.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
