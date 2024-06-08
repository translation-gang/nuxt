---
title: "useState"
description: Композабл useState создает реактивное и совместимое с SSR общее состояние.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## Использование

```ts
// Создайте реактивное состояние и установите значение по умолчанию
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/getting-started/state-management"}

::important
Поскольку данные внутри `useState` будут сериализованы в JSON, важно, чтобы они не содержали ничего, что нельзя сериализовать, например, классы, функции или символы.
::

::warning
`useState` это зарезервированное имя функции, преобразуемое компилятором, поэтому вы не должны называть свою собственную функцию `useState`.
::

::tip{icon="i-ph-video-duotone" to="https://www.youtube.com/watch?v=mv0WcBABcIk" target="_blank"}
Посмотрите видео Александра Лихтера о том, почему и когда следует использовать  `useState()`.
::

## Использование `shallowRef`

Если вам не нужно, чтобы ваше состояние было глубоко реактивным, вы можете объединить  `useState` с [`shallowRef`](https://ru.vuejs.org/api/reactivity-advanced.html#shallowref). Это может улучшить производительность, когда ваше состояние содержит большие объекты и массивы.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## Тип

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: Уникальный ключ, который гарантирует, что получение данных правильно дедублируется по запросам. Если вы не предоставите ключ, то будет сгенерирован ключ, уникальный для файла и номера строки экземпляра [`useState`](/docs/api/composables/use-state).
- `init`: Функция, которая предоставляет начальное значение для состояния, когда оно не инициализировано. Эта функция также может возвращать `Ref`.
- `T`: (только для TypeScript) Укажите тип состояния
