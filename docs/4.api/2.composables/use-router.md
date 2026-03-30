---
title: "useRouter"
description: "Композабл useRouter возвращает экземпляр роутера."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [app/pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

Если экземпляр роутера нужен только в шаблоне, используйте `$router`:

```vue [app/pages/index.vue]
<template>
  <button @click="$router.back()">
    Back
  </button>
</template>
```

При наличии каталога `app/pages/` поведение `useRouter` совпадает с `vue-router`.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Properties-currentRoute-" target="_blank"}
Документация `vue-router` об интерфейсе `Router`.
::

## Базовые операции

- [`addRoute()`](https://router.vuejs.org/api/interfaces/router#addRoute-): добавить маршрут. Можно передать `parentName`, чтобы добавить дочерний маршрут.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/router#removeRoute-): удалить маршрут по имени.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/router#getRoutes-): полный список записей маршрутов.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/router#hasRoute-): проверить, есть ли маршрут с данным именем.
- [`resolve()`](https://router.vuejs.org/api/interfaces/router#resolve-): нормализованное расположение маршрута, включая `href` с учётом base.

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` добавляет маршрут в массив — удобно в [плагинах Nuxt](/docs/4.x/directory-structure/app/plugins); `router.push()` сразу запускает навигацию — удобно на страницах, в компонентах и композаблах.
::

## На основе History API

- [`back()`](https://router.vuejs.org/api/interfaces/router#back-): назад в истории, как `router.go(-1)`.
- [`forward()`](https://router.vuejs.org/api/interfaces/router#forward-): вперёд, как `router.go(1)`.
- [`go()`](https://router.vuejs.org/api/interfaces/router#go-): шаг по истории без ограничений `back`/`forward`.
- [`push()`](https://router.vuejs.org/api/interfaces/router#push-): навигация с записью в стек. **Лучше использовать [`navigateTo`](/docs/4.x/api/utils/navigate-to).**
- [`replace()`](https://router.vuejs.org/api/interfaces/router#replace-): навигация с заменой текущей записи. **Лучше использовать [`navigateTo`](/docs/4.x/api/utils/navigate-to).**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
Подробнее об History API в браузере.
::

## Навигационные хуки

У `useRouter` есть `afterEach`, `beforeEach` и `beforeResolve` как хуки навигации.

В Nuxt есть **route middleware** — проще и удобнее для типичных сценариев.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

## Промисы и ошибки

- [`isReady()`](https://router.vuejs.org/api/interfaces/router#isReady-): промис, который выполнится после начальной навигации.
- [`onError`](https://router.vuejs.org/api/interfaces/router#onError-): обработчик необработанных ошибок навигации.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Methods-" title="Vue Router Docs" target="_blank"}

## Универсальный экземпляр роутера

Без папки `app/pages/` [`useRouter`](/docs/4.x/api/composables/use-router) возвращает универсальный экземпляр с похожими методами; не все возможности могут совпадать с `vue-router`.
