---
title: 'setResponseStatus'
description: setResponseStatus задаёт код статуса ответа (и при необходимости statusText).
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

В Nuxt есть composables и утилиты для полноценного SSR.

`setResponseStatus` задаёт HTTP-статус (и опционально `statusText`) ответа.

::important
`setResponseStatus` можно вызывать только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts
const event = useRequestEvent()

// event will be undefined in the browser
if (event) {
  // Set the status code to 404 for a custom 404 page
  setResponseStatus(event, 404)

  // Set the status message as well
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
В браузере `setResponseStatus` не действует.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
