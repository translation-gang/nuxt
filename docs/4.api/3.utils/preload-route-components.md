---
title: 'preloadRouteComponents'
description: Функция preloadRouteComponents позволяет вручную предзагрузить компоненты отдельных страниц в приложении Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

Предзагрузка маршрутов подгружает компоненты заданного маршрута, к которому пользователь может перейти позже. Так компоненты оказываются доступны раньше и реже блокируют навигацию, что улучшает производительность.

::tip{icon="i-lucide-rocket"}
Nuxt уже автоматически предзагружает нужные маршруты, если вы используете компонент `NuxtLink`.
::

:read-more{to="/docs/3.x/api/components/nuxt-link"}

## Пример

Предзагрузите маршрут при использовании `navigateTo`.

```ts
// we don't await this async function, to avoid blocking rendering
// this component's setup function
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}
```

:read-more{to="/docs/3.x/api/utils/navigate-to"}

::note
На сервере `preloadRouteComponents` не имеет эффекта.
::
