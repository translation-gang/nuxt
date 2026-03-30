---
title: 'defineRouteRules'
description: 'Правила маршрутов для гибридного рендеринга на уровне страницы.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/4.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
Функция экспериментальная: включите в `nuxt.config` опцию `experimental.inlineRouteRules`.
::

## Использование

```vue [app/pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>Hello world!</h1>
</template>
```

Преобразуется в:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
  },
})
```

::note
При [`nuxt build`](/docs/4.x/api/commands/build) главная страница пререндерится в `.output/public/index.html` и отдаётся статически.
::

## Замечания

- Правило в `~/pages/foo/bar.vue` применяется к запросам `/foo/bar`.
- Правило в `~/pages/foo/[id].vue` — к запросам `/foo/**`.

Для тонкой настройки при кастомном `path` или `alias` в [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) задавайте `routeRules` прямо в `nuxt.config`.

::read-more{to="/docs/4.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
Подробнее о `routeRules`.
::
