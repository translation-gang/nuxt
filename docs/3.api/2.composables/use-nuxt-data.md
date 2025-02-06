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

Композабл `useNuxtData` используется для доступа к текущему закэшированному значению данных, полученных с помощью композаблов для запросов, таких как `useAsyncData`, `useLazyAsyncData`, `useFetch` и `useLazyFetch`. Указав ключ, который использовался при получении данных, вы можете извлечь закэшированные данные и использовать их по мере необходимости.

Это особенно полезно для оптимизации производительности за счет повторного использования уже полученных данных или реализации таких возможностей, как оптимистичные обновления или каскадные обновления данных.

Чтобы использовать `useNuxtData`, убедитесь, что композабл для получения данных (`useFetch`, `useAsyncData` и т.д.) был вызван с явно указанным ключом.

## Параметры

- `key`: Уникальный ключ, который идентифицирует закэшированные данные. Этот ключ должен совпадать с тем, который использовался при первоначальном получении данных.

## Возвращаемые значения

- `data`: Реактивная ссылка на закэшированные данные, связанные с указанным ключом. Если закэшированных данных нет, значение будет `null`. Этот `Ref` автоматически обновляется, если закэшированные данные изменяются, что обеспечивает бесшовную реактивность в ваших компонентах.

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

Пример ниже демонстрирует, как можно реализовать оптимистичные обновления с использованием useNuxtData.

Оптимистичные обновления — это техника, при которой пользовательский интерфейс обновляется сразу же, предполагая, что операция на сервере завершится успешно. Если операция в итоге завершится неудачей, интерфейс возвращается к своему предыдущему состоянию.

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
