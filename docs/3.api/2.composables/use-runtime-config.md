---
title: 'useRuntimeConfig'
description: 'Доступ к переменным runtime конфигурации с помощью композабла useRuntimeConfig.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
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

:read-more{to="/docs/guide/going-further/runtime-config"}

## Определение runtime конфигурации

В примере ниже показано, как задать публичный базовый URL-адрес API и секретный API-токен, доступный только на сервере.

Мы всегда должны определять переменные `runtimeConfig` внутри `nuxt.config`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    // Приватные ключи доступны только на сервере
    apiSecret: '123',

    // Публичные ключи, которые доступны для клиента
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
```

::note
Переменные, которые должны быть доступны на сервере, добавляются непосредственно в `runtimeConfig`. Переменные, которые должны быть доступны как на клиенте, так и на сервере, определяются в `runtimeConfig.public`.
::

:read-more{to="/docs/guide/going-further/runtime-config"}

## Доступ к runtime конфигурации

Чтобы получить доступ к runtime конфигурации, мы можем использовать композабл `useRuntimeConfig()`:

```ts [server/api/test.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // Доступ к публичным переменным
  const result = await $fetch(`/test`, {
    baseURL: config.public.apiBase,
    headers: {
      // Доступ к приватной переменной (доступна только на сервере)
      Authorization: `Bearer ${config.apiSecret}`
    }
  })
  return result
}
```

В данном примере, поскольку `apiBase` определен в пространстве имен `public`, он универсально доступен как на стороне сервера, так и на стороне клиента, в то время как `apiSecret` **доступен только на стороне сервера**.

## Переменные окружения

Можно обновлять значения runtime конфигурации, используя соответствующее имя переменной окружения с префиксом `NUXT_`.

:read-more{to="/docs/guide/going-further/runtime-config"}

### Использование файла `.env`

Мы можем задать переменные окружения в файле `.env`, чтобы они были доступны во время **разработки** и **сборки/генерации**.

``` [.env]
NUXT_PUBLIC_API_BASE = "https://api.localhost:5555"
NUXT_API_SECRET = "123"
```

::note
Любые переменные окружения, установленные в файле `.env` доступны с помощью `process.env` в приложении Nuxt во время **разработки** and **сборки/генерации**.
::

::warning
В **продакшен runtime**, следует использовать переменные окружения платформы, а `.env` не используется.
::

:read-more{to="/docs/guide/directory-structure/env"}

## Пространство имен `app`

Nuxt использует пространство имен `app` в runtime конфигурации с ключами, включая `baseURL` и `cdnURL`. Вы можете настроить их значения во время выполнения программы, установив переменные окружения.

::note
Это зарезервированное пространство имен. Не следует вводить дополнительные ключи внутри `app`.
::

### `app.baseURL`

По умолчанию `baseURL` имеет значение `'/'`.

Однако `baseURL` можно обновить во время runtime, установив `NUXT_APP_BASE_URL` в качестве переменной окружения.

Затем вы можете получить доступ к этому новому базовому URL с помощью `config.app.baseURL`:

```ts [/plugins/my-plugin.ts]
export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()

  // Универсальный доступ к базовому URL
  const baseURL = config.app.baseURL
})
```

### `app.cdnURL`

В этом примере показано, как задать пользовательский CDN url и получить к нему доступ с помощью `useRuntimeConfig()`.

Вы можете использовать пользовательский CDN для обслуживания статических ассетов внутри `.output/public`, используя переменную окружения `NUXT_APP_CDN_URL`.

И затем получите доступ к новому CDN url с помощью `config.app.cdnURL`.

```ts [server/api/foo.ts]
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)

  // Универсальный доступ к cdnURL
  const cdnURL = config.app.cdnURL
})
```

:read-more{to="/docs/guide/going-further/runtime-config"}
