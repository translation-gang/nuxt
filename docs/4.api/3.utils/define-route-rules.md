---
title: 'defineRouteRules'
description: 'Определите правила маршрутов для гибридного рендеринга на уровне страницы.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/composables.ts
    size: xs
---

::read-more{to="/docs/3.x/guide/going-further/experimental-features#inlinerouterules" icon="i-lucide-star"}
Эта функция является экспериментальной, и для ее использования необходимо включить опцию `experimental.inlineRouteRules` в вашем `nuxt.config`.
::

## Использование

```vue [pages/index.vue]
<script setup lang="ts">
defineRouteRules({
  prerender: true,
})
</script>

<template>
  <h1>Привет мир!</h1>
</template>
```

При сборке это преобразуется в:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
  },
})
```

::note
При выполнении [`nuxt build`](/docs/3.x/api/commands/build) главная страница пререндерится в файл `.output/public/index.html` и будет отдаваться статически.
::

## Заметки

- Правило, определенное в `~/pages/foo/bar.vue`, будет применено к запросам `/foo/bar`.
- Правило в `~/pages/foo/[id].vue` будет применено к запросам `/foo/**`.

Для более точного управления, например, если вы используете настраиваемый `path` или `alias`, заданный в [`definePageMeta`](/docs/3.x/api/utils/define-page-meta) страницы, задайте `routeRules` напрямую в `nuxt.config`.

::read-more{to="/docs/3.x/guide/concepts/rendering#hybrid-rendering" icon="i-lucide-medal"}
Узнайте больше о `routeRules`.
::
