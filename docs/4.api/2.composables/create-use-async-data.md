---
title: 'createUseAsyncData'
description: Фабричная функция для создания кастомного композабла useAsyncData с заданными опциями по умолчанию.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

`createUseAsyncData` создаёт кастомный композабл [`useAsyncData`](/docs/4.x/api/composables/use-async-data) с заданными опциями. Результат полностью типизирован и ведёт себя как `useAsyncData`, но с вашими значениями по умолчанию.

::note
`createUseAsyncData` — макрос компилятора. Его нужно использовать как **экспортируемое** объявление в каталоге `composables/` (или в любом каталоге, сканируемом компилятором Nuxt). Nuxt автоматически подставляет ключи дедупликации на этапе сборки.
::

## Использование

```ts [app/composables/useCachedData.ts]
export const useCachedData = createUseAsyncData({
  getCachedData (key, nuxtApp) {
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
  },
})
```

```vue [app/pages/index.vue]
<script setup lang="ts">
const { data: mountains } = await useCachedData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains'),
)
</script>
```

Получившийся композабл имеет ту же сигнатуру и тип возврата, что и [`useAsyncData`](/docs/4.x/api/composables/use-async-data); вызывающий код может использовать или переопределять любые опции.

## Тип

```ts [Signature]
function createUseAsyncData (
  options?: Partial<AsyncDataOptions>,
): typeof useAsyncData

function createUseAsyncData (
  options: (callerOptions: AsyncDataOptions) => Partial<AsyncDataOptions>,
): typeof useAsyncData
```

## Опции

`createUseAsyncData` принимает те же опции, что и [`useAsyncData`](/docs/4.x/api/composables/use-async-data#params): `server`, `lazy`, `immediate`, `default`, `transform`, `pick`, `getCachedData`, `deep`, `dedupe`, `timeout`, `watch` и другие.

Полный список опций см. в [документации useAsyncData](/docs/4.x/api/composables/use-async-data#params).

## Режим по умолчанию и режим переопределения

### Режим по умолчанию (обычный объект)

При передаче обычного объекта опции фабрики выступают как **значения по умолчанию**. Вызывающий код может переопределить любую опцию:

```ts [app/composables/useLazyData.ts]
export const useLazyData = createUseAsyncData({
  lazy: true,
  server: false,
})
```

```ts
// Используются значения по умолчанию (lazy: true, server: false)
const { data } = await useLazyData('key', () => fetchSomeData())

// Вызывающий переопределяет server в true
const { data } = await useLazyData('key', () => fetchSomeData(), { server: true })
```

### Режим переопределения (функция)

При передаче функции опции фабрики **переопределяют** опции вызывающего. Функция получает опции вызывающего аргументом:

```ts [app/composables/useStrictData.ts]
// deep всегда принудительно false
export const useStrictData = createUseAsyncData(callerOptions => ({
  deep: false,
}))
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-async-data"}
