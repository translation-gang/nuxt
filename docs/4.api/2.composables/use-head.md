---
title: useHead
description: "useHead настраивает содержимое тега head отдельных страниц приложения Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

`useHead` управляет тегами в `<head>` реактивно через [Unhead](https://unhead.unjs.io): meta, link, script и др.

```vue [app/app.vue]
<script setup lang="ts">
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
</script>
```

::warning
Если данные от пользователя или из ненадёжного источника — смотрите [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe).
::

::note
Поля `useHead` могут быть реактивными: `ref`, `computed`, `reactive`. Параметр `meta` может быть функцией, возвращающей объект.
::

## Тип

```ts [Signature]
export function useHead (meta: MaybeComputedRef<MetaObject>): ActiveHeadEntry<UseHeadInput>

interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}

interface ActiveHeadEntry<Input> {
  /**
   * Updates the entry with new input.
   *
   * Will first clear any side effects for previous input.
   */
  patch: (input: Input) => void
  /**
   * Dispose the entry, removing it from the active head.
   *
   * Will queue side effects for removal.
   */
  dispose: () => void
}
```

Подробнее типы — в [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts).

## Параметры

`meta`: объект с полями для `<head>`. Все поля поддерживают реактивные значения (`ref`, `computed`, `reactive`) или функцию, возвращающую объект метаданных.

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string` | Заголовок страницы. |
| `titleTemplate` | `string \| ((title?: string) => string)` | Шаблон заголовка: строка с `%s` или функция. |
| `base` | `Base` | Тег `<base>`. |
| `link` | `Link[]` | Массив объектов → теги `<link>`. |
| `meta` | `Meta[]` | Массив объектов → теги `<meta>`. |
| `style` | `Style[]` | Массив объектов → теги `<style>`. |
| `script` | `Script[]` | Массив объектов → теги `<script>`. |
| `noscript` | `Noscript[]` | Массив объектов → теги `<noscript>`. |
| `htmlAttrs` | `HtmlAttributes` | Атрибуты `<html>`. |
| `bodyAttrs` | `BodyAttributes` | Атрибуты `<body>`. |

## Возвращаемые значения

Композабл ничего не возвращает. Метаданные регистрируются в Unhead, который обновляет DOM.

## Примеры

### Базовые meta

```vue [app/pages/about.vue]
<script setup lang="ts">
useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Learn more about our company' },
    { property: 'og:title', content: 'About Us' },
    { property: 'og:description', content: 'Learn more about our company' },
  ],
})
</script>
```

### Реактивные meta

```vue [app/pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: 'John Doe' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `Profile page for ${profile.value.name}`),
    },
  ],
})
</script>
```

### Функция для полной реактивности

```vue [app/pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `Count: ${count.value}`,
  meta: [
    { name: 'description', content: `Current count is ${count.value}` },
  ],
}))
</script>
```

### Внешние script и style

```vue [app/pages/external.vue]
<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.example.com/styles.css',
    },
  ],
  script: [
    {
      src: 'https://cdn.example.com/script.js',
      async: true,
    },
  ],
})
</script>
```

### Атрибуты body и html

```vue [app/pages/themed.vue]
<script setup lang="ts">
const isDark = ref(true)

useHead({
  htmlAttrs: {
    lang: 'en',
    class: computed(() => isDark.value ? 'dark' : 'light'),
  },
  bodyAttrs: {
    class: 'themed-page',
  },
})
</script>
```

:read-more{to="/docs/4.x/getting-started/seo-meta"}
