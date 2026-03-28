---
title: 'useCookie'
description: "Композабл useCookie для чтения и записи cookie с поддержкой SSR."
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

## Использование

В своих страницах, компонентах и плагинах вы можете использовать `useCookie`, SSR-совместимый композабл для чтения и записи cookies.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` работает только внутри [Nuxt-контекста](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context).
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

export function useCookie<T = string | null | undefined>(
  name: string,
  options?: CookieOptions<T>
): CookieRef<T>
```

## Параметры

`name`: имя cookie.

`options`: настройки поведения cookie. Объект может содержать свойства ниже.

Большинство опций передаются в пакет [cookie](https://github.com/jshttp/cookie).

| Свойство | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `decode` | `(value: string) => T` | `decodeURIComponent` + [destr](https://github.com/unjs/destr). | Пользовательская функция декодирования значения cookie. Значение cookie ограничено набором символов (простая строка); функция превращает ранее закодированное значение в строку JavaScript или другой объект. <br/> **Примечание:** при ошибке в функции вернётся исходное не декодированное значение. |
| `encode` | `(value: T) => string` | `JSON.stringify` + `encodeURIComponent` | Пользовательская функция кодирования значения cookie для строки, пригодной для значения cookie. |
| `default` | `() => T \| Ref<T>` | `undefined` | Фабрика значения по умолчанию, если cookie нет. Может возвращать `Ref`. |
| `watch` | `boolean \| 'shallow'` | `true`  | Следить за изменениями и обновлять cookie: `true` — глубокое наблюдение, `'shallow'` — только верхний уровень, `false` — отключить. <br/> **Примечание:** при изменении cookie снаружи обновите значения `useCookie` вручную через [`refreshCookie`](/docs/3.x/api/utils/refresh-cookie). |
| `readonly` | `boolean` | `false` | При `true` запись в cookie отключена. |
| `maxAge` | `number` | `undefined` | Максимальный возраст в секундах ([атрибут `Max-Age`](https://tools.ietf.org/html/rfc6265#section-5.2.2)). Число округляется вниз до целого. По умолчанию не задано. |
| `expires` | `Date` | `undefined` | Дата истечения. По умолчанию не задана; клиенты обычно считают cookie несессионной и удаляют при выходе из браузера. <br/> **Примечание:** по [модели хранения cookie](https://tools.ietf.org/html/rfc6265#section-5.3), если заданы и `expires`, и `maxAge`, приоритет у `maxAge`, но не все клиенты так делают — лучше указывать одну и ту же дату/время. <br/>Если ни `expires`, ни `maxAge` нет, cookie сессионная и удалится при закрытии браузера. |
| `httpOnly` | `boolean` | `false` | Атрибут HttpOnly. <br/> **Примечание:** при `true` клиентский JavaScript не увидит cookie в `document.cookie`. |
| `secure` | `boolean` | `false` | Атрибут [`Secure`](https://tools.ietf.org/html/rfc6265#section-5.2.5). <br/>**Примечание:** при `true` без HTTPS клиент может не отправлять cookie обратно — возможны ошибки гидратации. |
| `partitioned` | `boolean` | `false` | Атрибут [`Partitioned`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1). <br/>**Примечание:** спецификация ещё не финальна. Многие клиенты могут игнорировать атрибут. Подробнее — в [предложении CHIPS](https://github.com/privacycg/CHIPS). |
| `domain` | `string` | `undefined` | Атрибут [`Domain`](https://tools.ietf.org/html/rfc6265#section-5.2.3). По умолчанию домен не задаётся; cookie обычно действует для текущего домена. |
| `path` | `string` | `'/'` | Атрибут [`Path`](https://tools.ietf.org/html/rfc6265#section-5.2.4). По умолчанию считается ["путь по умолчанию"](https://tools.ietf.org/html/rfc6265#section-5.1.4). |
| `sameSite` | `boolean \| string` | `undefined` | Атрибут [`SameSite`](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7). <br/>- `true` — `SameSite=Strict`.<br/>- `false` — атрибут не задаётся.<br/>- `'lax'` — `Lax`.<br/>- `'none'` — `None` (явная кросс-сайтовая cookie).<br/>- `'strict'` — `Strict`. |

## Возвращаемое значение

Vue-`Ref<T>` со значением cookie. Изменение ref обновляет cookie (если не задан `readonly`). Ref совместим с SSR и работает на клиенте и сервере.

## Примеры

### Базовое использование

В приведённом ниже примере создаётся cookie с именем `counter`. Если куки не существует, то первоначально ему присваивается случайное значение. Всякий раз, когда мы обновляем переменную `counter`, cookie будет обновляться соответствующим образом.

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">сброс</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

### Только для чтения

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value) {
  // cookie «userInfo» не обновится при этом изменении
  user.value.score++
}
</script>

<template>
  <div>Счёт пользователя: {{ user?.score }}</div>
</template>
```

### Запись и наблюдение shallow

```vue
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // список в cookie при этом не обновится
}

function save() {
  if (list.value) {
    // обновится именно cookie `list`
    list.value = [...list.value]
  }
}
</script>

<template>
  <div>
    <h1>Список</h1>
    <pre>{{ list }}</pre>
    <button @click="add">Добавить</button>
    <button @click="save">Сохранить</button>
  </div>
</template>
```

### Cookies в маршрутах API

Вы можете использовать `getCookie` и `setCookie` из пакета [`h3`](https://github.com/h3js/h3) для установки cookies в маршрутах API сервера.

```ts [server/api/counter.ts]
export default defineEventHandler(event => {
  // Считываем cookie counter
  let counter = getCookie(event, 'counter') || 0

  // Увеличиваем counter cookie на 1
  setCookie(event, 'counter', ++counter)

  // Отправляем ответ в формате JSON
  return { counter }
})
```

:link-example{to="/docs/3.x/examples/advanced/use-cookie"}
