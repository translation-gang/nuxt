---
title: "useRouter"
description: "Экземпляр роутера через композабл useRouter."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

В шаблоне для того же достаточно `$router`:

```vue [pages/index.vue]
<template>
  <button @click="$router.back()">
    Назад
  </button>
</template>
```

Если в проекте есть каталог `pages/`, поведение `useRouter` совпадает с экземпляром из `vue-router`.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Properties-currentRoute" target="_blank"}
Подробнее об интерфейсе `Router` в документации Vue Router.
::

## Работа с таблицей маршрутов

- [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): добавляет маршрут; через `parentName` можно вложить дочерний маршрут.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): удаляет маршрут по имени.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): возвращает все записи маршрутов.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): проверяет наличие маршрута с заданным именем.
- [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): нормализованное представление локации; в результате есть `href` с учётом `base`.

```ts [Пример]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` дополняет конфигурацию маршрутов и удобен в [плагинах Nuxt](/docs/3.x/directory-structure/plugins). `router.push()` сразу запускает навигацию — его чаще используют в страницах, компонентах и композаблах.
::

## Интерфейс History браузера

- [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): шаг назад по истории, аналог `router.go(-1)`.
- [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): шаг вперёд, аналог `router.go(1)`.
- [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): произвольный сдвиг по истории.
- [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): переход с новой записью в истории. **Предпочтительнее [`navigateTo`](/docs/3.x/api/utils/navigate-to).**
- [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): переход с заменой текущей записи. **Предпочтительнее [`navigateTo`](/docs/3.x/api/utils/navigate-to).**

```ts [Пример]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
Подробнее об интерфейсе History — в MDN.
::

## Навигационные хуки

У `useRouter` есть `afterEach`, `beforeEach` и `beforeResolve` для перехвата навигации.

В Nuxt проще опираться на **middleware маршрутов** — отдельный механизм защиты маршрутов, удобнее в повседневной разработке.

:read-more{to="/docs/3.x/directory-structure/middleware"}

## Промисы и ошибки

- [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): промис, который выполняется после первой навигации.
- [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): обработчик неперехваченных ошибок навигации.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/Router.html#Methods" title="Документация Vue Router" target="_blank"}

## Универсальный роутер без `pages/`

Без каталога `pages/` [`useRouter`](/docs/3.x/api/composables/use-router) возвращает универсальный экземпляр с похожим API; не все методы ведут себя так же, как в полноценном `vue-router`.
