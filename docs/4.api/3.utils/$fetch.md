---
title: "$fetch"
description: Глобальная вспомогательная функция $fetch для HTTP-запросов на базе ofetch в приложениях Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/entry.ts
    size: xs
---

Nuxt использует [ofetch](https://github.com/unjs/ofetch) и предоставляет глобально доступную вспомогательную функцию `$fetch` для выполнения HTTP-запросов в приложении Vue или в маршрутах API.

::tip{icon="i-lucide-rocket"}
При SSR вызов `$fetch` к внутренним [API-маршрутам](/docs/3.x/directory-structure/server) напрямую вызывает соответствующий обработчик (эмуляция запроса), **без лишнего HTTP-запроса**.
::

::note{color="blue" icon="i-lucide-info"}
Если в компонентах вызывать `$fetch` без обёртки [`useAsyncData`](/docs/3.x/api/composables/use-async-data), данные запрашиваются дважды: сначала на сервере, затем снова на клиенте при гидратации — `$fetch` не переносит состояние с сервера на клиент, поэтому клиент вынужден загрузить данные заново.
::

## Использование

Для предотвращения двойного извлечения данных при получении данных компонента мы рекомендуем использовать [`useFetch`](/docs/3.x/api/composables/use-fetch) или [`useAsyncData`](/docs/3.x/api/composables/use-async-data) + `$fetch`.

```vue [app.vue]
<script setup lang="ts">
// Во время SSR данные извлекаются дважды, один раз на сервере и один раз на клиенте.
const dataTwice = await $fetch('/api/item')

// Во время SSR данные извлекаются только на сервере и передаются клиенту.
const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// Можно также использовать useFetch как сокращённый вариант useAsyncData + $fetch
const { data } = await useFetch('/api/item')
</script>
```

:read-more{to="/docs/3.x/getting-started/data-fetching"}

Вы можете использовать `$fetch` в любых методах, которые выполняются только на клиенте.

```vue [pages/contact.vue]
<script setup lang="ts">
async function contactForm() {
  await $fetch('/api/contact', {
    method: 'POST',
    body: { hello: 'world '}
  })
}
</script>

<template>
  <button @click="contactForm">Отправить</button>
</template>
```

::tip
`$fetch` является предпочтительным способом выполнения HTTP-запросов в Nuxt, в отличие от [@nuxt/http](https://github.com/nuxt/http) и [@nuxtjs/axios](https://github.com/nuxt-community/axios-module), которые были созданы для Nuxt 2.
::

::note
Если вы используете `$fetch` для вызова (внешнего) HTTPS URL-адреса с самоподписанным сертификатом в разработке, вам необходимо установить `NODE_TLS_REJECT_UNAUTHORIZED=0` в своей среде.
::

### Заголовки и cookie

В браузере при вызове `$fetch` пользовательские заголовки (в том числе `cookie`) уходят к API как обычно.

При SSR из соображений безопасности (**подделка серверных запросов, SSRF**, **недопустимое использование аутентификации**) `$fetch` по умолчанию не подставляет cookie из браузера пользователя и не пробрасывает cookie из ответа.

::code-group

```vue [pages/index.vue]
<script setup lang="ts">
// при SSR заголовки и cookie не пробрасываются
const { data } = await useAsyncData(() => $fetch('/api/cookies'))
</script>
```

```ts [server/api/cookies.ts]
export default defineEventHandler((event) => {
  const foo = getCookie(event, 'foo')
  // ... работа с cookie
})
```
::

Чтобы на сервере пробросить заголовки и cookie, передайте их явно:

```vue [pages/index.vue]
<script setup lang="ts">
// проброс пользовательских заголовков и cookie в `/api/cookies`
const requestFetch = useRequestFetch()
const { data } = await useAsyncData(() => requestFetch('/api/cookies'))
</script>
```

При вызове `useFetch` с относительным URL на сервере Nuxt использует [`useRequestFetch`](/docs/3.x/api/composables/use-request-fetch) для проксирования заголовков и cookie (кроме тех, что не следует пересылать, например `host`).
