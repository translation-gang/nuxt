---
title: "useError"
description: useError композабл возвращает глобальную ошибку Nuxt, которая может быть обработана.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

Композабл возвращает глобальную ошибку Nuxt, которая может быть обработана, и она доступна как для клиента, так и для сервера.

```ts
const error = useError()
```

`useError` устанавливает состояние ошибке и создает реактивную, SSR-дружественную глобальную ошибку Nuxt для всех компонентов.

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
