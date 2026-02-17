---
title: 'useRouteAnnouncer'
description: 'Отслеживает изменение заголовка страницы и обновляет сообщение для скринридеров.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.12+.
::

## Описание

Композабл следит за изменением заголовка страницы и обновляет сообщение для скринридеров. Используется в [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer), поведение настраивается.
Подключается к хуку Unhead `dom:rendered`, читает заголовок страницы и задаёт его как сообщение для озвучивания.

## Параметры

- `politeness`: срочность объявления для скринридера: `off` (выключить), `polite` (дождаться паузы), `assertive` (озвучить сразу). По умолчанию `polite`.

## Свойства

### `message`

- **type**: `Ref<string>`
- **description**: сообщение для озвучивания

### `politeness`

- **type**: `Ref<string>`
- **description**: уровень срочности: `off`, `polite` или `assertive`

## Методы

### `set(message, politeness = "polite")`

Задаёт сообщение и уровень срочности.

### `polite(message)`

Задаёт сообщение с `politeness = "polite"`.

### `assertive(message)`

Задаёт сообщение с `politeness = "assertive"`.

## Пример

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```
