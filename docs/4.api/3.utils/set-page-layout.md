---
title: 'setPageLayout'
description: setPageLayout динамически меняет layout страницы.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` меняет layout страницы динамически. Нужен контекст Nuxt, вызывать только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // Set the layout on the route you are navigating _to_
  setPageLayout('other')
})
```

## Передача пропсов в layout

Пропсы layout передаются вторым аргументом — объектом:

```ts [app/middleware/admin-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('admin', {
    sidebar: true,
    title: 'Dashboard',
  })
})
```

Layout получает их так:

```vue [app/layouts/admin.vue]
<script setup lang="ts">
const props = defineProps<{
  sidebar?: boolean
  title?: string
}>()
</script>

<template>
  <div>
    <aside v-if="sidebar">
      Sidebar
    </aside>
    <main>
      <h1>{{ title }}</h1>
      <slot />
    </main>
  </div>
</template>
```

::note
Если layout задаётся динамически на сервере, это **нужно** сделать до того, как Vue отрисует layout (в плагине или route middleware), иначе возможен рассинхрон гидратации.
::
