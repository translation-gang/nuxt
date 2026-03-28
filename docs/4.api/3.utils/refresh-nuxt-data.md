---
title: 'refreshNuxtData'
description: Повторно загружает все или выбранные экземпляры asyncData в Nuxt.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`refreshNuxtData` повторно запрашивает все или указанные экземпляры `asyncData`, в том числе созданные через [`useAsyncData`](/docs/3.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/3.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/3.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/3.x/api/composables/use-lazy-fetch).

::note
Если компонент кэшируется `<KeepAlive>` и переходит в неактивное состояние, `asyncData` внутри него всё равно будет перезапрашиваться, пока компонент не размонтирован.
::

## Тип

```ts
refreshNuxtData(keys?: string | string[])
```

## Параметры

* `keys`: одна строка или массив строк — ключи данных для обновления. Параметр **необязательный**. Если ключи не указаны, заново запрашиваются все данные из [`useAsyncData`](/docs/3.x/api/composables/use-async-data) и [`useFetch`](/docs/3.x/api/composables/use-fetch).

## Возвращаемое значение

`refreshNuxtData` возвращает промис, который выполнится, когда все или выбранные экземпляры `asyncData` будут обновлены.

## Примеры

### Обновление всех данных

Ниже — обновление всех данных, загруженных через `useAsyncData` и `useFetch` в приложении Nuxt.

```vue [pages/some-page.vue]
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
    <button :disabled="refreshing" @click="refreshAll">
      Обновить все данные
    </button>
  </div>
</template>
```

### Обновление определенных данных

В приведённом ниже примере обновляются только те данные, ключ которых совпадает с `count` и `user`.

```vue [pages/some-page.vue]
<script setup lang="ts">
const refreshing = ref(false)

async function refresh () {
  refreshing.value = true
  try {
    // можно передать массив ключей, чтобы обновить несколько наборов данных
    await refreshNuxtData(['count', 'user'])
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div v-if="refreshing">
    Загрузка
  </div>
  <button @click="refresh">Обновить</button>
</template>
```

::note
Если у вас есть доступ к экземпляру `asyncData`, предпочтительнее вызывать его методы `refresh` или `execute` для повторной загрузки данных.
::

:read-more{to="/docs/3.x/getting-started/data-fetching"}
