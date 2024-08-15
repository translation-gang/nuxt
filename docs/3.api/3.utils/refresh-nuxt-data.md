---
title: 'refreshNuxtData'
description: refreshNuxtData заново получает все данные с сервера и обновляет страницу.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`refreshNuxtData` повторно получает все данные с сервера и обновляет страницу, а также аннулирует кэш [`useAsyncData`](/docs/api/composables/use-async-data), `useLazyAsyncData`, [`useFetch`](/docs/api/composables/use-fetch) и `useLazyFetch`.
::

## Тип

```ts
refreshNuxtData(keys?: string | string[])
```

**Параметры:**

* `keys`:

    **Тип**: `String | String[]`

    `refreshNuxtData` принимает одиночную строку или массив строк в качестве `ключей`, которые используются для получения данных. Этот параметр является **опциональным**. Все [`useAsyncData`](/docs/api/composables/use-async-data) и [`useFetch`](/docs/api/composables/use-fetch) будут повторно получены, если не указаны `ключи`.

## Обновление всех данных

Приведенный ниже пример обновляет все данные, получаемые с помощью [`useAsyncData`](/docs/api/composables/use-async-data) и [`useFetch`](/docs/api/composables/use-fetch) на текущей странице.

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button :disabled="refreshing" @click="refreshAll">
      Обновить все данные
    </button>
  </div>
</template>
```

## Обновление определенных данных

В приведенном ниже примере обновляются только те данные, ключ которых совпадает с `count`.

```vue [pages/some-page.vue]
<script setup lang="ts">
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))
const refresh = () => refreshNuxtData('count')
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Загрузка' : count }}
  </div>
  <button @click="refresh">Обновить</button>
</template>
```

:read-more{to="/docs/getting-started/data-fetching"}
