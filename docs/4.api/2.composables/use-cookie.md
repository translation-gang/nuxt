---
title: 'useCookie'
description: SSR-friendly композабл useCookie для чтения и записи cookie.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## Использование

В страницах, компонентах и плагинах `useCookie` читает и пишет cookie с учётом SSR.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` работает только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::tip
Возвращаемый ref сериализует и десериализует значения cookie в JSON.
::

## Тип

```ts [Signature]
import type { Ref } from 'vue'
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie-es'

export interface CookieOptions<T = any> extends Omit<CookieSerializeOptions & CookieParseOptions, 'decode' | 'encode'> {
  decode?(value: string): T
  encode?(value: T): string
  default?: () => T | Ref<T>
  watch?: boolean | 'shallow'
  readonly?: boolean
  refresh?: boolean
}

export interface CookieRef<T> extends Ref<T> {}

export function useCookie<T = string | null | undefined> (
  name: string,
  options?: CookieOptions<T>,
): CookieRef<T>
```

## Параметры

`name`: имя cookie.

`options`: поведение cookie. Большинство опций передаётся в пакет [cookie](https://github.com/jshttp/cookie).

| Property      | Type                   | Default                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------|------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decode`      | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | Декодирование значения cookie. Значение cookie — ограниченная строка; функция превращает сохранённую строку в строку JS или объект. <br/> **Примечание:** при ошибке в функции вернётся исходное не декодированное значение.                                                                                                                                                                                                                       |
| `encode`      | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent`                        | Кодирование значения в строку для cookie.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `default`     | `() => T \| Ref<T>`    | `undefined`                                                    | Значение по умолчанию, если cookie нет. Может возвращать `Ref`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `watch`       | `boolean \| 'shallow'` | `true`                                                         | Следить за изменениями и обновлять cookie: `true` — глубокий watch, `'shallow'` — только верхний уровень, `false` — не следить. <br/> **Примечание:** при внешнем изменении cookie обновите вручную через [`refreshCookie`](/docs/4.x/api/utils/refresh-cookie).                                                                                                                                                                                                                                                                                                                           |
| `refresh`     | `boolean`              | `false`                                                        | Если `true`, срок cookie обновляется при каждой явной записи (например `cookie.value = cookie.value`), даже если значение не изменилось. Срок сам по себе не продлевается — нужна запись в `.value`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `readonly`    | `boolean`              | `false`                                                        | Если `true`, запись в cookie отключена.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `maxAge`      | `number`               | `undefined`                                                    | Максимальный возраст в секундах — атрибут [`Max-Age`](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.2). Округляется вниз. По умолчанию без ограничения по возрасту.                                                                                                                                                                                                                                                                                                                                                                                   |
| `expires`     | `Date`                 | `undefined`                                                    | Дата истечения. По умолчанию без срока — «сессионная» cookie, обычно удаляется при закрытии браузера. <br/> **Примечание:** по [спецификации хранилища cookie](https://datatracker.ietf.org/doc/html/rfc6265#section-5.3) при указании и `expires`, и `maxAge` приоритет у `maxAge`, но не все клиенты так делают — лучше согласовать оба. <br/>Если ни `expires`, ни `maxAge` нет — cookie только на сессию. |
| `httpOnly`    | `boolean`              | `false`                                                        | Атрибут HttpOnly. <br/> **Примечание:** при `true` клиентский JS не увидит cookie в `document.cookie`.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `secure`      | `boolean`              | `false`                                                        | Атрибут [`Secure`](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.5). <br/>**Примечание:** при `true` без HTTPS клиент может не отправлять cookie обратно — возможны ошибки гидратации.                                                                                                                                                                                                                                                                                                                |
| `partitioned` | `boolean`              | `false`                                                        | Атрибут [`Partitioned`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1). <br/>**Примечание:** стандарт ещё не финализирован. Многие клиенты могут игнорировать атрибут. Подробнее — в [proposal](https://github.com/privacycg/CHIPS).                                                                                                                                                                                                            |
| `domain`      | `string`               | `undefined`                                                    | Атрибут [`Domain`](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.3). По умолчанию домен не задаётся — cookie обычно только для текущего хоста.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `path`        | `string`               | `'/'`                                                          | Атрибут [`Path`](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.4). По умолчанию — ["default path"](https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4).                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `sameSite`    | `boolean \| string`    | `undefined`                                                    | Атрибут [`SameSite`](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7). <br/>- `true` → `Strict`<br/>- `false` — без атрибута<br/>- `'lax'` → `Lax`<br/>- `'none'` → `None` (явная cross-site cookie)<br/>- `'strict'` → `Strict`                                                                    |

## Возвращаемые значения

Vue `Ref<T>` со значением cookie. Запись в ref обновляет cookie (если не `readonly`). Работает на сервере и клиенте.

## Примеры

### Базовый пример

Cookie `counter`: если нет — случайное число; изменение ref обновляет cookie.

```vue [app/app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value ||= Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">
      reset
    </button>
    <button @click="counter--">
      -
    </button>
    <button @click="counter++">
      +
    </button>
  </div>
</template>
```

### Только чтение

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false,
  },
)

if (user.value) {
  // реальная cookie `userInfo` не обновится
  user.value.score++
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

### Запись

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow',
  },
)

function add () {
  list.value?.push(Math.round(Math.random() * 1000))
  // cookie list не обновится от одного push
}

function save () {
  // cookie обновится
  list.value &&= [...list.value]
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">
      Add
    </button>
    <button @click="save">
      Save
    </button>
  </div>
</template>
```

### Обновление срока

```vue
<script setup lang="ts">
const session = useCookie(
  'session', {
    maxAge: 60 * 60, // 1 hour
    refresh: true,
    default: () => 'active',
  })

// Даже без смены значения срок обновится при каждой записи в setter
session.value = 'active'
</script>

<template>
  <div>Session: {{ session }}</div>
</template>
```

### Cookie в API-маршрутах

В серверных API используйте `getCookie` и `setCookie` из [`h3`](https://github.com/h3js/h3).

```ts [server/api/counter.ts]
export default defineEventHandler((event) => {
  let counter = getCookie(event, 'counter') || 0

  setCookie(event, 'counter', ++counter)

  return { counter }
})
```

:link-example{to="/docs/4.x/examples/advanced/use-cookie"}
