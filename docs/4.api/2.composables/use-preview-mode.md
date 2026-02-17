---
title: "usePreviewMode"
description: "Проверка и управление режимом предпросмотра в Nuxt."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

Режим предпросмотра позволяет видеть, как изменения будут выглядеть на «боевом» сайте, не показывая их пользователям.

Встроенный композабл `usePreviewMode` даёт доступ к состоянию предпросмотра и управление им. При включённом режиме он принудительно обновляет данные [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`useFetch`](/docs/4.x/api/composables/use-fetch) для перерисовки контента предпросмотра.

```ts
const { enabled, state } = usePreviewMode()
```

## Опции

### Своя проверка включения (`enable`)

Можно задать собственное условие включения режима. По умолчанию режим включается при наличии в URL параметра `preview=true` (например, `http://localhost:3000?preview=true`). Можно обернуть `usePreviewMode` в свой композабл для единообразия и избежания ошибок.

```ts
export function useMyPreviewMode () {
  const route = useRoute()
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    },
  })
}
```

### Изменение состояния по умолчанию

`usePreviewMode` сохраняет в state значение параметра `token` из URL. Состояние можно расширить через `getState`; оно будет доступно во всех вызовах [`usePreviewMode`](/docs/4.x/api/composables/use-preview-mode).

```ts
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  },
})
```

::note
Функция `getState` дополняет текущее состояние возвращёнными значениями — не перезаписывайте важные поля по ошибке.
::

### Колбэки `onEnable` и `onDisable`

По умолчанию при включении режима вызывается `refreshNuxtData()` для повторной загрузки данных с сервера. При выключении композабл подписывается на следующую навигацию и затем вызывает `refreshNuxtData()`.

Собственные колбэки задаются опциями `onEnable` и `onDisable`.

```ts
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('режим предпросмотра включён')
  },
  onDisable: () => {
    console.log('режим предпросмотра выключен')
  },
})
```

## Пример

Страница, часть контента которой показывается только в режиме предпросмотра:

```vue [app/pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token,
  },
})
</script>

<template>
  <div>
    Базовый контент
    <p v-if="enabled">
      Только для предпросмотра: {{ state.token }}
      <br>
      <button @click="enabled = false">
        выключить режим предпросмотра
      </button>
    </p>
  </div>
</template>
```

Сборка и запуск предпросмотра:

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

Страницу предпросмотра можно открыть, добавив к URL параметр `preview`, например `http://localhost:3000/?preview=true`.

::note
`usePreviewMode` проверяйте локально через `nuxt generate` и затем `nuxt preview`, а не через `nuxt dev`. (Команда [preview](/docs/4.x/api/commands/preview) не связана с режимом предпросмотра.)
::
