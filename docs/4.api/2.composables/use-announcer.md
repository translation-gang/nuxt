---
title: 'useAnnouncer'
description: Композабл для объявлений в screen reader.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/announcer.ts
    size: xs
---

::important
Доступен в Nuxt v3.17+.
::

## Описание

Объявляет динамические изменения контента для screen reader. В отличие от [`useRouteAnnouncer`](/docs/api/composables/use-route-announcer), который объявляет смену маршрута, `useAnnouncer` даёт ручной контроль над текстом и моментом объявления.

Для обновлений на странице: валидация форм, асинхронные операции, тосты, живой контент.

## Параметры

- `politeness`: срочность по умолчанию: `off`, `polite` или `assertive`. По умолчанию `polite`.

## Свойства

### `message`

- **type**: `Ref<string>`
- **description**: Текущее сообщение для объявления

### `politeness`

- **type**: `Ref<'polite' | 'assertive' | 'off'>`
- **description**: Уровень срочности объявления

## Методы

### `set(message, politeness = "polite")`

Сообщение и уровень срочности.

### `polite(message)`

С `politeness = "polite"`. Для некритичных обновлений, когда можно дождаться окончания текущей речи.

### `assertive(message)`

С `politeness = "assertive"`. Для срочных обновлений с немедленным прерыванием.

## Пример

```vue [app/pages/contact.vue]
<script setup lang="ts">
const { polite, assertive } = useAnnouncer()

async function submitForm () {
  try {
    await $fetch('/api/contact', { method: 'POST', body: formData })
    polite('Message sent successfully')
  } catch (error) {
    assertive('Error: Failed to send message')
  }
}
</script>
```

## Сценарии

### Валидация формы

```vue [app/components/LoginForm.vue]
<script setup lang="ts">
const { assertive } = useAnnouncer()

function validateForm () {
  const errors = []
  if (!email.value) { errors.push('Email is required') }
  if (!password.value) { errors.push('Password is required') }

  if (errors.length) {
    assertive(`Form has ${errors.length} errors: ${errors.join(', ')}`)
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
    polite('Loading data...')
  } else if (newStatus === 'success') {
    polite('Data loaded successfully')
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
  polite(`Found ${newResults.length} results`)
})
</script>
```

::callout
Добавьте в приложение компонент [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer), чтобы объявления попадали в DOM.
::

::callout
Для автоматических объявлений смены маршрута/страницы используйте [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer) и [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer).
::
