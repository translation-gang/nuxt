---
title: 'useNuxtData'
description: 'Предоставляет доступ к текущему кэшированному значению композаблов получения данных.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` предоставляет доступ к текущему кэшированному значению [`useAsyncData`](/docs/3.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/3.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/3.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/3.x/api/composables/use-lazy-fetch) с явно указанным ключом.
::

## Использование

Композабл `useNuxtData` даёт доступ к текущему кэшированному значению композаблов загрузки данных — `useAsyncData`, `useLazyAsyncData`, `useFetch` и `useLazyFetch`. Передав тот же ключ, что использовался при запросе, можно получить кэшированные данные и работать с ними.

Это удобно для ускорения за счёт повторного использования уже полученных данных, а также для оптимистичных обновлений и каскадного обновления данных.

Чтобы использовать `useNuxtData`, композабл загрузки (`useFetch`, `useAsyncData` и т.д.) должен быть вызван с явно заданным ключом.

:video-accordion{title="Видео с канала LearnVue о композабле useNuxtData" videoId="e-_u6swXRWk"}

## Параметры

- `key`: уникальный ключ кэшированных данных. Должен совпадать с ключом, переданным при исходной загрузке.

## Возвращаемые значения

- `data`: реактивная ссылка на кэш по этому ключу. Если записи нет — `null`. `Ref` обновляется при изменении кэша, сохраняя реактивность в компонентах.

## Пример

Ниже показано, как использовать кэш как заполнитель, пока с сервера подгружаются актуальные данные.

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

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // пост из кэша как значение по умолчанию
    return posts.value.find(post => post.id === id)
  },
})
</script>
```

## Оптимистичные обновления

Ниже — пример оптимистичных обновлений с помощью `useNuxtData`.

Оптимистичное обновление: интерфейс меняется сразу, предполагая успех операции на сервере. Если операция не удаётся, состояние интерфейса откатывается к предыдущему.

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
      todo: newTodo.value,
    },
    onRequest () {
      // сохраняем копию на случай отката при ошибке
      previousTodos = todos.value

      // оптимистично добавляем пункт в список
      todos.value = [...todos.value, newTodo.value]
    },
    onResponseError () {
      // откат при неудаче запроса
      todos.value = previousTodos
    },
    async onResponse () {
      // после успеха синхронизируемся с сервером
      await refreshNuxtData('todos')
    },
  })
}
</script>
```

## Тип

```ts
declare function useNuxtData<DataT = any> (
  key: string,
): { data: Ref<DataT | null> }
```
