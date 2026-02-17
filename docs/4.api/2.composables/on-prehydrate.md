---
title: "onPrehydrate"
description: "Используйте onPrehydrate, чтобы запустить коллбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Этот коллбэк доступен в Nuxt v3.12+.
::

`onPrehydrate` это коллбэк хука жизненного цикла, который позволяет запускать коллбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу.
::note
Это продвинутая утилита, и ее следует использовать с осторожностью. Например, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) и [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) манипулирует DOM, чтобы избежать несоответствия гидратации.
::

## Использование

Вызывайте `onPrehydrate` в setup-функции компонента (например в `<script setup>`) или в плагине. Эффект только при вызове на сервере; в клиентскую сборку не попадает.

## Тип

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

Она будет иметь эффект только при вызове на сервере, и не будет включена в сборку клиента.

| Параметр  | Тип                               | Обязательный | Описание |
| --------- | --------------------------------- | ------------ | -------- |
| `callback` | `((el: HTMLElement) => void) \| string` | Да | Функция (или её строковое представление), выполняемая до гидрации Nuxt. Сериализуется и вставляется в HTML. Не должна иметь внешних зависимостей и ссылок на переменные вне коллбэка. Выполняется до инициализации runtime Nuxt — не опирайтесь на контекст Nuxt или Vue. |
| `key`     | `string`                          | Нет          | (Продвинуто) Уникальный ключ скрипта prehydrate, полезен при нескольких корневых узлах. |

## Возвращаемые значения

- При вызове только с коллбэком — `undefined`.
- При вызове с коллбэком и `key` — строка (id prehydrate) для атрибута `data-prehydrate-id` в продвинутых сценариях.

## Пример

```vue twoslash [app/app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// код до гидрации Nuxt
onPrehydrate(() => {
  console.log(window)
})

// доступ к корневому элементу
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// продвинуто: задать/получить data-prehydrate-id
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Здравствуйте.
  </div>
</template>
```
