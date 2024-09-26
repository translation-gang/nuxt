---
title: 'useCookie'
description: useCookie - это SSR-дружественный композабл для чтения и записи cookies.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/cookie.ts
    size: xs
---

В своих страницах, компонентах и плагинах вы можете использовать `useCookie`, SSR-совместимый композабл для чтения и записи cookies.

```ts
const cookie = useCookie(name, options)
```

::note
`useCookie` работает только внутри [Nuxt-контекста](/docs/guide/going-further/nuxt-app#the-nuxt-context).
::

::tip
Ref `useCookie` автоматически сериализует и десериализует значение cookie в JSON.
::

## Пример

В приведенном ниже примере создается cookie с именем `counter`. Если куки не существует, то первоначально ему присваивается случайное значение. Всякий раз, когда мы обновляем переменную `counter`, cookie будет обновляться соответствующим образом.

```vue [app.vue]
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>
```

:link-example{to="/docs/examples/advanced/use-cookie"}

::note
Обновите значения `useCookie` вручную, когда cookies изменились, используя [`refreshCookie`](/docs/api/utils/refresh-cookie).
::

## Параметры

Данный композабл принимает несколько опций, которые позволяют изменять поведение cookie.

Большинство опций будут напрямую переданы в пакет [cookie](https://github.com/jshttp/cookie).

### `maxAge` / `expires`

Используйте эти параметры для установки срока действия cookie.

`maxAge`: Определяет `number` (в секундах), которое будет значением для атрибута [`Max-Age` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.2).
Указанное число будет преобразовано в целое число путем округления вниз. По умолчанию maxAge не задается.

`expires`: Определяет объект `Date` в качестве значения для атрибута [`Expires` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.1).
По умолчанию срок действия не установлен. Большинство клиентов (браузеров) будут считать это «непостоянным cookie» и удалят его при определенном условии, например, при выходе из приложения веб-браузера.

::note
В [спецификации модели хранения cookie](https://tools.ietf.org/html/rfc6265#section-5.3) говорится, что если заданы и `expires`, и `maxAge`, то приоритет имеет `maxAge`, но не все клиенты могут подчиниться этому, поэтому если заданы оба параметра, то они должны указывать на одну и ту же дату и время!
::

::note
Если ни одно из значений `expires` и `maxAge` не установлено, cookie будет только сессионным и удалится, когда пользователь закроет браузер.
::

### `httpOnly`

Определяет `boolean` значение для атрибута [`HttpOnly` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.6). Если значение истинно, атрибут `HttpOnly` устанавливается, в противном случае - нет. По умолчанию атрибут `HttpOnly` не установлен.

::warning
Будьте осторожны при установке значения `true`, так как некоторые клиенты не позволят JavaScript на стороне клиента видеть cookie в `document.cookie`.
::

### `secure`

Определяет `boolean` значение для атрибута [`Secure` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.5). Если значение истинно, атрибут `Secure` устанавливается, в противном случае - нет. По умолчанию атрибут `Secure` не установлен.

::warning
Будьте осторожны при установке значения `true`, так как некоторые клиенты не будут отправлять cookie обратно на сервер в будущем, если браузер не имеет HTTPS-соединения. Это может привести к ошибкам гидратации.
::

### `partitioned`

Определяет `boolean` значение для атрибута [`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1). Если значение истинно, атрибут `Partitioned` устанавливается, в противном случае - нет. По умолчанию атрибут `Partitioned` не установлен.

::note
Это атрибут, который еще не полностью стандартизирован и может измениться в будущем.
Это также означает, что многие клиенты могут игнорировать этот атрибут, пока не "поймут" его.

Более подробную информацию можно найти в [предложении](https://github.com/privacycg/CHIPS).
::

### `domain`

Определяет значение для атрибута [`Domain` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.3). По умолчанию домен не задается, и большинство клиентов будут считать, что cookie применяется только к текущему домену.

### `path`

Определяет значение для атрибута [`Path` `Set-Cookie`](https://tools.ietf.org/html/rfc6265#section-5.2.4). По умолчанию путь считается ["default path"](https://tools.ietf.org/html/rfc6265#section-5.1.4).

### `sameSite`

Определяет `boolean` или `string` значение для атрибута [`SameSite` `Set-Cookie`](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7).

- `true` установит для атрибута `SameSite` значение `Strict` для строгого соблюдения same-site.
- `false` не будет устанавливать атрибут `SameSite`.
- `'lax'` установит атрибут `SameSite` в значение `Lax` для нестрогого соблюдения правил на одном сайте.
- `'none'` установит атрибут `SameSite` в `None` для явного межсайтового cookie.
- `'strict'` установит для атрибута `SameSite` значение `Strict` для строгого соблюдения same-site.

Более подробную информацию о различных уровнях исполнения можно найти в [спецификации](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7).

### `encode`

Определяет функцию, которая будет использоваться для кодирования значения cookie. Поскольку значение cookie имеет ограниченный набор символов (и должно быть простой строкой), эта функция может быть использована для кодирования значения в строку, подходящую для значения cookie.

По умолчанию используется кодировщик `JSON.stringify` + `encodeURIComponent`.

### `decode`

Определяет функцию, которая будет использоваться для декодирования значения cookie. Поскольку значение cookie имеет ограниченный набор символов (и должно быть простой строкой), эта функция может быть использована для декодирования ранее закодированного значения cookie в строку JavaScript или другой объект.

По умолчанию используется декодер `decodeURIComponent` + [destr](https://github.com/unjs/destr).

::note
Если при выполнении этой функции произойдет ошибка, то в качестве значения cookie будет возвращено исходное, не декодированное значение cookie.
::

### `default`

Определяет функцию, которая возвращает значение cookie по умолчанию. Функция также может возвращать `Ref`.

### `readonly`

Позволяет получить _доступ_ к значению cookie без возможности его установки.

### `watch`

Определяет `boolean` или `string` значение для [слежения](https://ru.vuejs.org/api/reactivity-core.html#watch) за данными cookie ref.

- `true` - Будет следить за изменениями данных cookie ref и их вложенных свойств (по умолчанию).
- `shallow` - Будет следить за изменениями данных cookie ref только для свойств верхнего уровня.
- `false` - Не будет следить за изменениями данных cookie ref.

::note
Обновите значения `useCookie` вручную, когда cookies изменились, используя [`refreshCookie`](/docs/api/utils/refresh-cookie).
::

**Пример 1:**

```vue
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie не обновится при этом изменении
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>
```

**Пример 2:**

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
  // list cookie не обновится с этим изменением
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie обновится при помощи такого изменения
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

## Cookies в маршрутах API

Вы можете использовать `getCookie` и `setCookie` из пакета [`h3`](https://github.com/unjs/h3) для установки cookies в маршрутах API сервера.

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

:link-example{to="/docs/examples/advanced/use-cookie"}
