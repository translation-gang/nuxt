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
