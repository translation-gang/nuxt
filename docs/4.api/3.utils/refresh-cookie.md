---
title: "refreshCookie"
description: "Ручное обновление значений useCookie при изменении cookie."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

::important
Утилита доступна с [Nuxt v3.10](/blog/v3-10).
::

## Назначение

`refreshCookie` обновляет значение cookie, возвращаемое `useCookie`.

Используйте, когда в браузере уже установлено новое значение cookie и нужно синхронизировать с ним ref из `useCookie`.

## Использование

```vue [app/app.vue]
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { /** ... */ }) // Sets `token` cookie on response
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>
```

::note{to="/docs/4.x/guide/going-further/experimental-features#cookiestore"}
С [Nuxt v3.12.0](https://github.com/nuxt/nuxt/releases/tag/v3.12.0) экспериментальная опция `cookieStore` включена по умолчанию: значение `useCookie` обновляется при изменении cookie в браузере.
::

## Тип

```ts [Signature]
export function refreshCookie (name: string): void
```
