---
title: 'setResponseStatus'
description: setResponseStatus устанавливает statusCode (и, опционально, statusMessage) ответа.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

Nuxt предоставляет композаблы и утилиты для первоклассной поддержки серверного рендеринга.

`setResponseStatus` задает statusCode (и необязательно statusMessage) ответа.

::important
`setResponseStatus` может быть вызван только в [Nuxt-контексте](/docs/guide/going-further/nuxt-app#the-nuxt-context).
::

```js
const event = useRequestEvent()

// event будет undefined в браузере
if (event) {
  // Установите статус код 404 для пользовательской страницы 404
  setResponseStatus(event, 404)

  // Установите также статусное сообщение
  setResponseStatus(event, 404, 'Страница не найдена')
}
```

::note
В браузере `setResponseStatus` не будет иметь никакого эффекта.
::

:read-more{to="/docs/getting-started/error-handling"}
