---
title: "useLayout"
description: useLayout возвращает макет, выбранный для текущего маршрута.
minimalVersion: "4.5"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/layout.ts
    size: xs
---

## Описание

`useLayout` возвращает computed ref с макетом для текущего маршрута по той же цепочке, что и [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout): сначала `layout` из meta страницы, затем `appLayout` из [route rules](/docs/4.x/guide/concepts/rendering#hybrid-rendering), затем `'default'`.

Внутри отрендеренного `<NuxtLayout>` отражает оборачивающий макет; вне его (например, в `app.vue`) возвращает макет, который был бы выбран для текущего маршрута.

В отличие от прямого чтения `route.meta.layout`, учитывает макет из route rules и остаётся синхронизированным при смене маршрута.

## Возвращаемые значения

Read-only computed ref с именем макета (`string`) или `false`, если макет отключён.

## Пример

```vue [app.vue]
<script setup lang="ts">
const layout = useLayout()
</script>

<template>
  <div>
    <CommandPalette v-if="layout !== 'minimal'" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```
