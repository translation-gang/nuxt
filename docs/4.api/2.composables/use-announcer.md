---
title: 'useAnnouncer'
description: Композабл для озвучивания сообщений программами чтения с экрана.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/announcer.ts
    size: xs
---

::important
Композабл доступен в Nuxt v3.17+.
::

## Описание

Композабл для озвучивания программ чтения с экрана при изменении контента. В отличие от [`useRouteAnnouncer`](/docs/api/composables/use-route-announcer), который автоматически озвучивает смену маршрута, `useAnnouncer` даёт ручной контроль над тем, что и когда озвучивать.

Подходит для обновлений на странице: валидация форм, асинхронные операции, уведомления и изменения контента в реальном времени.

## Параметры

- `politeness`: срочность озвучивания: `off` (отключить), `polite` (дождаться паузы), `assertive` (озвучить сразу). (по умолчанию `polite`)

## Свойства

### `message`

- **type**: `Ref<string>`
- **description**: Текущее сообщение для озвучивания

### `politeness`

- **type**: `Ref<'polite' | 'assertive' | 'off'>`
- **description**: Уровень срочности озвучивания

## Методы

### `set(message, politeness = "polite")`

Задаёт сообщение для озвучивания и уровень срочности.

### `polite(message)`

Задаёт сообщение с `politeness = "polite"`. Используйте для некритичных обновлений, когда можно дождаться окончания текущего озвучивания.

### `assertive(message)`

Задаёт сообщение с `politeness = "assertive"`. Используйте для срочных обновлений, которые должны озвучиваться сразу.

## Пример

```vue [app/pages/contact.vue]
<script setup lang="ts">
const { polite, assertive } = useAnnouncer()

async function submitForm () {
  try {
    await $fetch('/api/contact', { method: 'POST', body: formData })
    polite('Сообщение успешно отправлено')
  } catch (error) {
    assertive('Ошибка: не удалось отправить сообщение')
  }
}
</script>
```

## Сценарии использования

### Валидация формы

```vue [app/components/LoginForm.vue]
<script setup lang="ts">
const { assertive } = useAnnouncer()

function validateForm () {
  const errors = []
  if (!email.value) { errors.push('Укажите email') }
  if (!password.value) { errors.push('Укажите пароль') }

  if (errors.length) {
    assertive(`В форме ${errors.length} ошибок: ${errors.join(', ')}`)
    return false
  }
  return true
}
</script>
```

### Состояния загрузки

```vue [app/pages/dashboard.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const { data, status } = await useFetch('/api/data')

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    polite('Загрузка данных...')
  } else if (newStatus === 'success') {
    polite('Данные загружены')
  }
})
</script>
```

### Результаты поиска

```vue [app/components/Search.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const results = ref([])

watch(results, (newResults) => {
  polite(`Найдено результатов: ${newResults.length}`)
})
</script>
```

::callout
Чтобы сообщения попадали в DOM, в приложении должен быть добавлен компонент [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer).
::

::callout
Для автоматического озвучивания смены маршрута/страницы используйте [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer) вместе с компонентом [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer).
::
