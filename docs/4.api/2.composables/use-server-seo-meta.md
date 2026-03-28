---
title: 'useServerSeoMeta'
description: 'SEO-метатеги только на сервере через композабл useServerSeoMeta (плоский объект, TypeScript).'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Как и [`useSeoMeta`](/docs/3.x/api/composables/use-seo-meta), композабл `useServerSeoMeta` задаёт метатеги плоским объектом с типизацией.

:read-more{to="/docs/3.x/api/composables/use-seo-meta"}

Обычно метаданные для SEO не должны быть реактивными: роботы смотрят на первый ответ. `useServerSeoMeta` оптимизирован под это: на клиенте он ничего не делает (и не возвращает объект `head`).

```vue [app.vue]
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>
```

Набор полей совпадает с [`useSeoMeta`](/docs/3.x/api/composables/use-seo-meta).

:read-more{to="/docs/3.x/getting-started/seo-meta"}
