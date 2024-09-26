---
title: 'useServerSeoMeta'
description: Композабл useServerSeoMeta позволяет определить SEO-метатеги вашего сайта в виде плоского объекта с полной поддержкой TypeScript.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useServerSeoMeta.ts
    size: xs
---

Как и [`useSeoMeta`](/docs/api/composables/use-seo-meta), композабл `useServerSeoMeta` позволяет определить SEO-метатеги вашего сайта в виде плоского объекта с полной поддержкой TypeScript.

:read-more{to="/docs/api/composables/use-seo-meta"}

В большинстве случаев мета не должна быть реактивной, так как роботы будут сканировать только начальную загрузку. Поэтому мы рекомендуем использовать [`useServerSeoMeta`](/docs/api/composables/use-server-seo-meta) как утилиту, ориентированную на производительность, которая не будет ничего делать (или возвращать объект `head`) на клиенте.

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

Параметры точно такие же, как и у [`useSeoMeta`](/docs/api/composables/use-seo-meta)

:read-more{to="/docs/getting-started/seo-meta"}
