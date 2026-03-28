---
title: 'useRuntimeConfig'
description: 'Доступ к переменным runtime-конфигурации через композабл useRuntimeConfig.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

## Использование

```vue [app.vue]
<script setup lang="ts">
const config = useRuntimeConfig()
</script>
```

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
})
```

:read-more{to="/docs/3.x/guide/going-further/runtime-config"}

## Определение runtime-конфигурации

Ниже заданы публичный базовый URL API и секретный токен, доступный только на сервере.

Переменные `runtimeConfig` задаются в `nuxt.config`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // Только на сервере
    apiSecret: '123',

    // Доступно и на клиенте
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
Секреты и значения, доступные только на сервере, объявляйте на верхнем уровне `runtimeConfig`. То, что должно быть доступно и в браузере, — внутри `runtimeConfig.public`.
::

:read-more{to="/docs/3.x/guide/going-further/runtime-config"}

## Чтение runtime-конфигурации

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Публичные поля
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // Секрет только на сервере
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
})
```

Здесь `apiBase` из `public` виден и на сервере, и на клиенте, а `apiSecret` — **только на сервере**.

## Переменные окружения

Значения `runtimeConfig` можно переопределять переменными окружения с префиксом `NUXT_`.

:read-more{to="/docs/3.x/guide/going-further/runtime-config"}

### Файл `.env`

Переменные из `.env` подхватываются при **разработке** и **сборке/prerender**.

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
Переменные из `.env` доступны в Nuxt при разработке и сборке через `process.env`.
::

::warning
В **продакшене** на сервере используйте переменные окружения платформы; файл `.env` обычно не подключается.
::

:read-more{to="/docs/3.x/directory-structure/env"}

## Пространство имён `app`

Nuxt резервирует `runtimeConfig.app` с полями вроде `baseURL` и `cdnURL`. Их можно задать через переменные окружения.

::note
Это зарезервированное пространство имён: не добавляйте в `app` собственные ключи.
::

### `app.baseURL`

По умолчанию `baseURL` равен `'/'`.

Его можно изменить в рантайме через `NUXT_APP_BASE_URL`, затем читать как `config.app.baseURL`:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

Чтобы отдавать статику из `.output/public` через свой CDN, задайте `NUXT_APP_CDN_URL` и читайте `config.app.cdnURL`:

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/3.x/guide/going-further/runtime-config"}
