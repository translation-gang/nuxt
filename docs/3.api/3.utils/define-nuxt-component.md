---
title: "defineNuxtComponent"
description: defineNuxtComponent() - это хелпер для определения компонентов с безопасным типом с использованием Options API.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` - это хелпер для определения безопасных с точки зрения типов компонентов Vue с использованием Options API, аналогично  [`defineComponent()`](https://ru.vuejs.org/api/general.html#definecomponent). Обертка `defineNuxtComponent()` также добавляет поддержку опций компонента  `asyncData` и `head`.
::

::note
Использование `<script setup lang="ts">` является рекомендуемым способом объявления компонентов Vue в Nuxt 3.
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

Если вы решите не использовать`setup()` в своем приложении, вы можете использовать метод `asyncData()` в определении компонента:

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  async asyncData() {
    return {
      data: {
        greetings: 'привет мир!'
      }
    }
  },
})
</script>
```

## `head()`

Если вы решите не использовать`setup()` в своем приложении, вы можете использовать метод `asyncData()` в определении компонента:

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: 'Мой сайт'
    }
  },
})
</script>
```
