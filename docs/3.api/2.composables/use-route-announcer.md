---
title: 'useRouteAnnouncer'
description: Этот композабл отслеживает изменения заголовка страницы и соответствующим образом обновляет сообщение объявителя.
navigation:
  badge: Новое
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
Данный композэбл доступен в Nuxt v3.12+.
::

## Описание

Композубл, который отслеживает изменения заголовка страницы и соответственно обновляет сообщение объявителя. Используется [`<NuxtRouteAnnouncer>`](/docs/api/components/nuxt-route-announcer) и может быть управляемым. Он подключается к Unhead [`dom:rendered`](https://unhead.unjs.io/api/core/hooks#dom-hooks), чтобы прочитать заголовок страницы и установить его в качестве сообщения объявителя.

## Параметры

- `politeness`: Устанавливает степень срочности для объявлений программы чтения с экрана: `off` (отключение объявления), `polite` (ожидание тишины) или `assertive` (немедленное прерывание).  (по умолчанию `polite`).

## Свойства

### `message`

- **тип**: `Ref<string>`
- **описание**: Сообщение, которое нужно объявить

### `politeness`

- **тип**: `Ref<string>`
- **описание**: Уровень срочности объявления считывателя экрана `off`, `polite` или `assertive`

## Методы

### `set(message, politeness = "polite")`

Устанавливает сообщение для объявления с уровнем срочности.

### `polite(message)`

Устанавливает сообщение с `politeness = "polite"`

### `assertive(message)`

Устанавливает сообщение с `politeness = "assertive"`

## Пример

```ts
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>
```
