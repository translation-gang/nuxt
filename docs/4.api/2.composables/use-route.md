---
title: "useRoute"
description: "Композабл useRoute возвращает текущий маршрут."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
В шаблоне компонента Vue к маршруту можно обратиться через `$route`.
::

`useRoute` в Nuxt — обёртка над одноимённым композаблом из `vue-router`, дающая доступ к текущему маршруту.

Важное отличие: в Nuxt маршрут обновляется **только после** смены содержимого страницы при навигации. В «голом» `vue-router` маршрут меняется **сразу**, из‑за чего части шаблона, завязанные на метаданные маршрута, могут рассинхронизироваться.

## Пример

Ниже к API обращаются через [`useFetch`](/docs/3.x/api/composables/use-fetch), а динамический параметр страницы `slug` подставляется в URL.

```html [~/pages/[slug\\].vue]
<script setup lang="ts">
const route = useRoute()
const { data: mountain } = await useFetch(`/api/mountains/${route.params.slug}`)
</script>

<template>
  <div>
    <h1>{{ mountain.title }}</h1>
    <p>{{ mountain.description }}</p>
  </div>
</template>
```

Для query-параметров (например, `example` в `/test?example=true`) используйте `useRoute().query`, а не `useRoute().params`.

## API

Помимо динамических сегментов и query `useRoute()` отдаёт реактивные поля текущего маршрута:

- `fullPath`: закодированный URL с путём, строкой запроса и хэшем
- `hash`: декодированная часть URL после `#`
- `query`: параметры строки запроса
- `matched`: массив нормализованных записей маршрута, совпавших с текущим URL
- `meta`: пользовательские данные записи маршрута
- `name`: уникальное имя записи маршрута
- `path`: закодированная pathname-часть URL
- `redirectedFrom`: маршрут, к которому обращались до перехода на текущий

## Типичные ошибки

### Рассинхронизация маршрута

Используйте `useRoute()` из Nuxt, а не импорт из `vue-router`, иначе при навигации возможны рассинхроны.

```ts twoslash
// ❌ не импортируйте `useRoute` из `vue-router`
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ композабл `useRoute` из Nuxt
import { useRoute } from '#app'
```

### Вызов `useRoute` в middleware

В middleware лучше не вызывать `useRoute`: там нет устойчивого понятия «текущего маршрута». `useRoute()` рассчитан на `setup` компонента или на Nuxt-плагин.

::warning
То же относится к любым композаблам, которые внутри используют `useRoute()`.
::

::read-more{to="/docs/3.x/directory-structure/middleware"}
Подробнее о доступе к маршруту в разделе про middleware.
::

### Гидратация и `route.fullPath`

Браузеры не отправляют на сервер [фрагменты URL](https://url.spec.whatwg.org/#concept-url-fragment) (например, `#foo`). Если `route.fullPath` влияет на шаблон, возможны расхождения при гидратации: фрагмент есть на клиенте и отсутствует в SSR.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/RouteLocationNormalizedLoaded.html"}
