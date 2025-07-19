---
title: 'prerenderRoutes'
description: prerenderRoutes указывает Nitro на необходимость пререндера дополнительного маршрута.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

При предварительном рендеринге вы можете подсказать Nitro предварительно отрендерить дополнительные пути, даже если их URL-адреса не отображаются в HTML-коде сгенерированной страницы.

::important
`prerenderRoutes` может быть вызвана только в рамках [контекста Nuxt](/docs/guide/going-further/nuxt-app#the-nuxt-context).
::

::note
`prerenderRoutes` должен быть выполнен во время пререндеринга. Если `prerenderRoutes` используется в динамических страницах/роутах, которые не подвергаются пререндерингу, то он не будет выполнен.
::

```js
const route = useRoute()

prerenderRoutes('/')
prerenderRoutes(['/', '/about'])
```

::note
В браузере или при вызове вне пререндеринга `prerenderRoutes` не будет иметь никакого эффекта.
::

You can even prerender API routes which is particularly useful for full statically generated sites (SSG) because you can then `$fetch` data as if you have an available server!

```js
prerenderRoutes('/api/content/article/name-of-article')

// Somewhere later in App
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
Prerendered API routes in production may not return the expected response headers, depending on the provider you deploy to. For example, a JSON response might be served with an `application/octet-stream` content type.
Always manually set `responseType` when fetching prerendered API routes.
::
