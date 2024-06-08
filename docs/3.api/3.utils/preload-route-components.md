---
title: 'preloadRouteComponents'
description: preloadRouteComponents позволяет вам вручную предзагружать отдельные страницы в вашем приложении Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

Предварительная загрузка маршрутов загружает компоненты заданного маршрута, к которому пользователь может перейти в будущем. Это гарантирует, что компоненты будут доступны раньше и менее вероятно, что они заблокируют навигацию, улучшая производительность.

::tip{icon="i-ph-rocket-launch-duotone" color="gray"}
Nuxt уже автоматически предзагружает необходимые маршруты, если вы используете компонент `NuxtLink`.
::

:read-more{to="/docs/api/components/nuxt-link"}

## Пример

Предварительная загрузка маршрута при использовании `navigateTo`.

```ts
// мы не ожидаем эту асинхронную функцию, чтобы избежать блокировки рендеринга
// setup-функцией этого компонента
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/api/utils/navigate-to"}

::note
На сервере `preloadRouteComponents` не будет иметь никакого эффекта.
::
