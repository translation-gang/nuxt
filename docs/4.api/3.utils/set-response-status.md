---
title: 'setResponseStatus'
description: "Установка кода (и при необходимости statusText) ответа сервера."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

`setResponseStatus` задаёт код ответа (и при необходимости `statusText`).

::important
Вызывать можно только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts
const event = useRequestEvent()

// в браузере event будет undefined
if (event) {
  setResponseStatus(event, 404)
  setResponseStatus(event, 404, 'Page Not Found')
}
```

::note
В браузере вызов не имеет эффекта.
::

:read-more{to="/docs/4.x/getting-started/error-handling"}
