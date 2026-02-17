---
title: 'useCookie'
description: 'SSR-совместимый компосабл для чтения и записи cookies.'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## Использование

В страницах, компонентах и плагинах можно использовать `useCookie` для чтения и записи cookies с учётом SSR.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` работает только в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context).
::

::tip
Возвращаемый ref автоматически сериализует и десериализует значения cookie в JSON.
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
}

export interface CookieRef<T> extends Ref<T> {}

export function useCookie<T = string | null | undefined> (
  name: string,
  options?: CookieOptions<T>,
): CookieRef<T>
```

## Параметры

`name`: Имя cookie.

`options`: Настройки поведения cookie. Объект может содержать следующие свойства:

Большинство опций передаётся в пакет [cookie](https://github.com/jshttp/cookie).

| Свойство      | Тип                    | По умолчанию                                                   | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|---------------|------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `decode`      | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | Функция декодирования значения cookie. Значение cookie — строка с ограниченным набором символов; decode преобразует его в строку или объект. <br/> **Примечание:** при ошибке в функции вернётся исходное недекодированное значение.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `encode`      | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent`                       | Функция кодирования значения в строку для cookie.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `default`     | `() => T \| Ref<T>`    | `undefined`                                                    | Функция, возвращающая значение по умолчанию, если cookie нет. Может возвращать `Ref`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `watch`       | `boolean \| 'shallow'` | `true`                                                         | Следить за изменениями и обновлять cookie. `true` — глубокий watch, `'shallow'` — только верхний уровень, `false` — отключить. <br/> **Примечание:** при изменении cookie извне обновляйте значение вручную через [`refreshCookie`](/docs/4.x/api/utils/refresh-cookie).                                                                                                                                                                                                                                                                                                                                                                        |
| `readonly`    | `boolean`              | `false`                                                        | Если `true`, запись в cookie отключена.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `maxAge`      | `number`               | `undefined`                                                    | Время жизни cookie в секундах ([атрибут `Max-Age`](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.2)). Число округляется вниз. По умолчанию не задано.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `expires`     | `Date`                 | `undefined`                                                    | Дата истечения cookie. По умолчанию не задана; без неё или без `maxAge` cookie считается сессионной и удаляется при закрытии браузера. <br/> **Примечание:** по [спецификации](https://datatracker.ietf.org/doc/html/rfc6265#section-5.3) при наличии обоих `expires` и `maxAge` приоритет у `maxAge`; лучше задавать одну и ту же дату.                                                                                                                                                                                                                                                                                                                  |
| `httpOnly`    | `boolean`              | `false`                                                        | Атрибут HttpOnly. <br/> **Примечание:** при `true` клиентский JavaScript не видит cookie в `document.cookie`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `secure`      | `boolean`              | `false`                                                        | Атрибут [Secure](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.5). <br/>**Примечание:** при `true` без HTTPS браузер не отправляет cookie на сервер — возможны ошибки гидрации.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `partitioned` | `boolean`              | `false`                                                        | Атрибут [Partitioned](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1). Ещё не финализирован в стандартах; многие клиенты могут его игнорировать. [Подробнее](https://github.com/privacycg/CHIPS).                                                                                                                                                                                                                                                                                                                                                                                                       |
| `domain`      | `string`               | `undefined`                                                    | Атрибут [Domain](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.3). По умолчанию — текущий домен.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `path`        | `string`               | `'/'`                                                          | Атрибут [Path](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.4). По умолчанию — ["default path"](https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4).                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `sameSite`    | `boolean \| string`    | `undefined`                                                    | Атрибут [SameSite](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7). <br/>- `true` или `'strict'` — Strict<br/>- `false` — атрибут не задаётся<br/>- `'lax'` — Lax<br/>- `'none'` — None (cross-site).                                                                                                                                                                                                                                                                                                                                                                                                       |

## Возвращаемое значение

Vue `Ref<T>` со значением cookie. Изменение ref обновляет cookie (если не задано `readonly`). Ref совместим с SSR и работает на клиенте и сервере.

## Примеры

### Базовое использование

В примере создаётся cookie `counter`. Если его нет, задаётся случайное значение. При обновлении переменной `counter` обновляется и cookie.

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
  // фактический cookie `userInfo` не обновится
  user.value.score++
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

### Записываемые cookies

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
  // cookie list от этого не обновится
}

function save () {
  // cookie list обновится
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

### Cookies в API-маршрутах

В серверных API-маршрутах для работы с cookies используйте `getCookie` и `setCookie` из пакета [`h3`](https://github.com/h3js/h3).

```ts [server/api/counter.ts]
export default defineEventHandler((event) => {
  // Чтение cookie counter
  let counter = getCookie(event, 'counter') || 0

  // Увеличение counter на 1
  setCookie(event, 'counter', ++counter)

  // JSON-ответ
  return { counter }
})
```

:link-example{to="/docs/4.x/examples/advanced/use-cookie"}
