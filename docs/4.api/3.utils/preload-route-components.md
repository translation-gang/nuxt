---
title: 'preloadRouteComponents'
description: preloadRouteComponents вручную предзагружает компоненты отдельных страниц в приложении Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

Предзагрузка маршрута подгружает компоненты маршрута, к которому пользователь может перейти позже. Они готовятся раньше и реже задерживают навигацию.

::tip{icon="i-lucide-rocket"}
Nuxt уже автоматически предзагружает нужные маршруты при использовании компонента `NuxtLink`.
::

:read-more{to="/docs/4.x/api/components/nuxt-link"}

## Пример

Предзагрузка маршрута при использовании `navigateTo`.

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

:read-more{to="/docs/4.x/api/utils/navigate-to"}

::note
На сервере `preloadRouteComponents` не действует.
::
