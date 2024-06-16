---
title: "useRouter"
description: "Композабл useRouter возвращает инстанс маршрутизатора."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

Если вам нужен только инстанс маршрутизатора в вашем шаблоне, используйте `$router`:

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">Back</button>
</template>
```

Если у вас есть директория `pages/`, то `useRouter` по своему поведению идентичен тому, который предоставляется `vue-router`.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
Прочитайте документацию `vue-router` об интерфейсе `Router`.
::

## Основные манипуляции

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): Добавляет новый маршрут в инстанс маршрутизатора. Можно указать `parentName`, чтобы добавить новый маршрут в качестве дочернего для существующего маршрута.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): Удаляет существующий маршрут по его имени.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): Получает полный список всех записей маршрута.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): Проверяет, существует ли маршрут с заданным именем.
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): Возвращает нормализованную версию местоположения маршрута. Также содержит свойство `href`, которое включает любую существующую базу.

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` добавляет детали маршрута в массив маршрутов и полезен при создании [Nuxt плагинов](/docs/guide/directory-structure/plugins), в то время как `router.push()`, напротив, запускает новую навигацию немедленно и полезен в страницах, компонентах Vue и композаблах.
::

## Основано на History API

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): Возвращает назад в history, если это возможно, аналогично `router.go(-1)`.
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): Переходит вперед в history, если это возможно, аналогично `router.go(1)`.
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): Перемещение вперед или назад по hitory без иерархических ограничений, применяемых в `router.back()` и `router.forward()`.
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): Программно переходит к новому URL-адресу, проталкивая запись в history стек. **Вместо этого рекомендуется использовать [`navigateTo`](/docs/api/utils/navigate-to).**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): Программно переходит к новому URL-адресу, заменяя текущую запись в history стеке маршрутов. **Вместо этого рекомендуется использовать [`navigateTo`](/docs/api/utils/navigate-to).**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })
```

::read-more{icon="i-simple-icons-mdnwebdocs" color="gray" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
Узнайте больше о History API браузера.
::

## Навигационные хуки

Композабл `useRouter` предоставляет вспомогательные методы `afterEach`, `beforeEach` и `beforeResolve`, которые используются для обеспечения безопасности навигации.

Однако в Nuxt есть концепция **route middleware**, которая упрощает реализацию навигационной защиты и обеспечивает лучший опыт разработчика.

:read-more{to="/docs/guide/directory-structure/middleware"}

## Промис и обработка ошибок

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): Возвращает промис, который выполняется, когда маршрутизатор завершит первоначальную навигацию.
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): Добавляет обработчик ошибок, который вызывается каждый раз, когда во время навигации возникает не перехваченная ошибка.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Vue Router Docs" target="_blank"}

## Универсальный инстанс маршрутизатора

Если у вас нет папки `pages/`, то [`useRouter`](/docs/api/composables/use-router) вернет универсальный инстанс маршрутизатора с аналогичными вспомогательными методами, но имейте в виду, что не все функции могут поддерживаться или вести себя точно так же, как в `vue-router`.
