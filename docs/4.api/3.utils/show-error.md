---
title: 'showError'
description: Nuxt предоставляет быстрый и простой способ показать страницу ошибки на весь экран, если это необходимо.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

В рамках [Nuxt-контекста](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) вы можете использовать `showError`, чтобы показать ошибку.

**Параметры:**

- `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```ts
showError("😱 О нет, произошла ошибка.")
showError({
  statusCode: 404,
  statusMessage: "Страница не найдена"
})
```

Ошибка устанавливается в состоянии с помощью [`useError()`](/docs/3.x/api/composables/use-error) для создания реактивного и подходящего для SSR общего состояния ошибки между компонентами.

::tip
`showError` вызывает хук `app:error`.
::

:read-more{to="/docs/3.x/getting-started/error-handling"}
