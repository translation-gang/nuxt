---
title: "usePreviewMode"
description: "Используйте usePreviewMode для проверки и управления режимом предварительного просмотра в Nuxt"
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

Режим предварительного просмотра позволяет увидеть, как ваши изменения будут отображаться на живом сайте, не раскрывая их пользователям.

Вы можете использовать встроенный композабл `usePreviewMode` для доступа и управления состоянием предварительного просмотра в Nuxt. Если композабл обнаружит режим предварительного просмотра, он автоматически принудительно выполнит все обновления, необходимые для [`useAsyncData`](/docs/api/composables/use-async-data) и [`useFetch`](/docs/api/composables/use-fetch) для рендеринга содержимого предварительного просмотра.

```js
const { enabled, state } = usePreviewMode()
```

## Параметры

### Пользовательская проверка `enable`

Вы можете указать собственный способ включения режима предварительного просмотра. По умолчанию композабл `usePreviewMode` будет включать режим предварительного просмотра, если в URL-адресе есть параметр `preview`, равный `true` (например, `http://localhost:3000?preview=true`). Вы можете обернуть `usePreviewMode` в пользовательский композабл,  чтобы обеспечить согласованность опций при использовании и предотвратить любые ошибки.

```js
export function useMyPreviewMode () {
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    }
  });
}
```

### Изменение состояния по умолчанию

`usePreviewMode` попытается сохранить значение параметра `token` из URL-адреса в state. Вы можете изменить это состояние, и оно будет доступно для всех вызовов [`usePreviewMode`](/docs/api/composables/use-preview-mode).

```js
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})
```

::note
Функция `getState` будет добавлять возвращаемые значения к текущему состоянию, поэтому будьте осторожны, чтобы случайно не переписать важное состояние.
::

## Пример

В приведенном ниже примере создается страница, на которой часть содержимого рендерится только в режиме предварительного просмотра.

```vue [pages/some-page.vue]
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token
  }
})
</script>

<template>
  <div>
    Некоторое базовое содержимое
    <p v-if="enabled">
      Только предварительный просмотр содержимого: {{ state.token }}
      <br>
      <button @click="enabled = false">
        отключение режима предварительного просмотра
      </button>
    </p>
  </div>
</template>
```

Теперь вы можете сгенерировать свой сайт и обслуживать его:

```bash [Terminal]
npx nuxi generate
npx nuxi preview
```

Затем вы можете увидеть страницу предварительного просмотра, добавив параметр запроса `preview` в конец страницы, которую вы хотите просмотреть один раз:

```js
?preview=true
```

::note
`usePreviewMode` следует тестировать локально с помощью `nuxi generate`, затем `nuxi preview`, а не `nuxi dev`. ([Команда preview](/docs/api/commands/preview) не имеет отношения к режиму предварительного просмотра).
::
