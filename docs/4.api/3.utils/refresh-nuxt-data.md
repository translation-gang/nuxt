---
title: 'refreshNuxtData'
description: Повторно загрузить все или выбранные экземпляры asyncData в Nuxt
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData` повторно запрашивает все или указанные экземпляры `asyncData`, в том числе из [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch).  

::note
Если компонент закэширован `<KeepAlive>` и в состоянии deactivated, `asyncData` внутри него всё равно будет перезапрашиваться, пока компонент не размонтирован.
::

## Тип

```ts [Signature]
export function refreshNuxtData (keys?: string | string[])
```

## Параметры

* `keys`: одна строка или массив строк — ключи данных. Параметр **необязателен**. Без `keys` перезапрашиваются все ключи [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`useFetch`](/docs/4.x/api/composables/use-fetch).

## Возвращаемое значение

`refreshNuxtData` возвращает промис, который резолвится, когда указанные (или все) экземпляры `asyncData` обновлены.

## Примеры

### Обновить все данные

Пример обновляет все данные, полученные через `useAsyncData` и `useFetch` в приложении.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refreshAll () {
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
    <button
      :disabled="refreshing"
      @click="refreshAll"
    >
      Refetch All Data
    </button>
  </div>
</template>
```

### Обновить выбранные данные

Обновляются только данные с ключами `count` и `user`.

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // you could also pass an array of keys to refresh multiple data
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    Loading
  </div>
  <button @click="refresh">
    Refresh
  </button>
</template>
```

::note
Если есть доступ к экземпляру `asyncData`, предпочтительнее вызывать его методы `refresh` или `execute`.
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}
