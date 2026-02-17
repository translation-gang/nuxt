---
title: 'useServerSeoMeta'
description: 'Определение SEO meta-тегов сайта в виде плоского объекта с поддержкой TypeScript (только сервер).'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Как и [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta), `useServerSeoMeta` задаёт SEO-метатеги сайта плоским объектом с полной поддержкой TypeScript.

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

Чаще всего метатеги не требуют реактивности — роботы смотрят только первоначальную загрузку. [`useServerSeoMeta`](/docs/4.x/api/composables/use-server-seo-meta) ориентирован на производительность: на клиенте ничего не делает (или возвращает объект `head`).

```vue [app/app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow',
})
</script>
```

Параметры совпадают с [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta).

:read-more{to="/docs/4.x/getting-started/seo-meta"}
