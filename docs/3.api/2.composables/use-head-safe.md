---
title: useHeadSafe
description: Рекомендуемый способ предоставления данных head с помощью ввода пользователя.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

Композабл `useHeadSafe` - это обертка вокруг композабла [`useHead`](/docs/api/composables/use-head), который ограничивает входные данные, позволяя использовать только безопасные значения.

## Использование

Вы можете передать все те же значения, что и [`useHead`](/docs/api/composables/use-head)

```ts
useHeadSafe({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})
// Будет безопасно генерироваться
// <script id="xss-script"></script>
// <meta content="0;javascript:alert(1)">
```

::read-more{to="https://unhead.unjs.io/docs/api/use-head-safe" target="_blank"}
Подробнее о документации к `Unhead`.
::

## Тип

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

Список допустимых значений таков:

```ts
const WhitelistAttributes = {
  htmlAttrs: ['class', 'style', 'lang', 'dir'],
  bodyAttrs: ['class', 'style'],
  meta: ['name', 'property', 'charset', 'content', 'media'],
  noscript: ['textContent'],
  style: ['media', 'textContent', 'nonce', 'title', 'blocking'],
  script: ['type', 'textContent', 'nonce', 'blocking'],
  link: ['color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

Более подробную информацию о типах см. в [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts).
