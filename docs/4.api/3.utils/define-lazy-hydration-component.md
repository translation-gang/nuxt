---
title: 'defineLazyHydrationComponent'
description: 'Определяет компонент с отложенной гидратацией и заданной стратегией.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent` — макрос компилятора, который помогает создать компонент с выбранной стратегией отложенной гидратации. Отложенная гидратация откладывает гидратацию до появления компонента в области просмотра или пока браузер не завершит более критичные задачи. Это заметно снижает стоимость первого рендера, особенно для некритичных компонентов.

## Использование

### Стратегия видимости

Гидратирует компонент, когда он попадает в область просмотра.

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
      Гидратация запустится, когда элемент(ы)
      окажется в 100px от границы области просмотра.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

Проп `hydrateOnVisible` необязателен. Можно передать объект, чтобы настроить поведение `IntersectionObserver` под капотом.

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="Параметры IntersectionObserver"}
Подробнее о параметрах для `hydrate-on-visible`.
::

::note
Внутри используется встроенная в Vue стратегия [`hydrateOnVisible`](https://vuejs.org/guide/components/async.html#hydrate-on-visible).
::

### Стратегия простоя

Гидратирует компонент, когда браузер простаивает. Подходит, если компонент нужно загрузить как можно раньше, но без блокировки критического пути рендеринга.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Гидратация запустится в простое браузера или через 2000 мс. -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

Проп `hydrateOnIdle` необязателен. Можно передать положительное число как максимальный таймаут.

Стратегия `idle` — для компонентов, которые можно гидратировать в период простоя браузера.

::note
Внутри используется встроенная в Vue стратегия [`hydrateOnIdle`](https://vuejs.org/guide/components/async.html#hydrate-on-idle).
::

### Стратегия взаимодействия

Гидратирует компонент после указанного взаимодействия (например, клик, наведение).

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
      Гидратация запустится при наведении
      указателя на элемент(ы).
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

Проп `hydrateOnInteraction` необязателен. Если не передать событие или список событий, по умолчанию гидратация на `pointerenter`, `click` и `focus`.

::note
Внутри используется встроенная в Vue стратегия [`hydrateOnInteraction`](https://vuejs.org/guide/components/async.html#hydrate-on-interaction).
::

### Стратегия медиазапроса

Гидратирует компонент, когда окно соответствует media query.

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
      Гидратация запустится, когда
      ширина окна не меньше 768px.
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
Внутри используется встроенная в Vue стратегия [`hydrateOnMediaQuery`](https://vuejs.org/guide/components/async.html#hydrate-on-media-query).
::

### Стратегия по времени

Гидратирует компонент после задержки (в миллисекундах).

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Гидратация через 1000 мс. -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

Стратегия `time` — для компонентов, которые могут подождать фиксированное время.

### Стратегия по условию

Гидратирует компонент в зависимости от логического условия.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue'),
)

const isReady = ref(false)

function myFunction () {
  // Запуск пользовательской стратегии гидратации...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- Гидратация при isReady === true. -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

Стратегия `if` удобна, если компонент не всегда должен гидратироваться.

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
    <!-- Vue не будет гидратировать этот компонент. -->
    <LazyHydrationMyComponent />
  </div>
</template>
```

### Событие гидратации

Все компоненты с отложенной гидратацией эмитят событие `@hydrated`, когда гидратация завершена.

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)

function onHydrate () {
  console.log('Компонент гидратирован!')
}
</script>

<template>
  <div>
    <LazyHydrationMyComponent
      :hydrate-on-visible="{ rootMargin: '100px' }"
      @hydrated="onHydrate"
    />
  </div>
</template>
```

## Параметры

::warning
Чтобы компилятор корректно распознал макрос, не подставляйте внешние переменные. Такой вариант помешает распознаванию макроса:

```vue
<script setup lang="ts">
const strategy = 'visible'
const source = () => import('./components/MyComponent.vue')
const LazyHydrationMyComponent = defineLazyHydrationComponent(strategy, source)
</script>
```
::

### `strategy`

- **тип**: `'visible' | 'idle' | 'interaction' | 'mediaQuery' | 'if' | 'time' | 'never'`
- **обязательный**: `true`

| Стратегия      | Описание |
|----------------|----------|
| `visible`      | Гидратация при появлении компонента в области просмотра. |
| `idle`         | Гидратация в простое браузера или после задержки. |
| `interaction`  | Гидратация при взаимодействии пользователя (клик, наведение и т.д.). |
| `mediaQuery`   | Гидратация при выполнении указанного media query. |
| `if`           | Гидратация при истинности заданного логического условия. |
| `time`         | Гидратация после указанной задержки по времени. |
| `never`        | Vue не гидратирует компонент. |

### `source`

- **тип**: `() => Promise<Component>`
- **обязательный**: `true`
