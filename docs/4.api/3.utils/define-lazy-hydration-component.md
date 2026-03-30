---
title: 'defineLazyHydrationComponent'
description: 'Определяет компонент с отложенной гидратацией по выбранной стратегии.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent` — компиляторный макрос для создания компонента с заданной стратегией отложенной гидратации. Отложенная гидратация откладывает её до появления компонента в области просмотра или до завершения более критичных задач браузером. Это снижает стоимость первого рендера, особенно для второстепенных компонентов.

## Использование

### Стратегия видимости

Гидратация выполняется, когда компонент попадает во viewport.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is 100px away from entering the viewport.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

Проп `hydrateOnVisible` необязателен. Можно передать объект для настройки `IntersectionObserver` под капотом.

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="IntersectionObserver options"}
Подробнее об опциях для `hydrate-on-visible`.
::

::note
Под капотом используется встроенная в Vue стратегия [`hydrateOnVisible`](https://vuejs.org/guide/components/async#hydrate-on-visible).
::

### Стратегия idle

Гидратация, когда браузер простаивает. Подходит, если компонент нужно подгрузить как можно раньше, но не блокировать критический путь рендера.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Hydration will be triggered when the browser is idle or after 2000ms. -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

Проп `hydrateOnIdle` необязателен. Можно передать положительное число — максимальную задержку в миллисекундах.

Стратегия idle для компонентов, которые можно гидратировать в простое браузера.

::note
Под капотом используется встроенная в Vue стратегия [`hydrateOnIdle`](https://vuejs.org/guide/components/async#hydrate-on-idle).
::

### Стратегия взаимодействия

Гидратация после указанного взаимодействия (например, клик, наведение).

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'interaction',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is hovered over by the pointer.
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

Проп `hydrateOnInteraction` необязателен. Без события или списка событий по умолчанию гидратация на `pointerenter`, `click` и `focus`.

::note
Под капотом используется встроенная в Vue стратегия [`hydrateOnInteraction`](https://vuejs.org/guide/components/async#hydrate-on-interaction).
::

### Стратегия media query

Гидратация, когда окно соответствует media query.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'mediaQuery',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the window width is greater than or equal to 768px.
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
Под капотом используется встроенная в Vue стратегия [`hydrateOnMediaQuery`](https://vuejs.org/guide/components/async#hydrate-on-media-query).
::

### Стратегия по времени

Гидратация после задержки в миллисекундах.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Hydration is triggered after 1000ms. -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

Для компонентов, которым можно подождать фиксированное время.

### Стратегия if

Гидратация по булевому условию.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue'),
)

const isReady = ref(false)

function myFunction () {
  // Trigger custom hydration strategy...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- Hydration is triggered when isReady becomes true. -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

Удобно, если компонент не всегда нужно гидратировать.

### Без гидратации

Компонент никогда не гидратируется.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'never',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- This component will never be hydrated by Vue. -->
    <LazyHydrationMyComponent />
  </div>
</template>
```

### Событие гидратации

Все компоненты с отложенной гидратацией эмитят `@hydrated`, когда гидратация завершена.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)

function onHydrate () {
  console.log('Component has been hydrated!')
}
</script>

<template>
  <div>
    <LazyHydrationMyComponent
      :hydrate-on-visible="{ rootMargin: '100px' }"
      @hydrated="onHydrated"
    />
  </div>
</template>
```

## Параметры

::warning
Чтобы компилятор корректно распознал макрос, не используйте внешние переменные. Такой вариант макрос не распознает:

```vue
<script setup lang="ts">
const strategy = 'visible'
const source = () => import('./components/MyComponent.vue')
const LazyHydrationMyComponent = defineLazyHydrationComponent(strategy, source)
</script>
```
::

### `strategy`

- **Тип**: `'visible' | 'idle' | 'interaction' | 'mediaQuery' | 'if' | 'time' | 'never'`
- **Обязательный**: `true`

| Стратегия     | Описание                                                                 |
|---------------|--------------------------------------------------------------------------|
| `visible`     | Гидратация при появлении компонента во viewport.                         |
| `idle`        | Гидратация в простое браузера или после задержки.                        |
| `interaction` | Гидратация по действию пользователя (клик, наведение и т. д.).          |
| `mediaQuery`  | Гидратация при выполнении заданного media query.                         |
| `if`          | Гидратация при истинности заданного булева условия.                      |
| `time`        | Гидратация после указанной задержки по времени.                          |
| `never`       | Vue не гидратирует компонент.                                            |

### `source`

- **Тип**: `() => Promise<Component>`
- **Обязательный**: `true`
