---
title: 'useSeoMeta'
description: 'SEO-метатеги плоским объектом с полной поддержкой TypeScript через композабл useSeoMeta.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Композабл снижает риск типичных ошибок — например, путаницы `name` и `property` — и даёт автодополнение по более чем сотне метатегов.

::important
Рекомендуемый способ задавать метатеги: безопаснее по XSS и удобнее в TypeScript.
::

:read-more{to="/docs/3.x/getting-started/seo-meta"}

## Использование

```vue [app.vue]
<script setup lang="ts">
useSeoMeta({
  title: 'Мой удивительный сайт',
  ogTitle: 'Мой удивительный сайт',
  description: 'Это мой удивительный сайт, позвольте мне рассказать вам о нём',
  ogDescription: 'Это мой удивительный сайт, позвольте мне рассказать вам о нём',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

Для реактивных значений используйте геттеры `() => value`:

```vue [app.vue]
<script setup lang="ts">
const title = ref('Мой заголовок')

useSeoMeta({
  title,
  description: () => `Описание страницы «${title.value}»`
})
</script>
```

## Параметры

Более 100 полей; полный перечень — в [исходниках zhead](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035).

:read-more{to="/docs/3.x/getting-started/seo-meta"}

## Производительность

Чаще всего SEO-метатеги не должны быть реактивными: поисковики опираются на первый HTML.

Если реактивность не нужна, вызывайте `useSeoMeta` только на сервере — так дешевле:

```vue [app.vue]
<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    robots: 'index, follow',
    description: 'Статическое описание без реактивности',
    ogImage: 'https://example.com/image.png',
    // другие статические метатеги...
  })
}

const dynamicTitle = ref('Мой заголовок')
// Реактивные метатеги — вне условия, только когда это действительно нужно
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

Раньше для этого использовали [`useServerSeoMeta`](/docs/3.x/api/composables/use-server-seo-meta); этот подход предпочтительнее.
