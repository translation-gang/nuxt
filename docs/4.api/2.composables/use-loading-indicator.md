---
title: 'useLoadingIndicator'
description: 'Доступ к состоянию загрузки страницы приложения.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## Описание

Композабл возвращает состояние загрузки страницы. Используется в [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator), поведение настраивается.
Подписывается на [`page:loading:start`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) и [`page:loading:end`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) и обновляет состояние.

## Параметры

- `duration`: длительность полосы загрузки в миллисекундах (по умолчанию `2000`).
- `throttle`: задержка появления и скрытия в миллисекундах (по умолчанию `200`).
- `estimatedProgress`: по умолчанию Nuxt замедляет рост при приближении к 100%. Можно передать свою функцию `(duration, elapsed) => 0..100` для расчёта прогресса.

## Свойства

### `isLoading`

- **type**: `Ref<boolean>`
- **description**: идёт ли загрузка

### `error`

- **type**: `Ref<boolean>`
- **description**: произошла ли ошибка

### `progress`

- **type**: `Ref<number>`
- **description**: прогресс от `0` до `100`

## Методы

### `start()`

Устанавливает `isLoading` в `true` и начинает увеличивать `progress`. Опция `{ force: true }` — показать индикатор сразу, без задержки.

### `set()`

Задаёт `progress` конкретным значением. Опция `{ force: true }` — показать состояние сразу.

### `finish()`

Ставит `progress` в `100`, останавливает таймеры и через 500 ms сбрасывает состояние. Опции: `{ force: true }` — сбросить без задержки; `{ error: true }` — подсветить полосу как ошибку и установить `error` в `true`.

### `clear()`

Вызывается из `finish()`. Очищает все таймеры и интервалы композабла.

## Пример

```vue
<script setup lang="ts">
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
  // расчёт прогресса по умолчанию
  estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
})
</script>
```

```vue
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
// то же, что set(0, { force: true }) — прогресс 0 и показ индикатора сразу
start({ force: true })
</script>
```
