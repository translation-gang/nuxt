---
title: 'useLoadingIndicator'
description: "Доступ к состоянию индикатора загрузки страницы приложения."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## Описание

Композабл возвращает состояние индикатора загрузки страницы. Им пользуется [`<NuxtLoadingIndicator>`](/docs/3.x/api/components/nuxt-loading-indicator); состоянием можно управлять из кода.
Он реагирует на хуки [`page:loading:start`](/docs/3.x/api/advanced/hooks#app-hooks-runtime) и [`page:loading:end`](/docs/3.x/api/advanced/hooks#app-hooks-runtime).

## Параметры

- `duration`: длительность анимации полосы в миллисекундах (по умолчанию `2000`);
- `throttle`: задержка показа и скрытия в миллисекундах (по умолчанию `200`);
- `estimatedProgress`: по умолчанию Nuxt сглаживает рост прогресса к 100%. Можно передать свою функцию `(duration, elapsed) => number` — она получает ту же `duration` и прошедшее время в мс и должна вернуть число от 0 до 100.

## Свойства

### `isLoading`

- **тип:** `Ref<boolean>`
- **описание:** идёт ли сейчас загрузка

### `error`

- **тип:** `Ref<boolean>`
- **описание:** флаг ошибки (см. `finish` с `{ error: true }`)

### `progress`

- **тип:** `Ref<number>`
- **описание:** текущий прогресс от `0` до `100`

## Методы

### `start()`

Установит `isLoading` в `true` и начнёт увеличивать `progress`. У `start` есть опция `{ force: true }`: без интервала сразу показать состояние загрузки.

### `set()`

Задаёт `progress` конкретным значением. У `set` есть опция `{ force: true }`: без интервала сразу показать состояние загрузки.

### `finish()`

Установит значение `progress` в `100`, остановит все таймеры и интервалы, а затем сбросит состояние загрузки на `500` мс позже. `finish` принимает опцию `{ force: true }`, чтобы пропустить интервал до сброса состояния, и `{ error: true }`, чтобы изменить цвет полосы загрузки и установить свойство ошибки в `true`.

### `clear()`

Используется функцией `finish()`. Очищает все таймеры и интервалы, используемые композаблом.

## Пример

```vue
<script setup lang="ts">
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
  // Вот как рассчитывается прогресс по умолчанию:
  estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
})
</script>
```

```vue
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
// то же, что set(0, { force: true })
// progress = 0 и сразу показать загрузку
start({ force: true })
</script>
```
