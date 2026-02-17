---
title: 'prerenderRoutes'
description: "Указание Nitro предварительно отрендерить дополнительный маршрут."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

При пререндеринге можно указать Nitro дополнительные пути для предварительного рендера, даже если их URL не встречаются в HTML сгенерированной страницы.

::important
`prerenderRoutes` можно вызывать только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
`prerenderRoutes` должен выполниться во время пререндеринга. В динамических страницах/маршрутах, которые не пререндерятся, он не сработает.
::

```ts
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
В браузере или вне пререндеринга вызов не имеет эффекта.
::

Можно пререндерить и API-маршруты — удобно для полностью статичных сайтов (SSG): затем данные можно получать через `$fetch`, как с работающего сервера.

```ts
prerenderRoutes('/api/content/article/name-of-article')

const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
Пререндеренные API-маршруты в проде могут отдавать не те заголовки (зависит от хостинга). Например, JSON может прийти с `Content-Type: application/octet-stream`. Явно задавайте `responseType` при запросе к пререндеренным API.
::
