---
title: useHeadSafe
description: Рекомендуемый способ предоставления данных head с помощью ввода пользователя.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useHeadSafe.ts
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

::read-more{to="https://unhead.unjs.io/usage/composables/use-head-safe" target="_blank"}
Подробнее о документации к `unhead`.
::

## Тип

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

Белый список безопасных значений:

```ts
export default {
  htmlAttrs: ['id', 'class', 'lang', 'dir'],
  bodyAttrs: ['id', 'class'],
  meta: ['id', 'name', 'property', 'charset', 'content'],
  noscript: ['id', 'textContent'],
  script: ['id', 'type', 'textContent'],
  link: ['id', 'color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

Более подробную информацию о типах см. в [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/safeSchema.ts).
