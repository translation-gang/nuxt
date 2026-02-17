---
title: 'defineLazyHydrationComponent'
description: "Определение компонента с отложенной гидратацией и выбранной стратегией."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent` — компиляторный макрос для создания компонента с выбранной стратегией отложенной гидрации. Гидрация откладывается до появления в viewport или до завершения более важных задач в браузере, что снижает начальную нагрузку, особенно для второстепенных компонентов.

## Использование

### Стратегия Visibility

Гидрация при появлении компонента в viewport.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- гидрация за 100px до появления в viewport -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

Проп `hydrateOnVisible` необязателен; объект настраивает поведение IntersectionObserver.

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="Опции IntersectionObserver"}
Опции для `hydrate-on-visible`.
::

::note
Используется встроенная стратегия Vue [`hydrateOnVisible`](https://vuejs.org/guide/components/async#hydrate-on-visible).
::

### Стратегия Idle

Гидрация в момент простоя браузера. Подходит, когда компонент нужен как можно раньше, но не должен блокировать критический путь рендера.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- гидрация при простое браузера или через 2000 ms -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

Проп `hydrateOnIdle` необязателен; положительное число задаёт максимальную задержку в миллисекундах.

::note
Используется встроенная стратегия Vue [`hydrateOnIdle`](https://vuejs.org/guide/components/async#hydrate-on-idle).
::

### Стратегия Interaction

Гидрация после указанного взаимодействия (клик, наведение и т.д.).

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'interaction',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- гидрация при наведении указателя -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

Проп `hydrateOnInteraction` необязателен. Без списка событий по умолчанию: `pointerenter`, `click`, `focus`.

::note
Используется встроенная стратегия Vue [`hydrateOnInteraction`](https://vuejs.org/guide/components/async#hydrate-on-interaction).
::

### Стратегия Media Query

Гидрация при совпадении окна с media query.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'mediaQuery',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- гидрация при ширине окна >= 768px -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
Используется встроенная стратегия Vue [`hydrateOnMediaQuery`](https://vuejs.org/guide/components/async#hydrate-on-media-query).
::

### Стратегия Time

Гидрация через заданную задержку в миллисекундах.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- гидрация через 1000 ms -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

### Стратегия If

Гидрация по булевому условию.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue'),
)

const isReady = ref(false)

function myFunction () {
  // Запуск своей стратегии гидрации...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- гидрация при isReady === true -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

Подходит для компонентов, которым гидрация может не понадобиться.

### Never (без гидрации)

Компонент не гидратируется.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'never',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <LazyHydrationMyComponent />
  </div>
</template>
```

### Событие гидрации

Компоненты с отложенной гидрацией эмитят событие `@hydrated` при гидрации.

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
Чтобы макрос корректно распознавался компилятором, не используйте внешние переменные. Такой код макрос не распознает:

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
- **Обязательный**: да

| Стратегия    | Описание |
|--------------|----------|
| `visible`    | Гидрация при появлении в viewport. |
| `idle`       | Гидрация при простое браузера или после задержки. |
| `interaction`| Гидрация при взаимодействии (клик, наведение). |
| `mediaQuery` | Гидрация при выполнении media query. |
| `if`         | Гидрация по булевому условию. |
| `time`       | Гидрация через заданную задержку. |
| `never`      | Vue не гидратирует компонент. |

### `source`

- **Тип**: `() => Promise<Component>`
- **Обязательный**: да
