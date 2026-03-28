---
title: 'setPageLayout'
description: setPageLayout позволяет динамически изменять лейаут страницы.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` позволяет динамически изменять лейаут страницы. Функция зависит от доступа к контексту Nuxt и поэтому может быть вызвана только в пределах [Nuxt-контекста](/docs/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // Установите лейаут на маршрут, по которому вы _перемещаетесь_.
  setPageLayout('other')
})
```

::note
Если вы решили установить лейаут динамически на стороне сервера, вы _должны_ сделать это до того, как макет будет отрисован Vue (то есть в плагине или в middleware маршрута), чтобы избежать несоответствия гидратации.
::
