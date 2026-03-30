---
title: "defineNuxtComponent"
description: defineNuxtComponent() — хелпер для типобезопасного объявления компонентов на Options API.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` — хелпер для типобезопасных Vue-компонентов на options API, аналог [`defineComponent()`](https://vuejs.org/api/general#definecomponent). Обёртка `defineNuxtComponent()` также поддерживает опции компонента `asyncData` и `head`.
::

::note
Рекомендуемый способ в Nuxt — `<script setup lang="ts">`.
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

Если в приложении не используется `setup()`, в определении компонента можно вызвать `asyncData()`:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  asyncData () {
    return {
      data: {
        greetings: 'hello world!',
      },
    }
  },
})
</script>
```

## `head()`

Без `setup()` в определении компонента можно использовать метод `head()`:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head (nuxtApp) {
    return {
      title: 'My site',
    }
  },
})
</script>
```
