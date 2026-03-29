---
title: "onPrehydrate"
description: "Используйте onPrehydrate, чтобы выполнить коллбэк на клиенте непосредственно перед гидратацией страницы Nuxt."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Этот композабл доступен в Nuxt v3.12+.
::

`onPrehydrate` — хук жизненного цикла: коллбэк выполняется на клиенте сразу перед гидратацией страницы Nuxt.

::note
Это продвинутая утилита; используйте её осознанно. Например, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) и [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) меняют DOM, чтобы избежать рассинхрона гидратации.
::

## Использование

Вызывайте `onPrehydrate` в `setup` компонента Vue (например, в `<script setup>`) или в плагине. Эффект есть только при вызове на сервере: такой код не попадёт в клиентскую сборку.

## Тип

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## Параметры

| Параметр | Тип | Обязательный | Описание |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | Да | Функция (или строковое представление функции), выполняемая до гидратации Nuxt. Сериализуется и встраивается в HTML. Не должна иметь внешних зависимостей и не должна ссылаться на переменные вне коллбэка. Выполняется до инициализации рантайма Nuxt, поэтому не должна опираться на контекст Nuxt или Vue. |
| `key` | `string` | Нет | (Продвинуто) Уникальный ключ встроенного скрипта перед гидратацией; удобно, например, при нескольких корневых узлах. |

## Возвращаемые значения

- при вызове только с коллбэком возвращает `undefined`;
- при вызове с коллбэком и `key` возвращает строку (идентификатор prehydrate), которую можно использовать для атрибута `data-prehydrate-id` в сложных сценариях.

## Пример

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// Код до гидратации Nuxt
onPrehydrate(() => {
  console.log(window)
})

// Доступ к корневому элементу
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// Продвинуто: задать или прочитать `data-prehydrate-id` вручную
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
