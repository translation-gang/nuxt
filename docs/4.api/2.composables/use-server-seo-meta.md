---
title: 'useServerSeoMeta'
description: Композабл useServerSeoMeta задаёт SEO-метатеги сайта плоским объектом с полной поддержкой TypeScript.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Как и [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta), композабл `useServerSeoMeta` задаёт SEO-метатеги сайта плоским объектом с полной поддержкой TypeScript.

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

В большинстве случаев мета не нужно делать реактивной: роботы читают только начальную загрузку. Поэтому рекомендуем [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) как утилиту с упором на производительность: на клиенте она ничего не делает (и не возвращает объект `head`).

```vue [app/app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow',
})
</script>
```

Параметры те же, что у [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta)

:read-more{to="/docs/4.x/getting-started/seo-meta"}
