---
title: 'useRouteAnnouncer'
description: Композабл отслеживает смену заголовка страницы и обновляет сообщение для screen reader.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
Доступен в Nuxt v3.12+.
::

## Описание

Отслеживает смену заголовка страницы и обновляет объявление. Используется в [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) и настраивается вручную.
Подключается к хуку Unhead `dom:rendered`, читает заголовок и задаёт текст объявления.

## Параметры

- `politeness`: срочность для screen reader: `off` (без объявления), `polite` (дождаться паузы), `assertive` (прервать сразу). По умолчанию `polite`.

## Свойства

### `message`

- **type**: `Ref<string>`
- **description**: Текст для объявления

### `politeness`

- **type**: `Ref<string>`
- **description**: Уровень срочности: `off`, `polite` или `assertive`

## Методы

### `set(message, politeness = "polite")`

Задаёт сообщение и уровень срочности.

### `polite(message)`

Сообщение с `politeness = "polite"`

### `assertive(message)`

Сообщение с `politeness = "assertive"`

## Пример

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```

::callout
Для динамических изменений внутри страницы (валидация форм, тосты, загрузка) используйте [`useAnnouncer`](/docs/4.x/api/composables/use-announcer).
::
