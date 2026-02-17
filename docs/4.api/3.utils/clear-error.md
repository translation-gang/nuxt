---
title: "clearError"
description: "Очистка всех обработанных ошибок."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

В страницах, компонентах и плагинах можно вызвать `clearError`, чтобы сбросить все ошибки и при необходимости перенаправить пользователя.

**Параметры:**

- `options?: { redirect?: string }` — необязательный путь для редиректа (например, на «безопасную» страницу).

```ts
// без редиректа
clearError()

// с редиректом
clearError({ redirect: '/homepage' })
```

Ошибки хранятся в состоянии через [`useError()`](/docs/4.x/api/composables/use-error). `clearError` сбрасывает это состояние и вызывает хук `app:error:cleared` с переданными опциями.

:read-more{to="/docs/4.x/getting-started/error-handling"}
