---
title: 'defineRouteRules'
description: "Правила маршрутов для гибридного рендеринга на уровне страницы."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/4.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
Функция экспериментальная; для использования включите опцию `experimental.inlineRouteRules` в `nuxt.config`.
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

Эквивалентно конфигу:

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

## Примечания

- Правило в `~/pages/foo/bar.vue` применяется к запросам `/foo/bar`.
- Правило в `~/pages/foo/[id].vue` — к запросам `/foo/*`.
- Правило на странице с конечным набором альтернатив, например с `path` `/:locale(en|fr)/about`, создаёт по одному правилу на альтернативу (`/en/about` и `/fr/about`).

Если путь страницы нельзя преобразовать в эквивалентный шаблон route rule (например, параметр с регулярным выражением `/:id(\d+)`, частичный сегмент `/prefix-:id` или повторяемый параметр `/:slug+`), правила для этой страницы **не** применяются, и Nuxt предупреждает при сборке. В таком случае задайте правила явно в `nitro.routeRules` в `nuxt.config`.

При кастомном `path` или `alias` в [`definePageMeta`](/docs/4.x/api/utils/define-page-meta) задавайте `routeRules` напрямую в `nuxt.config`.

::read-more{to="/docs/4.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
Подробнее о `routeRules`.
::
