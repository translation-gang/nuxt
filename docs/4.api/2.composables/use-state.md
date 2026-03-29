---
title: "useState"
description: "Общее реактивное состояние с поддержкой SSR через композабл useState."
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
Данные из `useState` сериализуются в JSON: не кладите туда классы, функции, `Symbol` и другое несериализуемое.
::

::warning
`useState` — зарезервированное имя, обрабатываемое компилятором; свою функцию так называть нельзя.
::

:video-accordion{title="Видео Александра Лихтера: зачем и когда использовать useState" videoId="mv0WcBABcIk"}

## Сочетание с `shallowRef`

Если глубокая реактивность не нужна, сочетайте `useState` с [`shallowRef`](https://ru.vuejs.org/api/reactivity-advanced.html#shallowref) — так дешевле при больших объектах и массивах.

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'без глубокой реактивности' }))
// поверхностная реактивность: isShallow(state) === true
```

## Тип

```ts
declare function useState<T> (init?: () => T | Ref<T>): Ref<T>
declare function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: уникальный ключ; без него сгенерируется ключ по файлу и строке вызова [`useState`](/docs/3.x/api/composables/use-state). Ключ нужен, чтобы состояние корректно совпадало между запросами SSR.
- `init`: ленивая инициализация, если состояние ещё не создано; может вернуть `Ref`.
- `T`: (TypeScript) тип значения состояния.
