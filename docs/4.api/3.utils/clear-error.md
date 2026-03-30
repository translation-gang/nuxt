---
title: "clearError"
description: "Composable clearError сбрасывает все обработанные ошибки."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

На страницах, в компонентах и плагинах можно вызывать `clearError`, чтобы сбросить ошибки и перенаправить пользователя.

**Параметры:**

- `options?: { redirect?: string }`

Необязательно можно передать путь для редиректа (например, на «безопасную» страницу).

```ts
// Without redirect
clearError()

// With redirect
clearError({ redirect: '/homepage' })
```

Ошибки попадают в состояние через [`useError()`](/docs/4.x/api/composables/use-error). Composable `clearError` сбрасывает это состояние и вызывает хук `app:error:cleared` с переданными опциями.

:read-more{to="/docs/4.x/getting-started/error-handling"}
