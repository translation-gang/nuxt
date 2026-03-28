---
title: 'prerenderRoutes'
description: Функция prerenderRoutes указывает Nitro пререндерить дополнительный маршрут.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

При предварительном рендеринге вы можете подсказать Nitro предварительно отрендерить дополнительные пути, даже если их URL-адреса не отображаются в HTML-коде сгенерированной страницы.

::important
`prerenderRoutes` может быть вызвана только в рамках [контекста Nuxt](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
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

Можно пререндерить и API-маршруты — это удобно для полностью статических сайтов (SSG): тогда `$fetch` к данным работает так, будто сервер всегда доступен.

```js
prerenderRoutes('/api/content/article/name-of-article')

// Позже в приложении
const articleContent = await $fetch('/api/content/article/name-of-article', {
  responseType: 'json',
})
```

::warning
У пререндеренных API-маршрутов в продакшене заголовки ответа могут отличаться от ожидаемых — зависит от хостинга. Например, JSON могут отдать с типом `application/octet-stream`.
При запросах к таким маршрутам всегда задавайте `responseType` вручную.
::
