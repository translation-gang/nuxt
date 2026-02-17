---
title: 'useNuxtData'
description: 'Доступ к текущему закэшированному значению компосаблов загрузки данных.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` даёт доступ к текущему закэшированному значению [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch) по явно заданному ключу.
::

## Использование

Композабл `useNuxtData` возвращает закэшированные данные композаблов загрузки (`useAsyncData`, `useLazyAsyncData`, `useFetch`, `useLazyFetch`) по ключу, с которым они были запрошены.

Удобно для повторного использования уже загруженных данных, оптимистичных обновлений UI и каскадного обновления данных.

Ключ при вызове `useNuxtData` должен совпадать с ключом, переданным в композабл загрузки.

:video-accordion{title="Видео LearnVue про useNuxtData" videoId="e-_u6swXRWk"}

## Параметры

- `key`: уникальный ключ закэшированных данных (тот же, что при вызове useFetch/useAsyncData и т.д.).

## Возвращаемые значения

- `data`: реактивный ref с закэшированными данными по ключу. Если кэша нет — `null`. Обновляется при изменении кэша.

## Пример

Использование закэшированных данных как начального значения пока подгружаются актуальные:

```vue [app/pages/posts.vue]
<script setup lang="ts">
// те же данные доступны по ключу 'posts'
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [app/pages/posts/[id\\].vue]
<script setup lang="ts">
// кэш от useFetch в posts.vue (родительский маршрут)
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // взять пост из кэша как значение по умолчанию
    return posts.value.find(post => post.id === route.params.id)
  },
})
</script>
```

## Оптимистичные обновления

Пример оптимистичного обновления с помощью `useNuxtData`: UI обновляется сразу, как будто запрос на сервер уже успешен; при ошибке данные откатываются.

```vue [app/pages/todos.vue]
<script setup lang="ts">
const { data } = await useAsyncData('todos', (_nuxtApp, { signal }) => $fetch('/api/todos', { signal }))
</script>
```

```vue [app/components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

const { data: todos } = useNuxtData('todos')

async function addTodo () {
  await $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value,
    },
    onRequest () {
      previousTodos = todos.value
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      todos.value = previousTodos
    },
    async onResponse () {
      await refreshNuxtData('todos')
    },
  })
}
</script>
```

## Тип

```ts [Signature]
export function useNuxtData<DataT = any> (key: string): { data: Ref<DataT | undefined> }
```
