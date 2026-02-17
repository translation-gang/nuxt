---
title: 'setPageLayout'
description: "Динамическая смена макета страницы."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::important
`setPageLayout` меняет макет страницы во время выполнения. Требует контекст Nuxt, поэтому вызывать можно только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

```ts [app/middleware/custom-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('other')
})
```

## Передача пропсов в макет

Второй аргумент — объект с пропсами для макета:

```ts [app/middleware/admin-layout.ts]
export default defineNuxtRouteMiddleware((to) => {
  setPageLayout('admin', {
    sidebar: true,
    title: 'Dashboard',
  })
})
```

Макет принимает эти пропсы:

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
      Боковая панель
    </aside>
    <main>
      <h1>{{ title }}</h1>
      <slot />
    </main>
  </div>
</template>
```

::note
При динамической смене макета на сервере вызывайте `setPageLayout` до рендера макета Vue (в плагине или route middleware), иначе возможна рассинхронизация при гидрации.
::
