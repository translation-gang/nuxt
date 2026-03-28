---
title: "usePreviewMode"
description: "Используйте usePreviewMode для проверки и управления режимом предварительного просмотра в Nuxt"
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preview.ts
    size: xs
---

# `usePreviewMode`

Режим предварительного просмотра позволяет увидеть, как ваши изменения будут отображаться на живом сайте, не раскрывая их пользователям.

Вы можете использовать встроенный композабл `usePreviewMode` для доступа и управления состоянием предварительного просмотра в Nuxt. Если композабл обнаружит режим предварительного просмотра, он автоматически принудительно выполнит все обновления, нужные [`useAsyncData`](/docs/3.x/api/composables/use-async-data) и [`useFetch`](/docs/3.x/api/composables/use-fetch), чтобы отрисовать содержимое предпросмотра.

```js
const { enabled, state } = usePreviewMode()
```

## Параметры

### Пользовательская проверка `enable`

Можно задать свой критерий включения предпросмотра. По умолчанию режим включается, если в URL есть `preview=true` (например, `http://localhost:3000?preview=true`). Имеет смысл вынести вызов `usePreviewMode` в свой композабл с фиксированными опциями — так проще не ошибиться в настройках.

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

`usePreviewMode` попытается сохранить значение параметра `token` из URL-адреса в state. Вы можете изменить это состояние, и оно будет доступно для всех вызовов [`usePreviewMode`](/docs/3.x/api/composables/use-preview-mode).

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

### Пользовательские коллбэки `onEnable` и `onDisable`

По умолчанию при включении `usePreviewMode` вызывается `refreshNuxtData()`, чтобы заново запросить все данные с сервера.

Когда режим предпросмотра отключается, композабл ставит коллбэк: `refreshNuxtData()` выполнится после следующей навигации маршрутизатора.

Можно задать свои функции в опциях `onEnable` и `onDisable`:

```js
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('режим предпросмотра включён')
  },
  onDisable: () => {
    console.log('режим предпросмотра выключен')
  }
})
```

## Пример

В приведённом ниже примере создаётся страница, на которой часть содержимого рендерится только в режиме предварительного просмотра.

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

```bash [Терминал]
npx nuxt generate
npx nuxt preview
```

Затем вы можете увидеть страницу предварительного просмотра, добавив параметр запроса `preview` в конец страницы, которую вы хотите просмотреть один раз:

```js
?preview=true
```

::note
`usePreviewMode` следует тестировать локально с помощью `nuxt generate`, затем `nuxt preview`, а не `nuxt dev`. ([Команда preview](/docs/3.x/api/commands/preview) не имеет отношения к режиму предварительного просмотра).
::
