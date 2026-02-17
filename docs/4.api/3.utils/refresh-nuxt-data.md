---
title: 'refreshNuxtData'
description: "Обновление всех или выбранных экземпляров asyncData в Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData` перезапрашивает все или указанные экземпляры asyncData из [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch).

::note
Если компонент кэшируется через `<KeepAlive>` и деактивируется, asyncData внутри него всё равно будет перезапрашиваться до размонтирования компонента.
::

## Тип

```ts [Signature]
export function refreshNuxtData (keys?: string | string[])
```

## Параметры

* `keys`: одна строка или массив строк — ключи, по которым загружались данные. Параметр **необязателен**. Без `keys` перезапрашиваются все ключи [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`useFetch`](/docs/4.x/api/composables/use-fetch).

## Возвращаемые значения

`refreshNuxtData` возвращает промис, который резолвится после обновления всех или указанных экземпляров asyncData.

## Примеры

### Обновить все данные

Пример перезапроса всех данных, загружаемых через `useAsyncData` и `useFetch`:

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
      Обновить все данные
    </button>
  </div>
</template>
```

### Обновить выбранные данные

Пример перезапроса только данных с ключами `count` и `user`:

```vue [app/pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    Загрузка…
  </div>
  <button @click="refresh">
    Обновить
  </button>
</template>
```

::note
Если доступен экземпляр asyncData, предпочтительнее вызывать его метод `refresh` или `execute`.
::

:read-more{to="/docs/4.x/getting-started/data-fetching"}
