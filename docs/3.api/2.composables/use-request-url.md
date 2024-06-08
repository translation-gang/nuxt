---
title: 'useRequestURL'
description: 'Получите доступ к URL-адресу входящего запроса с помощью композабла useRequestURL.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/url.ts
    size: xs
---

`useRequestURL` - это вспомогательная функция, которая возвращает объект [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), работающий как на сервере, так и на клиенте.

::important
При использовании [Hybrid Rendering](/docs/guide/concepts/rendering#hybrid-rendering) со стратегиями кэширования, все заголовки входящих запросов отбрасываются при обработке кэшированных ответов через [слой кэширования Nitro](https://nitro.unjs.io/guide/cache) (то есть `useRequestURL` будет возвращать `localhost` для `host`).

Вы можете определить опцию [`cache.varies`](https://nitro.unjs.io/guide/cache#options), чтобы указать заголовки, которые будут учитываться при кэшировании и обслуживании ответов, например `host` и `x-forwarded-host` для многопользовательских сред.
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

```html [Result in development]
<p>URL-адрес: http://localhost:3000/about</p>
<p>Путь: /about</p>
```

::

::tip{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/en-US/docs/Web/API/URL#instance_properties" target="_blank"}
О свойствах экземпляра URL читайте в документации MDN.
::
