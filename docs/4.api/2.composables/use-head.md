---
title: useHead
description: 'Настройка свойств head для отдельных страниц приложения Nuxt.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

Композабл `useHead` позволяет управлять тегами в `<head>` программно и реактивно с помощью [Unhead](https://unhead.unjs.io). С его помощью можно настраивать мета-теги, ссылки, скрипты и другие элементы в секции `<head>` HTML-документа.

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
Если данные приходят от пользователя или другого ненадёжного источника, рекомендуем использовать [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe).
::

::note
Свойства `useHead` могут быть динамическими: поддерживаются `ref`, `computed` и `reactive`. Параметр `meta` также может принимать функцию, возвращающую объект, чтобы сделать весь объект реактивным.
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

Подробные типы см. в [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts).

## Параметры

`meta`: объект со свойствами метаданных для настройки `<head>` страницы. Все свойства поддерживают реактивные значения (`ref`, `computed`, `reactive`) или могут быть функцией, возвращающей объект метаданных.

| Свойство | Тип | Описание |
| --- | --- | --- |
| `title` | `string` | Заголовок страницы. |
| `titleTemplate` | `string \| ((title?: string) => string)` | Шаблон для заголовка. Строка с плейсхолдером `%s` или функция. |
| `base` | `Base` | Тег `<base>` документа. |
| `link` | `Link[]` | Массив ссылок. Каждый элемент превращается в тег `<link>`. |
| `meta` | `Meta[]` | Массив мета-объектов. Каждый элемент — тег `<meta>`. |
| `style` | `Style[]` | Массив объектов стилей. Каждый элемент — тег `<style>`. |
| `script` | `Script[]` | Массив скриптов. Каждый элемент — тег `<script>`. |
| `noscript` | `Noscript[]` | Массив объектов для тегов `<noscript>`. |
| `htmlAttrs` | `HtmlAttributes` | Атрибуты тега `<html>`. |
| `bodyAttrs` | `BodyAttributes` | Атрибуты тега `<body>`. |

## Возвращаемые значения

Композабл ничего не возвращает. Он регистрирует метаданные в Unhead, который выполняет обновления DOM.

## Примеры

### Базовые мета-теги

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

### Реактивные мета-теги

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

### Подключение внешних скриптов и стилей

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
