---
title: 'defineRouteRules'
description: 'Определите правила маршрутов для гибридного рендеринга на уровне страницы.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/guide/going-further/experimental-features#inlinerouterules" icon="i-ph-star-duotone"}
Эта функция является экспериментальной, и для ее использования необходимо включить опцию `experimental.inlineRouteRules` в вашем `nuxt.config`.
::

## Использование

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>Привет мир!</h1>
</template>
```

Будет переведено на:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})
```

::note
При выполнении [`nuxt build`](/docs/api/commands/build), главная страница пререндерится в файл `.output/public/index.html` и статически обслуживаться.
::

## Заметки

- Правило, определенное в `~/pages/foo/bar.vue`, будет применено к запросам `/foo/bar`.
- Правило в `~/pages/foo/[id].vue` будет применено к запросам `/foo/**`.

Для более точного управления, например, если вы используете настраиваемый `path` или `alias` установленный в [`definePageMeta`](/docs/api/utils/define-page-meta) страницы, вы должны установить `routeRules` непосредственно в вашем `nuxt.config`.

::read-more{to="/docs/guide/concepts/rendering#hybrid-rendering" icon="i-ph-medal-duotone"}
Узнайте больше о `routeRules`.
::
