---
title: "useRouter"
description: "Компосабл useRouter возвращает экземпляр роутера."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

```vue [app/pages/index.vue]
<script setup lang="ts">
const router = useRouter()
</script>
```

Если роутер нужен только в шаблоне, используйте `$router`:

```vue [app/pages/index.vue]
<template>
  <button @click="$router.back()">
    Back
  </button>
</template>
```

При наличии директории `app/pages/` поведение `useRouter` совпадает с `vue-router`.

::read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Properties-currentRoute-" target="_blank"}
Документация vue-router по интерфейсу Router.
::

## Базовые операции

- [`addRoute()`](https://router.vuejs.org/api/interfaces/router#addRoute-): добавить маршрут. Можно указать `parentName`, чтобы добавить дочерний к существующему.
- [`removeRoute()`](https://router.vuejs.org/api/interfaces/router#removeRoute-): удалить маршрут по имени.
- [`getRoutes()`](https://router.vuejs.org/api/interfaces/router#getRoutes-): получить список всех записей маршрутов.
- [`hasRoute()`](https://router.vuejs.org/api/interfaces/router#hasRoute-): проверить наличие маршрута по имени.
- [`resolve()`](https://router.vuejs.org/api/interfaces/router#resolve-): нормализованная версия локации маршрута, включая свойство `href` с учётом base.

```ts [Example]
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })
```

::note
`router.addRoute()` добавляет маршрут в массив и полезен при создании [Nuxt-плагинов](/docs/4.x/directory-structure/app/plugins). `router.push()` сразу выполняет навигацию и удобен на страницах, в компонентах и компосаблах.
::

## History API

- [`back()`](https://router.vuejs.org/api/interfaces/router#back-): назад по истории (аналог `router.go(-1)`).
- [`forward()`](https://router.vuejs.org/api/interfaces/router#forward-): вперёд по истории (аналог `router.go(1)`).
- [`go()`](https://router.vuejs.org/api/interfaces/router#go-): перемещение по истории без ограничений `back()`/`forward()`.
- [`push()`](https://router.vuejs.org/api/interfaces/router#push-): программная навигация с добавлением записи в историю. **Рекомендуется использовать [`navigateTo`](/docs/4.x/api/utils/navigate-to).**
- [`replace()`](https://router.vuejs.org/api/interfaces/router#replace-): программная навигация с заменой текущей записи в истории. **Рекомендуется использовать [`navigateTo`](/docs/4.x/api/utils/navigate-to).**

```ts [Example]
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: '/home' })
router.replace({ hash: '#bio' })
```

::read-more{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/API/History" target="_blank"}
Подробнее о History API в браузере.
::

## Навигационные гарды

Компосабл `useRouter` предоставляет методы `afterEach`, `beforeEach` и `beforeResolve` в качестве навигационных гардов.

В Nuxt для этого удобнее использовать **route middleware**.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

## Промисы и обработка ошибок

- [`isReady()`](https://router.vuejs.org/api/interfaces/router#isReady-): промис, резолвящийся по завершении начальной навигации.
- [`onError`](https://router.vuejs.org/api/interfaces/router#onError-): обработчик ошибок при навигации.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/router#Methods-" title="Vue Router Docs" target="_blank"}

## Универсальный роутер

Если директории `app/pages/` нет, [`useRouter`](/docs/4.x/api/composables/use-router) вернёт универсальный экземпляр роутера с похожими методами; не все возможности могут поддерживаться или вести себя так же, как в `vue-router`.
