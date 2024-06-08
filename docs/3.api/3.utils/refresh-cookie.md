---
title: "refreshCookie"
description: "Обновляйте значения useCookie вручную, когда cookie изменились"
navigation:
  badge: Новое
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
Эта утилита доступна с [Nuxt v3.10](/blog/v3-10).
::

## Назначение

Функция `refreshCookie` предназначена для обновления значения куки, возвращаемой функцией `useCookie`.

Это полезно для обновления ref-ссылки `useCookie`, когда мы знаем, что новое значение cookie было установлено в браузере.

## Использование

```vue [app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // Устанавливает cookie `token` в ответ на запрос
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/guide/going-further/experimental-features#cookiestore"}
Вы можете включить экспериментальную опцию `cookieStore`, чтобы автоматически обновлять значение `useCookie` при изменении cookie в браузере.
::

## Тип

```ts
refreshCookie(name: string): void
```
