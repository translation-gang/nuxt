---
title: 'useLoadingIndicator'
description: Композабл даёт доступ к состоянию загрузки страницы приложения.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## Описание

Возвращает состояние загрузки страницы. Используется в [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator) и настраивается вручную.
Подписывается на [`page:loading:start`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) и [`page:loading:end`](/docs/4.x/api/advanced/hooks#app-hooks-runtime).

## Параметры

- `duration`: Длительность полосы загрузки в мс (по умолчанию `2000`).
- `throttle`: Throttle появления и скрытия в мс (по умолчанию `200`).
- `estimatedProgress`: По умолчанию Nuxt замедляется у 100%. Можно передать свою функцию `(duration, elapsed) => 0..100`.

## Свойства

### `isLoading`

- **type**: `Ref<boolean>`
- **description**: Идёт ли загрузка

### `error`

- **type**: `Ref<boolean>`
- **description**: Состояние ошибки

### `progress`

- **type**: `Ref<number>`
- **description**: Прогресс от `0` до `100`

## Методы

### `start()`

`isLoading = true`, рост `progress`. Опция `{ force: true }` — без интервала, сразу показать загрузку.

### `set()`

Задать `progress`. Опция `{ force: true }` — сразу показать загрузку.

### `finish()`

`progress = 100`, остановка таймеров, сброс состояния через `500` мс. `{ force: true }` — без ожидания интервала; `{ error: true }` — цвет ошибки и флаг ошибки.

### `clear()`

Внутри `finish()`. Сбрасывает таймеры и интервалы композабла.

## Пример

```vue
<script setup lang="ts">
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
  estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
})
</script>
```

```vue
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
// как set(0, { force: true }) — прогресс 0 и сразу показать загрузку
start({ force: true })
</script>
```
