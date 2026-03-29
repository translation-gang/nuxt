---
title: 'useRouteAnnouncer'
description: 'Отслеживание смены заголовка страницы и обновление сообщения для объявления маршрута.'
navigation:
  badge: Новое
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.12+.
::

## Описание

Композабл следит за изменением заголовка страницы и обновляет текст объявления маршрута. Его использует [`<NuxtRouteAnnouncer>`](/docs/3.x/api/components/nuxt-route-announcer); поведение настраивается через этот композабл.

Подписка идёт на хук Unhead [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered): из DOM читается заголовок страницы и задаётся как сообщение объявления.

## Параметры

- `politeness`: срочность объявления для программ чтения с экрана: `off` (не объявлять), `polite` (дождаться паузы) или `assertive` (прервать текущее озвучивание). По умолчанию `polite`.

## Свойства

### `message`

- **тип**: `Ref<string>`
- **описание**: текст, который будет объявлен

### `politeness`

- **тип**: `Ref<string>`
- **описание**: режим для программы чтения с экрана: `off`, `polite` или `assertive`

## Методы

### `set(message, politeness = "polite")`

Задаёт сообщение и режим объявления.

### `polite(message)`

Устанавливает сообщение с `politeness = "polite"`.

### `assertive(message)`

Устанавливает сообщение с `politeness = "assertive"`.

## Пример

```vue [pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```
