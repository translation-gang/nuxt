---
title: "useError"
description: useError композабл возвращает глобальную ошибку Nuxt, которая обрабатывается.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Композит возвращает глобальную ошибку Nuxt, которая обрабатывается, и она доступна как для клиента, так и для сервера.

```ts
const error = useError()
```

`useError` устанавливает ошибку в состояние и создает реактивную, а также SSR-дружественную глобальную ошибку Nuxt для всех компонентов.

Ошибки Nuxt обладают следующими свойствами:

```ts
interface {
  // Код состояния ответа HTTP
  statusCode: number
  // Сообщение о статусе ответа HTTP
  statusMessage: string
  // Сообщение об ошибке
  message: string
}
```

:read-more{to="/docs/getting-started/error-handling"}
