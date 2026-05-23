---
title: 'useServerSeoMeta'
description: 'Определение SEO meta-тегов сайта в виде плоского объекта с поддержкой TypeScript (только сервер).'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

::warning
`useServerSeoMeta` устарел. Оберните [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta) в блок `if (import.meta.server)`. Автоимпорт удалён при `future.compatibilityVersion: 5`.
::

Как и [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta), `useServerSeoMeta` задаёт SEO-метатеги сайта плоским объектом с полной поддержкой TypeScript, но выполняется только на сервере и вырезается из клиентского бандла (tree-shaking).

:read-more{to="/docs/4.x/api/composables/use-seo-meta"}

Чаще всего метатеги не требуют реактивности — роботы смотрят только первоначальную загрузку. Для нового кода используйте серверный паттерн напрямую:

```vue [app/app.vue]
<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    robots: 'index, follow',
  })
}
</script>
```

Параметры совпадают с [`useSeoMeta`](/docs/4.x/api/composables/use-seo-meta).

:read-more{to="/docs/4.x/getting-started/seo-meta"}
