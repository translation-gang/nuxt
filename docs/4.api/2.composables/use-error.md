---
title: "useError"
description: композабл useError возвращает глобальную ошибку Nuxt, которая может быть обработана.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## Использование

Композабл `useError` возвращает глобальную ошибку Nuxt, которая обрабатывается в данный момент. Доступен на клиенте и сервере, даёт реактивное состояние ошибки, совместимое с SSR.

```ts
const error = useError()
```

Используйте в компонентах, страницах или плагинах, чтобы читать или реагировать на текущую ошибку Nuxt.

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

Композабл не принимает параметров.

## Возвращаемые значения

`Ref` с текущей ошибкой Nuxt (или `undefined`, если ошибки нет). Объект ошибки реактивный и обновляется при изменении состояния.

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
