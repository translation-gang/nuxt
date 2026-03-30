---
title: "useError"
description: Композабл useError возвращает глобальную ошибку Nuxt, которая сейчас обрабатывается.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## Использование

`useError` возвращает текущую глобальную ошибку Nuxt на клиенте и сервере — реактивное SSR-friendly состояние.

```ts
const error = useError()
```

Используйте в компонентах, страницах и плагинах для доступа или реакции на ошибку.

## Тип

```ts
interface NuxtError<DataT = unknown> {
  status: number
  statusText: string
  message: string
  data?: DataT
  error?: true
}

export const useError: () => Ref<NuxtError | undefined>
```

## Параметры

Параметров нет.

## Возвращаемые значения

`Ref` с текущей ошибкой Nuxt или `undefined`. Реактивно обновляется при смене состояния ошибки.

## Пример

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Nuxt error:', error.value)
}
</script>
```

:read-more{to="/docs/4.x/getting-started/error-handling"}
