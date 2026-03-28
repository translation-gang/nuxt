---
title: "useError"
description: "Композабл useError возвращает глобальную ошибку Nuxt, которую можно обработать."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/error.ts
    size: xs
---

## Использование

Композабл `useError` возвращает текущую глобальную ошибку Nuxt, которую обрабатывает фреймворк; доступен и на клиенте, и на сервере. Даёт реактивное состояние ошибки по всему приложению, совместимое с SSR.

```ts
const error = useError()
```

Используйте его в компонентах, страницах или плагинах, чтобы читать или реагировать на текущую ошибку Nuxt.

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

## Возвращаемое значение

Возвращает `Ref` с текущей ошибкой Nuxt (или `undefined`, если ошибки нет). Объект ошибки реактивен и обновляется при смене состояния ошибки.

## Пример

```vue
<script setup lang="ts">
const error = useError()

if (error.value) {
  console.error('Ошибка Nuxt:', error.value)
}
</script>
```

:read-more{to="/docs/3.x/getting-started/error-handling"}
