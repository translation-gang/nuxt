---
title: 'useNuxtData'
description: 'Доступ к текущему кэшированному значению композаблов загрузки данных.'
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/asyncData.ts
    size: xs
---

::note
`useNuxtData` открывает текущий кэш [`useAsyncData`](/docs/4.x/api/composables/use-async-data), [`useLazyAsyncData`](/docs/4.x/api/composables/use-lazy-async-data), [`useFetch`](/docs/4.x/api/composables/use-fetch) и [`useLazyFetch`](/docs/4.x/api/composables/use-lazy-fetch), если при загрузке явно передан ключ.
::

## Использование

По ключу из `useAsyncData`, `useLazyAsyncData`, `useFetch` или `useLazyFetch` можно прочитать закэшированные данные — удобно для переиспользования, оптимистичных обновлений и каскадных обновлений.

Ключ должен быть явно задан при первом вызове композабла загрузки.

:video-accordion{title="Видео LearnVue про useNuxtData" videoId="e-_u6swXRWk"}

## Параметры

- `key`: Уникальный ключ кэша; должен совпадать с ключом при первоначальной загрузке.

## Возвращаемые значения

- `data`: Реактивная ссылка на кэш по ключу. Если кэша нет — `null`. `Ref` обновляется при изменении кэша.

## Пример

Кэш как плейсхолдер, пока грузятся свежие данные:

```vue [app/pages/posts.vue]
<script setup lang="ts">
// Позже те же данные по ключу 'posts'
const { data } = await useFetch('/api/posts', { key: 'posts' })
</script>
```

```vue [app/pages/posts/[id\\].vue]
<script setup lang="ts">
// Кэш из useFetch в posts.vue (родительский маршрут)
const { data: posts } = useNuxtData('posts')

const route = useRoute()

const { data } = useLazyFetch(`/api/posts/${route.params.id}`, {
  key: `post-${route.params.id}`,
  default () {
    // Запись из кэша как значение по умолчанию
    return posts.value.find(post => post.id === route.params.id)
  },
})
</script>
```

## Оптимистичные обновления

Обновление UI сразу, с откатом при ошибке сервера:

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
