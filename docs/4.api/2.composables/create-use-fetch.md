---
title: 'createUseFetch'
description: Фабричная функция для создания кастомного композабла useFetch с заданными опциями по умолчанию.
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/fetch.ts
    size: xs
---

`createUseFetch` создаёт кастомный композабл [`useFetch`](/docs/4.x/api/composables/use-fetch) с заданными опциями. Результат полностью типизирован и ведёт себя как `useFetch`, но с вашими значениями по умолчанию.

::note
`createUseFetch` — макрос компилятора. Его нужно использовать как **экспортируемое** объявление в каталоге `composables/` (или в любом каталоге, сканируемом компилятором Nuxt). Nuxt автоматически подставляет ключи дедупликации на этапе сборки.
::

## Использование

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
})
```

```vue [app/pages/modules.vue]
<script setup lang="ts">
const { data: modules } = await useAPI('/modules')
</script>
```

Получившийся композабл `useAPI` имеет ту же сигнатуру и тип возврата, что и [`useFetch`](/docs/4.x/api/composables/use-fetch); вызывающий код может использовать или переопределять любые опции.

## Тип

```ts [Signature]
function createUseFetch (
  options?: Partial<UseFetchOptions>,
): typeof useFetch

function createUseFetch (
  options: (callerOptions: UseFetchOptions) => Partial<UseFetchOptions>,
): typeof useFetch
```

## Опции

`createUseFetch` принимает те же опции, что и [`useFetch`](/docs/4.x/api/composables/use-fetch#parameters): `baseURL`, `headers`, `query`, `onRequest`, `onResponse`, `server`, `lazy`, `transform`, `getCachedData` и другие.

Полный список опций см. в [документации useFetch](/docs/4.x/api/composables/use-fetch#parameters).

## Режим по умолчанию и режим переопределения

### Режим по умолчанию (обычный объект)

При передаче обычного объекта опции фабрики выступают как **значения по умолчанию**. Вызывающий код может переопределить любую опцию:

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  baseURL: 'https://api.nuxt.com',
  lazy: true,
})
```

```ts
// Используется baseURL по умолчанию
const { data } = await useAPI('/modules')

// Вызывающий переопределяет baseURL
const { data } = await useAPI('/modules', { baseURL: 'https://other-api.com' })
```

### Режим переопределения (функция)

При передаче функции опции фабрики **переопределяют** опции вызывающего. Функция получает опции вызывающего аргументом, так что по ним можно вычислить свои переопределения:

```ts [app/composables/useAPI.ts]
// baseURL всегда задаётся фабрикой, независимо от того, что передал вызывающий
export const useAPI = createUseFetch(callerOptions => ({
  baseURL: 'https://api.nuxt.com',
}))
```

Это удобно для жёсткой настройки заголовков авторизации или базового URL, которые не должны меняться вызывающим кодом.

## Совместное использование с кастомным `$fetch`

В `createUseFetch` можно передать кастомный экземпляр `$fetch`:

```ts [app/composables/useAPI.ts]
export const useAPI = createUseFetch({
  $fetch: useNuxtApp().$api as typeof $fetch,
})
```

:read-more{to="/docs/4.x/guide/recipes/custom-usefetch"}

:read-more{to="/docs/4.x/api/composables/use-fetch"}
