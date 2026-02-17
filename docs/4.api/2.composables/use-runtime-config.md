---
title: 'useRuntimeConfig'
description: 'Доступ к переменным runtime-конфига через компосабл useRuntimeConfig.'
links:
  - label: Source
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

## Определение runtime-конфига

В примере ниже задаётся публичный базовый URL API и секретный токен, доступный только на сервере.

Переменные `runtimeConfig` нужно задавать в `nuxt.config`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // Секретные ключи доступны только на сервере
    apiSecret: '123',

    // Публичные ключи доступны на клиенте
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
})
```

::note
Переменные, доступные только на сервере, задаются в `runtimeConfig`. Переменные для клиента и сервера — в `runtimeConfig.public`.
::

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

## Доступ к runtime-конфигу

Для доступа используйте компосабл `useRuntimeConfig()`:

```ts [server/api/test.ts]
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Доступ к публичным переменным
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // Секретная переменная (только на сервере)
      Authorization: `Bearer ${config.apiSecret}`,
    },
  })
  return result
})
```

В этом примере `apiBase` из пространства `public` доступен на сервере и клиенте, а `apiSecret` **только на сервере**.

## Переменные окружения

Значения runtime-конфига можно переопределить переменными окружения с префиксом `NUXT_`.

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}

### Файл `.env`

Переменные в `.env` доступны при **разработке** и **сборке/генерации**.

```ini [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
Переменные из `.env` доступны в приложении Nuxt через `process.env` при **разработке** и **сборке/генерации**.
::

::warning
В **production runtime** используйте переменные окружения платформы; `.env` не используется.
::

:read-more{to="/docs/4.x/directory-structure/env"}

## Пространство имён `app`

В runtime-конфиге Nuxt использует пространство `app` с ключами `baseURL` и `cdnURL`. Их можно переопределить через переменные окружения.

::note
Это зарезервированное пространство; не добавляйте в него свои ключи.
::

### `app.baseURL`

По умолчанию `baseURL` — `'/'`.

Изменить можно через переменную окружения `NUXT_APP_BASE_URL`. Значение доступно как `config.app.baseURL`:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // baseURL доступен везде
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

Пример настройки своего CDN-URL и доступа через `useRuntimeConfig()`.

Для раздачи статики из `.output/public` через свой CDN используйте переменную `NUXT_APP_CDN_URL`. URL доступен как `config.app.cdnURL`.

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // cdnURL доступен везде
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/4.x/guide/going-further/runtime-config"}
