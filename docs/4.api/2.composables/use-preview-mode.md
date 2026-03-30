---
title: "usePreviewMode"
description: "usePreviewMode проверяет и управляет режимом предпросмотра в Nuxt"
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

Режим предпросмотра показывает изменения на «живом» сайте без показа их обычным пользователям.

Встроенный `usePreviewMode` даёт доступ к состоянию предпросмотра и управляет им. При активном режиме принудительно обновляются [`useAsyncData`](/docs/4.x/api/composables/use-async-data) и [`useFetch`](/docs/4.x/api/composables/use-fetch), чтобы перерисовать контент предпросмотра.

```ts
const { enabled, state } = usePreviewMode()
```

## Опции

### Своя проверка `enable`

Можно задать свой способ включения предпросмотра. По умолчанию режим включается, если в URL есть параметр `preview` со значением `true` (например `http://localhost:3000?preview=true`). Оберните `usePreviewMode` в свой композабл, чтобы опции были единообразны.

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

`usePreviewMode` по умолчанию кладёт в state значение параметра `token` из URL. Состояние можно менять — оно будет общим для всех вызовов [`usePreviewMode`](/docs/4.x/api/composables/use-preview-mode).

```ts
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  },
})
```

::note
`getState` дополняет текущее state возвращаемыми полями — не перезаписывайте случайно важные данные.
::

### Свои колбэки `onEnable` и `onDisable`

По умолчанию при включении вызывается `refreshNuxtData()` для повторной загрузки данных.

При выключении вешается колбэк: после следующей навигации роутера снова вызовется `refreshNuxtData()`.

Можно задать свои функции в `onEnable` и `onDisable`.

```ts
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('preview mode has been enabled')
  },
  onDisable: () => {
    console.log('preview mode has been disabled')
  },
})
```

## Пример

Часть контента только в режиме предпросмотра:

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
    Some base content
    <p v-if="enabled">
      Only preview content: {{ state.token }}
      <br>
      <button @click="enabled = false">
        disable preview mode
      </button>
    </p>
  </div>
</template>
```

Сборка и локальный просмотр:

```bash [Terminal]
npx nuxt generate
npx nuxt preview
```

Страницу предпросмотра откройте с параметром `preview`, например `http://localhost:3000/?preview=true`.

::note
`usePreviewMode` лучше проверять через `nuxt generate` и `nuxt preview`, а не `nuxt dev`. ([Команда preview](/docs/4.x/api/commands/preview) не связана с режимом предпросмотра.)
::
