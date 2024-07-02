---
title: "clearError"
description: "Композабл API clearError очищает все обработанные ошибки."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

В ваших страницах, компонентах и плагинах вы можете использовать `clearError`, чтобы очистить все ошибки и перенаправить пользователя.

**Параметры:**

- `options?: { redirect?: string }`

Вы можете предоставить опциональный путь для перенаправления (например, если вы хотите перейти на "безопасную" страницу).

```js
// Без перенаправления
clearError()

// С перенаправлением
clearError({ redirect: '/homepage' })
```

Ошибки устанавливаются в состоянии с помощью [`useError()`](/docs/api/composables/use-error). Композабл `clearError` сбросит это состояние и вызовет хук `app:error:cleared` с предоставленными параметрами.

:read-more{to="/docs/getting-started/error-handling"}
