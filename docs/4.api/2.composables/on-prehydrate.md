---
title: "onPrehydrate"
description: "Используйте onPrehydrate, чтобы запустить коллбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Этот коллбэк доступен в Nuxt v3.12+.
::

`onPrehydrate` — это коллбэк хука жизненного цикла, который позволяет запускать коллбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу.
::note
Это продвинутая утилита, и её следует использовать с осторожностью. Например, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) и [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) манипулируют DOM, чтобы избежать несоответствия гидратации.
::

## Использование

Вызывайте `onPrehydrate` в функции `setup` компонента Vue (например, в `<script setup>`) или в плагине. Эффект есть только при вызове на сервере; код не попадёт в клиентскую сборку.

## Тип

```ts [Сигнатура]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

| Параметр | Тип | Обязательный | Описание |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | Да | Функция (или строковое представление функции), выполняемая до гидратации Nuxt. Будет сериализована во встроенный в HTML скрипт. Не должна иметь внешних зависимостей и не должна ссылаться на переменные вне коллбэка. Выполняется до инициализации среды выполнения Nuxt, поэтому не должна опираться на контекст Nuxt или Vue. |
| `key` | `string` | Нет | (Продвинуто) Уникальный ключ для идентификации встроенного скрипта перед гидратацией; полезно, например, при нескольких корневых узлах. |

## Возвращаемое значение

- При вызове только с коллбэком возвращает `undefined`.
- При вызове с коллбэком и `key` возвращает строку — идентификатор встроенного скрипта перед гидратацией; его можно использовать для установки или чтения атрибута `data-prehydrate-id` в сложных сценариях.

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
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Привет </div>
})

// Продвинуто: задать/прочитать `data-prehydrate-id` вручную
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Здравствуйте.
  </div>
</template>
```
