---
title: useHeadSafe
description: 'Рекомендуемый способ задавать данные head при наличии пользовательского ввода.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## Использование

`useHeadSafe` — обёртка над [`useHead`](/docs/4.x/api/composables/use-head), которая допускает только безопасные значения. Рекомендуется для управления head при работе с пользовательским вводом: опасные атрибуты отфильтровываются и снижается риск XSS.

::warning
При использовании `useHeadSafe` опасные атрибуты (например `innerHTML` в скриптах, `http-equiv` в meta) удаляются. Используйте этот композабл при выводе пользовательского контента в head.
::

## Тип

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### Разрешённые атрибуты

Для каждого типа элемента head разрешены следующие атрибуты:

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

Подробные типы: [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts).

## Параметры

`input`: объект `MaybeComputedRef<HeadSafe>` с данными для head. Можно передавать те же значения, что в [`useHead`](/docs/4.x/api/composables/use-head); отрендерятся только безопасные атрибуты.

## Возвращаемые значения

Композабл ничего не возвращает.

## Пример

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// пользовательский контент, который может содержать вредоносный код
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `User Profile`,
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
Подробнее в документации Unhead.
::
