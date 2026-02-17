---
title: 'useSeoMeta'
description: Композабл useSeoMeta позволяет вам определять мета-теги для SEO вашего сайта в виде плоского объекта с полной поддержкой TypeScript.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Это помогает вам избежать распространенных ошибок, таких как использование `name` вместо `property`, а также опечаток - более 100+ полностью типизированных метатегов.

::important
Это рекомендуемый способ добавления мета-тегов на ваш сайт, поскольку он безопасен с точки зрения XSS и имеет полную поддержку TypeScript.
::

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Использование

```vue [app/app.vue]
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

Существует более 100 параметров. См. [полный список параметров в исходном коде](https://github.com/harlan-zw/zhead/blob/main/packages/zhead/src/metaFlat.ts#L1035).

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## Производительность

Чаще всего SEO-метатеги не обязаны быть реактивными: роботы поисковиков в основном смотрят первоначальную загрузку страницы.

Чтобы не тратить ресурсы на реактивность, можно вызывать `useSeoMeta` только на сервере, когда метатеги статичны:

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  // эти метатеги добавляются только при SSR
  useSeoMeta({
    robots: 'index, follow',
    description: 'Static description that does not need reactivity',
    ogImage: 'https://example.com/image.png',
    // другие статичные метатеги...
  })
}

const dynamicTitle = ref('My title')
// реактивные метатеги — только когда нужны
useSeoMeta({
  title: () => dynamicTitle.value,
  ogTitle: () => dynamicTitle.value,
})
</script>
```

Раньше для этого использовался композабл [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta); он устарел в пользу такого подхода.
