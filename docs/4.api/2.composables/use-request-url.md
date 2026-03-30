---
title: 'useRequestURL'
description: 'Доступ к URL входящего запроса через композабл useRequestURL.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` возвращает [объект URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) и работает на сервере и клиенте.

::important
При [гибридном рендеринге](/docs/4.x/guide/concepts/rendering#hybrid-rendering) со стратегиями кэша [слой кэша Nitro](https://nitro.build/guide/cache) отбрасывает заголовки запроса при отдаче кэшированного ответа (тогда у `useRequestURL` для `host` будет `localhost`).

Задайте опцию [`cache.varies`](https://nitro.build/guide/cache#options), чтобы при кэшировании учитывались нужные заголовки, например `host` и `x-forwarded-host` для мультитенантности.
::

::code-group

```vue [app/pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL is: {{ url }}</p>
  <p>Path is: {{ url.pathname }}</p>
</template>
```

```html [Result in development]
<p>URL is: http://localhost:3000/about</p>
<p>Path is: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
Свойства экземпляра URL в документации MDN.
::
