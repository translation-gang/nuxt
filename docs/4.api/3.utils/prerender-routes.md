---
title: 'prerenderRoutes'
description: prerenderRoutes подсказывает Nitro пререндерить дополнительный маршрут.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

При пререндере можно подсказать Nitro дополнительные пути, даже если их URL не встречается в HTML сгенерированной страницы.

::important
`prerenderRoutes` можно вызывать только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
`prerenderRoutes` должен выполняться в процессе пререндера. На динамических страницах/маршрутах, которые не пререндерятся, он не сработает.
::

```ts
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
В браузере или вне пререндера `prerenderRoutes` не действует.
::

Можно пререндерить и API-маршруты — удобно для полностью статических сайтов (SSG), когда данные затем получают через `$fetch`, как при наличии сервера.

```ts
prerenderRoutes('/api/content/article/name-of-article')

// Somewhere later in App
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
У пререндеренных API в продакшене заголовки ответа могут отличаться от ожидаемых в зависимости от хостинга. Например, JSON может отдаваться с типом `application/octet-stream`.
Всегда явно задавайте `responseType` при запросах к пререндеренным API.
::
