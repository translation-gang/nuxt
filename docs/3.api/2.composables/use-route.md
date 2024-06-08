---
title: "useRoute"
description: Композабл useRoute возвращает текущий маршрут.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
В шаблоне компонента Vue вы можете получить доступ к маршруту с помощью `$route`.
::

## Пример

В следующем примере мы вызываем API через [`useFetch`](/docs/api/composables/use-fetch), используя динамический параметр страницы - `slug` - как часть URL.

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

Если вам нужно получить доступ к параметрам запроса маршрута (например, `example` в пути `/test?example=true`), то вы можете использовать `useRoute().query` вместо `useRoute().params`.

## API

Помимо динамических параметров и параметров запроса, `useRoute()` также предоставляет следующие вычисляемые ссылки, связанные с текущим маршрутом:

- `fullPath`: кодированный URL, связанный с текущим маршрутом, который содержит путь, запрос и хэш
- `hash`: декодированная секция хэша URL, начинающаяся с #
- `matched`: массив нормализованных совпадающих маршрутов с текущим местоположением маршрута
- `meta`: пользовательские данные, прикрепленные к записи
- `name`: уникальное имя для записи маршрута
- `path`: закодированное имя пути в разделе URL
- `redirectedFrom`: местоположение маршрута, к которому пытались получить доступ, прежде чем попасть в текущее местоположение маршрута

::примечание
Браузеры не отправляют [фрагменты URL](https://url.spec.whatwg.org/#concept-url-fragment) (например, `#foo`) при выполнении запросов. Поэтому использование `route.fullPath` в вашем шаблоне может вызвать проблемы с гидрацией, так как это будет включать фрагмент на клиенте, но не на сервере.
::

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/interfaces/RouteLocationNormalizedLoaded.html"}
