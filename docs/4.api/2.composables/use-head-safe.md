---
title: useHeadSafe
description: Рекомендуемый способ задавать содержимое `<head>` при данных от пользователя.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

`useHeadSafe` — обёртка над [`useHead`](/docs/3.x/api/composables/use-head), которая пропускает только безопасные значения. Так безопаснее работать с пользовательским вводом и снижать риск XSS.

::warning
В `useHeadSafe` потенциально опасные атрибуты (например, `innerHTML` в `script` или `http-equiv` в `meta`) автоматически отбрасываются. Используйте этот композабл, когда в разметку попадает пользовательский контент.
::

## Тип

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### Разрешённые атрибуты

Белый список атрибутов по типам элементов:

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

Подробнее о типах — в [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts).

## Параметры

`input`: объект `MaybeComputedRef<HeadSafe>` с данными для `<head>`. Допустимы те же поля, что и в [`useHead`](/docs/3.x/api/composables/use-head), но в DOM попадут только безопасные атрибуты.

## Возвращаемые значения

Композабл ничего не возвращает.

## Пример

```vue [pages/user-profile.vue]
<script setup lang="ts">
// Пользовательский контент, в котором теоретически может быть вредоносный код
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `Профиль пользователя`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // безопасно санитизируется
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
Подробнее в документации Unhead (`useHeadSafe`).
::
