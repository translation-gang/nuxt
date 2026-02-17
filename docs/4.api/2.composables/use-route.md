---
title: "useRoute"
description: "Компосабл useRoute возвращает текущий маршрут."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

::note
В шаблоне Vue-компонента к маршруту можно обращаться через `$route`.
::

Компосабл `useRoute` — обёртка над одноимённым компосаблом из `vue-router`, дающая доступ к текущему маршруту в приложении Nuxt.

Важное отличие: в Nuxt маршрут обновляется **только после** смены контента страницы при навигации. В `vue-router` маршрут обновляется **сразу**, что может приводить к рассинхронизации частей шаблона, зависящих от метаданных маршрута.

## Пример

В примере ниже вызывается API через [`useFetch`](/docs/4.x/api/composables/use-fetch) с динамическим параметром страницы `slug` в URL.

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

Для доступа к query-параметрам (например, `example` в пути `/test?example=true`) используйте `useRoute().query` вместо `useRoute().params`.

## API

Помимо динамических и query-параметров, `useRoute()` предоставляет вычисляемые ссылки:

- `fullPath`: закодированный URL текущего маршрута (path, query, hash)
- `hash`: декодированный фрагмент URL после #
- `query`: query-параметры маршрута
- `matched`: массив совпавших маршрутов для текущей локации
- `meta`: пользовательские данные записи
- `name`: уникальное имя записи маршрута
- `path`: закодированный pathname URL
- `redirectedFrom`: локация, с которой произошло перенаправление на текущую

## Типичные ошибки

### Рассинхронизация маршрута

Важно использовать компосабл `useRoute()` из Nuxt, а не из `vue-router`, чтобы избежать рассинхронизации при навигации. Импорт `useRoute` из `vue-router` обходит реализацию Nuxt.

```ts twoslash
// ❌ не используйте useRoute из vue-router
// @errors: 2300
import { useRoute } from 'vue-router'
// ✅ используйте компосабл useRoute из Nuxt
import { useRoute } from '#app'
```

### Вызов useRoute в middleware

Использовать `useRoute` в middleware не рекомендуется — это может привести к неожиданному поведению. В middleware нет понятия «текущий маршрут». Компосабл `useRoute()` предназначен для setup-функции Vue-компонента или Nuxt-плагина.

::warning
То же касается любого компосабла, который внутри использует `useRoute()`.
::

::read-more{to="/docs/4.x/directory-structure/app/middleware"}
Подробнее о доступе к маршруту в middleware.
::

### Гидратация и route.fullPath

Браузеры не отправляют [фрагменты URL](https://url.spec.whatwg.org/#concept-url-fragment) (например `#foo`) в запросе. Использование `route.fullPath` в шаблоне может вызвать ошибки гидратации: на клиенте фрагмент будет, на сервере — нет.

:read-more{icon="i-simple-icons-vuedotjs" to="https://router.vuejs.org/api/type-aliases/routelocationnormalizedloaded"}
