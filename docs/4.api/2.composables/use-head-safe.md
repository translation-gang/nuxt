---
title: useHeadSafe
description: Рекомендуемый способ задавать head при данных от пользователя.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

`useHeadSafe` — обёртка над [`useHead`](/docs/4.x/api/composables/use-head), разрешающая только безопасные значения. Рекомендуется при пользовательском вводе: опасные атрибуты отсекаются, снижается риск XSS.

::warning
У `useHeadSafe` опасные атрибуты вроде `innerHTML` в script или `http-equiv` в meta удаляются. Используйте при пользовательском контенте.
::

## Тип

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### Разрешённые атрибуты

Белый список по типам элементов:

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

Подробнее — [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts).

## Параметры

`input`: `MaybeComputedRef<HeadSafe>` — те же поля, что у [`useHead`](/docs/4.x/api/composables/use-head), в DOM попадут только безопасные атрибуты.

## Возвращаемые значения

Композабл ничего не возвращает.

## Пример

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// Пользовательский контент с потенциально вредоносным кодом
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `User Profile`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // Безопасно санитизируется
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
Подробнее в документации Unhead.
::
