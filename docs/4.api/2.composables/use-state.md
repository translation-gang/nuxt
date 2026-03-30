---
title: "useState"
description: Композабл useState создаёт реактивное общее состояние, совместимое с SSR.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## Использование

```ts
// Создаём реактивное состояние и задаём значение по умолчанию
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/4.x/getting-started/state-management"}

::important
Так как данные внутри `useState` сериализуются в JSON, важно, чтобы в них не было несериализуемого: классов, функций или символов.
::

::warning
`useState` — зарезервированное имя функции, преобразуемое компилятором; не называйте свою функцию `useState`.
::

:video-accordion{title="Видео Александра Лихтера: зачем и когда использовать useState" videoId="mv0WcBABcIk"}

## Использование `shallowRef`

Если глубокая реактивность состояния не нужна, можно сочетать `useState` с [`shallowRef`](https://vuejs.org/api/reactivity-advanced#shallowref). Это может улучшить производительность, если в состоянии большие объекты и массивы.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## Тип

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: Уникальный ключ, чтобы корректно дедуплицировать загрузку данных между запросами. Если ключ не задан, для вас сгенерируется ключ, уникальный для файла и номера строки вызова [`useState`](/docs/4.x/api/composables/use-state).
- `init`: Функция, задающая начальное значение состояния, если оно ещё не инициализировано. Может возвращать и `Ref`.
- `T`: (только TypeScript) тип состояния

## Устранение неполадок

### `Cannot stringify arbitrary non-POJOs`

Ошибка возникает, если в `useState` пытаются сохранить несериализуемые данные, например экземпляры классов.

Чтобы хранить в `useState` экземпляры классов, которые Nuxt не поддерживает из коробки, можно использовать [`definePayloadPlugin`](/docs/4.x/api/composables/use-nuxt-app#custom-reducerreviver) и задать свой сериализатор и десериализатор.

:read-more{to="/docs/4.x/api/composables/use-nuxt-app#payload"}
