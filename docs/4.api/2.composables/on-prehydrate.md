---
title: "onPrehydrate"
description: "onPrehydrate запускает колбэк на клиенте прямо перед гидратацией страницы Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Доступен в Nuxt v3.12+.
::

`onPrehydrate` — хук жизненного цикла: колбэк на клиенте сразу перед гидратацией.
::note
Продвинутая утилита — используйте осознанно. Например, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) и [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) меняют DOM, чтобы избежать несоответствий гидратации.
::

## Использование

Вызывайте `onPrehydrate` в `setup` компонента (`<script setup>`) или в плагине. Эффект только при вызове на сервере; в клиентскую сборку не попадает.

## Тип

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## Параметры

| Parameter | Type | Required | Description |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | Yes | Функция (или строка с функцией) до гидратации Nuxt. Сериализуется и встраивается в HTML. Без внешних зависимостей и замыканий на переменные снаружи. До инициализации Nuxt/Vue — без их контекста. |
| `key` | `string` | No | (Продвинуто) Уникальный ключ скрипта prehydrate, например при нескольких корневых узлах. |

## Возвращаемые значения

- `undefined`, если передан только колбэк.
- Строка (id prehydrate), если переданы колбэк и `key` — для `data-prehydrate-id` в сложных сценариях.

## Пример

```vue twoslash [app/app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// Код до гидратации Nuxt
onPrehydrate(() => {
  console.log(window)
})

// Корневой элемент
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// Продвинуто: свой data-prehydrate-id
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
