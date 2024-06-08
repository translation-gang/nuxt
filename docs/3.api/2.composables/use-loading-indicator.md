---
title: 'useLoadingIndicator'
description: Этот композабл дает вам доступ к состоянию загрузки страницы приложения.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## Описание

Композабл, возвращающий состояние загрузки страницы. Используется [`<NuxtLoadingIndicator>`](/docs/api/components/nuxt-loading-indicator) и является управляемым.
Он подключается к событиям [`page:loading:start`](/docs/api/advanced/hooks#app-hooks-runtime) и [`page:loading:end`](/docs/api/advanced/hooks#app-hooks-runtime) для изменения своего состояния.

## Параметры

- `duration`: Длительность полосы загрузки в миллисекундах (по умолчанию `2000`).
- `throttle`: Регулировка отображения и скрытия в миллисекундах (по умолчанию `200`).
- `estimatedProgress`: По умолчанию Nuxt будет уменьшать значение по мере приближения к 100%. Вы можете предоставить пользовательскую функцию для настройки оценки прогресса, которая представляет собой функцию, получающую длительность полосы загрузки (выше) и прошедшее время. Она должна возвращать значение от 0 до 100.

## Свойства

### `isLoading`

- **тип**: `Ref<boolean>`
- **описание**: Состояние загрузки

### `error`

- **тип**: `Ref<boolean>`
- **описание**: Состояние ошибки

### `progress`

- **тип**: `Ref<number>`
- **описание**: Состояние загрузки. От `0` до `100`.

## Методы

### `start()`

Установит `isLoading` в `true` и начнет увеличивать значение `progress`.

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
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>
```
