---
title: "defineNuxtComponent"
description: "Хелпер для определения типобезопасных компонентов в Options API."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` — хелпер для объявления типобезопасных компонентов в формате Options API (аналог [`defineComponent()`](https://vuejs.org/api/general#definecomponent)) с поддержкой опций `asyncData` и `head`.
::

::note
В Nuxt рекомендуется объявлять компоненты через `<script setup lang="ts">`.
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

Если не используете `setup()`, можно задать данные через метод `asyncData()` в опциях компонента:

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

Если не используете `setup()`, метаданные для head можно задать методом `head()` в опциях компонента:

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head (nuxtApp) {
    return {
      title: 'Мой сайт',
    }
  },
})
</script>
```
