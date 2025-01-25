---
title: 'useNuxtData'
description: 'Предоставляет доступ к текущему кэшированному значению композаблов получения данных.'
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` предоставляет доступ к текущему кэшированному значению [`useAsyncData`](/docs/api/composables/use-async-data), [`useLazyAsyncData`](/docs/api/composables/use-lazy-async-data),, [`useFetch`](/docs/api/composables/use-fetch) и [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) с явно указанным ключом.
::

## Использование

The `useNuxtData` composable is used to access the current cached value of data-fetching composables such as `useAsyncData`, `useLazyAsyncData`, `useFetch`, and `useLazyFetch`. By providing the key used during the data fetch, you can retrieve the cached data and use it as needed.

This is particularly useful for optimizing performance by reusing already-fetched data or implementing features like Optimistic Updates or cascading data updates.

To use `useNuxtData`, ensure that the data-fetching composable (`useFetch`, `useAsyncData`, etc.) has been called with an explicitly provided key.

## Params

- `key`: The unique key that identifies the cached data. This key should match the one used during the original data fetch.

## Return Values

- `data`: A reactive reference to the cached data associated with the provided key. If no cached data exists, the value will be `null`. This `Ref` automatically updates if the cached data changes, allowing seamless reactivity in your components.

## Пример

В приведенном ниже примере показано, как вы можете использовать кэшированные данные в качестве placeholder при загрузке самых последних данных с сервера.

```vue [pages/posts.vue]
<script setup lang="ts">
// Мы можем получить доступ к тем же данным позже, используя ключ 'posts'
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [pages/posts/[id\\].vue]
<script setup lang="ts">
// Доступ к кэшированному значению useFetch в posts.vue (родительский маршрут)
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default() {
    // Найдите отдельный пост из кэша и установите его в качестве значения по умолчанию.
    return posts.value.find(post => post.id === route.params.id)
  }
})
</script>
```

## Оптимистичные обновления

The example below shows how implementing Optimistic Updates can be achieved using useNuxtData.

Optimistic Updates is a technique where the user interface is updated immediately, assuming a server operation will succeed. If the operation eventually fails, the UI is rolled back to its previous state.

```vue [pages/todos.vue]
<script setup lang="ts">
// Мы можем получить доступ к тем же данным позже, используя ключ 'todos'
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
let previousTodos = []

// Доступ к кэшированному значению useAsyncData в файле todos.vue
const { data: todos } = useNuxtData('todos')

async function addTodo () {
  return $fetch('/api/addTodo', {
    method: 'post',
    body: {
      todo: newTodo.value
    },
    onRequest () {
      // Сохраните ранее кэшированное значение, чтобы восстановить его в случае неудачного получения данных
      previousTodos = todos.value

      // Оптимистично обновите todos.
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // Откатите данные, если запрос не был выполнен.
      todos.value = previousTodos
    },
    async onResponse () {
      // Аннулирует todos в фоновом режиме, если запрос выполнен успешно.
      await refreshNuxtData('todos')
    }
  })
}
</script>
```

## Тип

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
