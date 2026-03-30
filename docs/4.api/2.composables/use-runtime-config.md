---
title: 'useRuntimeConfig'
description: 'Доступ к переменным runtime config через композабл useRuntimeConfig.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## Использование

```vue [app/app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## Определение runtime config

Ниже — публичный базовый URL API и секретный токен, доступный только на сервере.

Переменные `runtimeConfig` всегда задаём в `nuxt.config`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // Приватные ключи только на сервере
    apiSecret: '123',

    // Публичные — доступны и клиенту
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
})
```

::note
То, что нужно только на сервере, кладём прямо в `runtimeConfig`. То, что нужно и клиенту, и серверу — в `runtimeConfig.public`.
::

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## Доступ к runtime config

Для доступа используем композабл `useRuntimeConfig()`:

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Публичные переменные
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // Приватная переменная (только на сервере)
      Authorization: `Bearer ${config.apiSecret}`,
    },
  })
  return result
})
```

Здесь `apiBase` в пространстве имён `public` доступен и на сервере, и на клиенте, а `apiSecret` **только на сервере**.

## Переменные окружения

Значения runtime config можно переопределять переменными окружения с префиксом `NUXT_`.

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

### Файл `.env`

Переменные в `.env` доступны при **разработке** и **сборке/generate**.

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
Переменные из `.env` в приложении Nuxt читаются через `process.env` при **разработке** и **сборке/generate**.
::

::warning
В **продакшене во время выполнения** используйте переменные окружения платформы; `.env` не подключается.
::

:read-more{to="/docs/4.x/directory-structure/env"}

## Пространство имён `app`

Nuxt использует `app` в runtime-config с ключами вроде `baseURL` и `cdnURL`. Их можно менять в рантайме через переменные окружения.

::note
Это зарезервированное пространство имён. Не добавляйте в `app` свои ключи.
::

### `app.baseURL`

По умолчанию `baseURL` равен `'/'`.

В рантайме его можно задать переменной окружения `NUXT_APP_BASE_URL`.

Новый базовый URL читается как `config.app.baseURL`:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // baseURL везде одинаковый
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

Пример кастомного CDN и доступа через `useRuntimeConfig()`.

Статику из `.output/public` можно отдавать с CDN, задав `NUXT_APP_CDN_URL`.

URL CDN читается как `config.app.cdnURL`.

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // cdnURL везде одинаковый
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}
