---
title: useHead
description: 'Композабл useHead задаёт содержимое `<head>` отдельных страниц приложения Nuxt.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

Композабл `useHead` управляет тегами в `<head>` программно и реактивно на базе [Unhead](https://unhead.unjs.io): мета-теги, ссылки, скрипты и другие элементы документа.

```vue [app.vue]
<script setup lang="ts">
useHead({
  title: 'Моё приложение',
  meta: [
    { name: 'description', content: 'Мой замечательный сайт.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
</script>
```

::warning
Если данные приходят от пользователя или из другого недоверенного источника, используйте [`useHeadSafe`](/docs/3.x/api/composables/use-head-safe).
::

::note
Поля `useHead` могут быть динамическими: `ref`, `computed`, `reactive`. Параметр `meta` может быть функцией, возвращающей объект, чтобы сделать весь объект реактивным.
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
   * Обновляет запись новым вводом.
   *
   * Сначала снимает побочные эффекты предыдущего ввода.
   */
  patch: (input: Input) => void
  /**
   * Удаляет запись из активного head.
   *
   * Постановка побочных эффектов на удаление в очередь.
   */
  dispose: () => void
}
```

Более подробную информацию о типах см. в [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts).

## Параметры

`meta`: объект с метаданными для `<head>`. Все поля поддерживают реактивные значения (`ref`, `computed`, `reactive`) или функцию, возвращающую объект метаданных.

| Свойство | Тип | Описание |
| --- | --- | --- |
| `title` | `string` | Заголовок страницы. |
| `titleTemplate` | `string \| ((title?: string) => string)` | Шаблон заголовка: строка с `%s` или функция. |
| `base` | `Base` | Тег `<base>`. |
| `link` | `Link[]` | Массив объектов ссылок → `<link>`. |
| `meta` | `Meta[]` | Массив мета-объектов → `<meta>`. |
| `style` | `Style[]` | Массив объектов стилей → `<style>`. |
| `script` | `Script[]` | Массив объектов скриптов → `<script>`. |
| `noscript` | `Noscript[]` | Массив объектов → `<noscript>`. |
| `htmlAttrs` | `HtmlAttributes` | Атрибуты тега `<html>`. |
| `bodyAttrs` | `BodyAttributes` | Атрибуты тега `<body>`. |

## Возвращаемые значения

Композабл ничего не возвращает. Метаданные регистрируются в Unhead, который обновляет DOM.

## Примеры

### Базовые мета-теги

```vue [pages/about.vue]
<script setup lang="ts">
useHead({
  title: 'О нас',
  meta: [
    { name: 'description', content: 'Узнайте больше о нашей компании' },
    { property: 'og:title', content: 'О нас' },
    { property: 'og:description', content: 'Узнайте больше о нашей компании' },
  ],
})
</script>
```

### Реактивные мета-теги

```vue [pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: 'Иван Иванов' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `Страница профиля: ${profile.value.name}`),
    },
  ],
})
</script>
```

### Функция для полной реактивности

```vue [pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `Счётчик: ${count.value}`,
  meta: [
    { name: 'description', content: `Текущее значение: ${count.value}` },
  ],
}))
</script>
```

### Внешние скрипты и стили

```vue [pages/external.vue]
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

### Атрибуты `html` и `body`

```vue [pages/themed.vue]
<script setup lang="ts">
const isDark = ref(true)

useHead({
  htmlAttrs: {
    lang: 'ru',
    class: computed(() => isDark.value ? 'dark' : 'light'),
  },
  bodyAttrs: {
    class: 'themed-page',
  },
})
</script>
```

:read-more{to="/docs/3.x/getting-started/seo-meta"}
