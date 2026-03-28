---
title: "useRoute"
description: "Текущий маршрут через композабл useRoute."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
В шаблоне компонента Vue к маршруту можно обратиться через `$route`.
::

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

Для доступа к query-параметрам маршрута (например, `example` в `/test?example=true`) используйте `useRoute().query`, а не `useRoute().params`.

## Поля маршрута

Помимо динамических сегментов и query-параметров `useRoute()` отдаёт реактивные поля текущего маршрута:

- `fullPath`: закодированный URL с путём, строкой запроса и хэшем
- `hash`: декодированная часть URL после `#`
- `query`: параметры строки запроса
- `matched`: массив нормализованных записей маршрута, совпавших с текущим URL
- `meta`: пользовательские данные записи маршрута
- `name`: уникальное имя записи маршрута
- `path`: закодированная pathname-часть URL
- `redirectedFrom`: маршрут, к которому обращались до перехода на текущий

::note
Браузеры не отправляют на сервер [фрагменты URL](https://url.spec.whatwg.org/#concept-url-fragment) (например, `#foo`). Из‑за этого `route.fullPath` в шаблоне может расходиться при гидратации: на клиенте в нём будет фрагмент, на сервере — нет.
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/RouteLocationNormalizedLoaded.html"}
