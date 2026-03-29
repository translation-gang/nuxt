---
title: 'setPageLayout'
description: Функция setPageLayout позволяет динамически менять лейаут страницы.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` позволяет динамически изменять лейаут страницы. Функция зависит от доступа к контексту Nuxt и поэтому может быть вызвана только в пределах [Nuxt-контекста](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts [middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  // Установите лейаут на маршрут, по которому вы _перемещаетесь_.
  setPageLayout('other')
})
```

## Передача пропсов в лейаут

Пропсы можно передать вторым аргументом — объектом:

```ts [middleware/admin-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('admin', {
    sidebar: true,
    title: 'Dashboard',
  })
})
```

Лейаут принимает их через `defineProps`:

```vue [layouts/admin.vue]
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
Если вы задаёте лейаут динамически на сервере, сделайте это до отрисовки лейаута Vue (в плагине или middleware маршрута), иначе возможен сбой гидратации.
::
