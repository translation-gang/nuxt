---
title: "useState"
description: "Композабл useState создаёт реактивное общее состояние, совместимое с SSR."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## Использование

```ts
// Реактивное состояние со значением по умолчанию
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/3.x/getting-started/state-management"}

::important
Содержимое `useState` сериализуется в JSON: не храните классы, функции, символы и другие несериализуемые значения.
::

::warning
`useState` — зарезервированное имя, обрабатываемое компилятором; свою функцию так называть нельзя.
::

:video-accordion{title="Видео Александра Лихтера: зачем и когда использовать useState" videoId="mv0WcBABcIk"}

## Сочетание с `shallowRef`

Если глубокая реактивность не нужна, сочетайте `useState` с [`shallowRef`](https://ru.vuejs.org/api/reactivity-advanced.html#shallowref) — так дешевле при больших объектах и массивах.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'без глубокой реактивности' }))
// isShallow(state) === true
```

## Тип

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: уникальный ключ дедупликации между запросами; без ключа сгенерируется ключ по файлу и строке вызова [`useState`](/docs/3.x/api/composables/use-state).
- `init`: ленивая инициализация, если состояние ещё не создано; может вернуть `Ref`.
- `T`: (только TypeScript) тип значения состояния.

## Устранение неполадок

### `Cannot stringify arbitrary non-POJOs`

Ошибка возникает, если в `useState` кладут несериализуемые данные (например, экземпляры классов).

Для классов, которые Nuxt не сериализует из коробки, можно задать свой сериализатор и десериализатор через [`definePayloadPlugin`](/docs/3.x/api/composables/use-nuxt-app#custom-reducerreviver).

:read-more{to="/docs/3.x/api/composables/use-nuxt-app#payload"}
