---
title: 'useSeoMeta'
description: Композабл useSeoMeta позволяет вам определять мета-теги SEO вашего сайта в виде плоского объекта с полной поддержкой TypeScript.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useSeoMeta.ts
    size: xs
---

Это помогает вам избежать распространенных ошибок, таких как использование `name` вместо `property`, а также опечаток - с более чем полностью прописанными 100+ мета-тегами.

::important
Это рекомендуемый способ добавления мета-тегов на ваш сайт, поскольку он безопасен с точки зрения XSS и имеет полную поддержку TypeScript.
::

:read-more{to="/docs/getting-started/seo-meta"}

## Использование

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'Мой удивительный сайт',
  ogTitle: 'Мой удивительный сайт',
  description: 'Это мой удивительный сайт, позвольте мне рассказать вам о нем',
  ogDescription: 'Это мой удивительный сайт, позвольте мне рассказать вам о нем',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

При вставке реактивных тегов вы должны использовать синтаксис вычисляемого геттера (`() => value`):

```vue [app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `description: ${title.value}`
})
</script>
```

## Параметры

Существует более 100 параметров. См. [полный список параметров в исходном коде](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035).

:read-more{to="/docs/getting-started/seo-meta"}
