---
title: 'useRequestURL'
description: 'Доступ к URL входящего запроса.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` — хелпер, возвращающий [объект URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), работающий и на сервере, и на клиенте.

::important
При [гибридном рендеринге](/docs/4.x/guide/concepts/rendering#hybrid-rendering) с кэшированием заголовки входящего запроса при отдаче закэшированного ответа через [кэш Nitro](https://nitro.build/guide/cache) отбрасываются — в том числе для `useRequestURL` (например, `host` может стать `localhost`).

Опция [`cache.varies`](https://nitro.build/guide/cache#options) позволяет указать заголовки, учитываемые при кэшировании и отдаче (например, `host` и `x-forwarded-host` для мультитенантных окружений).
::

::code-group

```vue [app/pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL: {{ url }}</p>
  <p>Path: {{ url.pathname }}</p>
</template>
```

```html [Результат в dev]
<p>URL is: http://localhost:3000/about</p>
<p>Path is: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
Свойства экземпляра URL в документации MDN.
::
