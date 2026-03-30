---
title: 'useSeoMeta'
description: Композабл useSeoMeta задаёт SEO-метатеги сайта плоским объектом с полной поддержкой TypeScript.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Так проще избежать типичных ошибок — например `name` вместо `property` — и опечаток: более 100 метатегов полностью типизированы.

::important
Так рекомендуется добавлять метатеги: безопасно от XSS и с полной поддержкой TypeScript.
::

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Использование

```vue [app/app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

Для реактивных тегов используйте синтаксис вычисляемого геттера (`() => value`):

```vue [app/app.vue]
<script setup lang="ts">
const title = ref('My title')

useSeoMeta({
  title,
  description: () => `This is a description for the ${title.value} page`,
})
</script>
```

## Параметры

Более 100 параметров. Полный список — в [исходном коде](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035).

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Производительность

Чаще всего SEO-метатеги не нужно делать реактивными: поисковые роботы в основном смотрят на начальную загрузку страницы.

Для лучшей производительности оборачивайте вызовы `useSeoMeta` в условие «только сервер», если реактивность не нужна:

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // Эти метатеги добавятся только при SSR
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // other static meta tags...
  })
}

const dynamicTitle = ref('My title')
// Реактивные метатеги — вне условия, только когда это необходимо
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

Раньше для этого использовали композабл [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta), но он устарел в пользу такого подхода.
