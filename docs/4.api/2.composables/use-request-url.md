---
title: 'useRequestURL'
description: 'URL входящего запроса через композабл useRequestURL.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` — вспомогательная функция, возвращающая объект [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) одинаково на сервере и на клиенте.

::important
При [гибридном рендеринге](/docs/3.x/guide/concepts/rendering#hybrid-rendering) со стратегиями кэширования все заголовки входящего запроса отбрасываются при отдаче ответа из кэша через [слой кэширования Nitro](https://nitro.build/guide/cache) (то есть для `host` в `useRequestURL` может вернуться `localhost`).

Задайте опцию [`cache.varies`](https://nitro.build/guide/cache#options), чтобы при кэшировании и выдаче ответа учитывались нужные заголовки — например `host` и `x-forwarded-host` в мультитенантных средах.
::

::code-group

```vue [pages/about.vue]
<script setup lang="ts">
const url = useRequestURL()
</script>

<template>
  <p>URL-адрес: {{ url }}</p>
  <p>Путь: {{ url.pathname }}</p>
</template>
```

```html [Результат в разработке]
<p>URL-адрес: http://localhost:3000/about</p>
<p>Путь: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
Свойства экземпляра `URL` описаны в документации MDN.
::
