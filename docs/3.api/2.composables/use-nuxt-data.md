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
`useNuxtData` предоставляет доступ к текущему кэшированному значению [`useAsyncData`](/docs/api/composables/use-async-data), `useLazyAsyncData`, [`useFetch`](/docs/api/composables/use-fetch) и [`useLazyFetch`](/docs/api/composables/use-lazy-fetch) с явно указанным ключом.
::

## Использование

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
const { id } = useRoute().params
const { data: posts } = useNuxtData('posts')
const { data } = useLazyFetch(`/api/posts/${id}`, {
  key: `post-${id}`,
  default() {
    // Найдите отдельный пост из кэша и установите его в качестве значения по умолчанию.
    return posts.value.find(post => post.id === id)
  }
})
</script>
```

## Оптимистичные обновления

Мы можем использовать кэш для обновления пользовательского интерфейса после мутации, в то время как данные становятся недействительными в фоновом режиме.

```vue [pages/todos.vue]
<script setup lang="ts">
// Мы можем получить доступ к тем же данным позже, используя ключ 'todos'
const { data } = await useAsyncData('todos', () => $fetch('/api/todos'))
</script>
```

```vue [components/NewTodo.vue]
<script setup lang="ts">
const newTodo = ref('')
const previousTodos = ref([])

// Доступ к кэшированному значению useFetch в файле todos.vue
const { data: todos } = useNuxtData('todos')

const { data } = await useFetch('/api/addTodo', {
  method: 'post',
  body: {
    todo: newTodo.value
  },
  onRequest () {
    previousTodos.value = todos.value // Сохраните ранее кэшированное значение, чтобы восстановить его в случае неудачного получения данных

    todos.value.push(newTodo.value) // Оптимистично обновите todos.
  },
  onRequestError () {
    todos.value = previousTodos.value // Откатите данные, если запрос не был выполнен.
  },
  async onResponse () {
    await refreshNuxtData('todos') // Аннулирует todos в фоновом режиме, если запрос выполнен успешно.
  }
})
</script>
```

## Тип

```ts
useNuxtData<DataT = any> (key: string): { data: Ref<DataT | null> }
```
