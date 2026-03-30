---
title: "useRoute"
description: Композабл useRoute возвращает текущий маршрут.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
В шаблоне компонента маршрут доступен как `$route`.
::

`useRoute` в Nuxt — обёртка над одноимённым композаблом из `vue-router` для доступа к текущему маршруту.

Отличие: в Nuxt маршрут обновляется **только после** смены содержимого страницы. В `vue-router` маршрут обновляется **сразу**, что может рассинхронизировать части шаблона, зависящие от метаданных маршрута.

## Пример

Вызов API через [`useFetch`](/docs/4.x/api/composables/use-fetch) с динамическим параметром страницы `slug` в URL.

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

Для query-параметров (например `example` в `/test?example=true`) используйте `useRoute().query`, а не `useRoute().params`.

## API

Помимо динамических и query-параметров, `useRoute()` даёт вычисляемые ссылки, связанные с текущим маршрутом:

- `fullPath`: закодированный URL (path, query, hash)
- `hash`: декодированный фрагмент после `#`
- `query`: query-параметры
- `matched`: массив совпавших нормализованных маршрутов
- `meta`: пользовательские данные записи
- `name`: уникальное имя записи маршрута
- `path`: закодированный pathname
- `redirectedFrom`: куда пытались перейти до текущего маршрута

## Типичные проблемы

### Рассинхронизация маршрута

Используйте `useRoute()` из Nuxt, а не из `vue-router`, чтобы избежать рассинхронизации при навигации.
Прямой импорт `useRoute` из `vue-router` обходит реализацию Nuxt.

```ts twoslash
// ❌ не используйте `useRoute` из `vue-router`
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ композабл `useRoute` из Nuxt
import { useRoute } from '#app'
```

### Вызов `useRoute` в middleware

В middleware `useRoute` не рекомендуется — поведение может быть неожиданным.
Там нет понятия «текущего маршрута».
`useRoute()` — только в `setup` компонента или в плагине Nuxt.

::warning
То же для любого композабла, который внутри вызывает `useRoute()`.
::

::read-more{to="/docs/4.x/directory-structure/app/middleware"}
Подробнее о доступе к маршруту в разделе про middleware.
::

### Гидратация и `route.fullPath`

Браузер не отправляет [фрагменты URL](https://url.spec.whatwg.org/#concept-url-fragment) (например `#foo`) в запросах. Использование `route.fullPath` в шаблоне может вызвать проблемы гидратации: на клиенте будет фрагмент, на сервере — нет.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
