---
title: "useState"
description: "Компосабл useState создаёт реактивное и SSR-совместимое общее состояние."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## Использование

```ts
// Create a reactive state and set default value
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/4.x/getting-started/state-management"}

::important
Данные внутри `useState` сериализуются в JSON, поэтому в них не должно быть ничего несериализуемого: классов, функций, символов.
::

::warning
`useState` — зарезервированное имя, обрабатываемое компилятором; не называйте так свои функции.
::

:video-accordion{title="Watch a video from Alexander Lichter about why and when to use useState" videoId="mv0WcBABcIk"}

## Использование `shallowRef`

Если состояние не должно быть глубоко реактивным, можно сочетать `useState` с [`shallowRef`](https://vuejs.org/api/reactivity-advanced#shallowref). Это может улучшить производительность при больших объектах и массивах.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## Тип

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: Уникальный ключ для дедупликации данных между запросами. Если не указан, генерируется по файлу и строке вызова [`useState`](/docs/4.x/api/composables/use-state).
- `init`: Функция начального значения, когда состояние ещё не инициализировано. Может возвращать `Ref`.
- `T`: (только TypeScript) тип состояния.

## Решение проблем

### `Cannot stringify arbitrary non-POJOs`

Ошибка возникает при попытке сохранить в `useState` несериализуемые данные (например, экземпляры классов).

Чтобы хранить экземпляры классов, не поддерживаемые Nuxt, используйте [`definePayloadPlugin`](/docs/4.x/api/composables/use-nuxt-app#custom-reducerreviver) и задайте свой сериализатор и десериализатор.

:read-more{to="/docs/4.x/api/composables/use-nuxt-app#payload"}
