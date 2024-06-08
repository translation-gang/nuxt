---
title: "useId"
description: Сгенерировать идентификатор, совместимый с SSR, который можно передать в атрибуты доступности.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/id.ts
    size: xs
---

::important
Этот композабл доступен с тех пор, как вышел [Nuxt v3.10](/blog/v3-10#ssr-safe-accessible-unique-id-creation).
::

`useId` генерирует удобный для SSR уникальный идентификатор, который можно передавать в атрибуты доступности.

Вызовите `useId` на верхнем уровне вашего компонента, чтобы сгенерировать уникальный строковый идентификатор:

```vue [components/EmailField.vue]
<script setup lang="ts">
const id = useId()
</script>

<template>
  <div>
    <label :for="id">Email</label>
    <input :id="id" name="email" type="email" />
  </div>
</template>
```

::note
`useId` должен использоваться в компоненте с одним корневым элементом, так как он использует атрибуты этого корневого элемента для передачи идентификатора от сервера к клиенту.
::

## Параметры

`useId` не принимает никаких параметров.

## Возвращаемое значение

`useId` возвращает уникальную строку, связанную с этим конкретным вызовом `useId` в этом конкретном компоненте.
