---
title: "onPrehydrate"
description: "Используйте onPrehydrate, чтобы запустить колбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
Этот колбэк будет доступен в Nuxt v3.12+ или в [канале ночных релизов](/docs/guide/going-further/nightly-release-channel).
::

`onPrehydrate` это колбэк хука жизненного цикла, который позволяет запускать колбэк-функцию на клиенте непосредственно перед тем, как Nuxt гидратирует страницу.

::note
Это продвинутая утилита, и ее следует использовать с осторожностью. Например, [`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) и [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) манипулирует DOM, чтобы избежать несоответствия гидратации.
::

## Использование

`onPrehydrate` можно вызвать непосредственно в функции настройки компонента Vue (например, в `<script setup>`) или в плагине.

Она будет иметь эффект только при вызове на сервере, и не будет включена в сборку клиента.

## Параметры

- `callback`: Функция, которая будет превращена в строку и вставлена в HTML. Она не должна иметь никаких внешних зависимостей (например, автоимпортов) или ссылаться на переменные, определенные вне колбэка. Колбэк будет выполняться до инициализации runtime Nuxt, поэтому он не должен зависеть от контекста Nuxt или Vue.

## Пример

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate гарантированно работает до гидратации Nuxt
onPrehydrate(() => {
  console.log(window)
})

// Пока у него есть только один корневой узел, вы можете получить доступ к элементу
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// Для _очень_ продвинутых случаев использования (например, если у вас нет единственного корневого узла) вы
// можете сами получить доступ/установить `data-prehydrate-id`.
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Здравствуйте.
  </div>
</template>
```
