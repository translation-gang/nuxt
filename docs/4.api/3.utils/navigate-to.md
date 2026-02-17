---
title: "navigateTo"
description: "Программная навигация пользователя."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Использование

`navigateTo` доступен и на сервере, и на клиенте. Его можно использовать в [контексте Nuxt](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context) или напрямую для программной навигации по страницам.

::warning
При вызове `navigateTo` всегда используйте `await` или `return` с его результатом.
::

::note
`navigateTo` нельзя использовать в маршрутах Nitro. Для серверного редиректа в Nitro используйте [`sendRedirect`](https://h3.dev/utils/response#redirectlocation-status-statustext).
::

### Во Vue-компоненте

```vue
<script setup lang="ts">
// passing 'to' as a string
await navigateTo('/search')

// ... or as a route object
await navigateTo({ path: '/search' })

// ... or as a route object with query parameters
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc',
  },
})
</script>
```

### В маршрутном middleware

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

При использовании `navigateTo` в маршрутном middleware нужно **возвращать его результат**, чтобы цепочка выполнения middleware работала корректно.

Например, следующий код **не будет работать как ожидается**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ This will not work as expected
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

В этом случае `navigateTo` выполнится, но его результат не будет возвращён, что может привести к неожиданному поведению.

:read-more{to="/docs/4.x/directory-structure/app/middleware"}

### Переход по внешнему URL

Параметр `external` в `navigateTo` влияет на обработку URL:

- **Без `external: true`**:
  - Внутренние URL обрабатываются как обычно.
  - Внешние URL приводят к ошибке.

- **С `external: true`**:
  - Внутренние URL открываются с полной перезагрузкой страницы.
  - Внешние URL открываются как обычно.

#### Пример

```vue
<script setup lang="ts">
// will throw an error;
// navigating to an external URL is not allowed by default
await navigateTo('https://nuxt.com')

// will redirect successfully with the 'external' parameter set to 'true'
await navigateTo('https://nuxt.com', {
  external: true,
})
</script>
```

### Открытие страницы в новой вкладке

```vue
<script setup lang="ts">
// will open 'https://nuxt.com' in a new tab
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500,
    },
  },
})
</script>
```

## Тип

```ts [Signature]
export function navigateTo (
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions,
): Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw

interface NavigateToOptions {
  replace?: boolean
  redirectCode?: number
  external?: boolean
  open?: OpenOptions
}

type OpenOptions = {
  target: string
  windowFeatures?: OpenWindowFeatures
}

type OpenWindowFeatures = {
  popup?: boolean
  noopener?: boolean
  noreferrer?: boolean
} & XOR<{ width?: number }, { innerWidth?: number }>
  & XOR<{ height?: number }, { innerHeight?: number }>
  & XOR<{ left?: number }, { screenX?: number }>
  & XOR<{ top?: number }, { screenY?: number }>
```

## Параметры

### `to`

**Тип**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/routelocationoptions) | `undefined` | `null`

**По умолчанию**: `'/'`

`to` — строка URL или объект маршрута для редиректа. При `undefined` или `null` используется `'/'`.

#### Пример

```ts
// Прямой URL — редирект на страницу /blog
await navigateTo('/blog')

// Объект маршрута — редирект по имени 'blog'
await navigateTo({ name: 'blog' })

// Редирект на маршрут 'product' с параметром id = 1
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (необязательно)

**Тип**: `NavigateToOptions`

Объект со следующими свойствами:

- `replace`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`
  - По умолчанию `navigateTo` добавляет маршрут в историю Vue Router на клиенте. При `replace: true` текущая запись в истории заменяется.

- `redirectCode`

  - **Тип**: `number`
  - **По умолчанию**: `302`
  - При серверном редиректе по умолчанию возвращается [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302). Можно задать другой код, например [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301) для постоянного редиректа.

- `external`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`
  - При `true` разрешён переход на внешний URL. Иначе `navigateTo` выбросит ошибку.

- `open`

  - **Тип**: `OpenOptions`
  - Открытие URL через [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open). Работает только на клиенте.

  - `target`

    - **Тип**: `string`
    - **По умолчанию**: `'_blank'`
    - Имя контекста браузера (вкладки/окна).

  - `windowFeatures`

    - **Тип**: `OpenWindowFeatures`
    - Параметры окна:

      | Свойство                | Тип       | Описание |
      |-------------------------|-----------|----------|
      | `popup`                 | `boolean` | Минимальное всплывающее окно вместо новой вкладки. |
      | `width` или `innerWidth`   | `number`  | Ширина области контента (мин. 100px). |
      | `height` или `innerHeight` | `number`  | Высота области контента (мин. 100px). |
      | `left` или `screenX`     | `number`  | Горизонтальная позиция окна. |
      | `top` или `screenY`      | `number`  | Вертикальная позиция окна. |
      | `noopener`              | `boolean` | Запрещает новому окну доступ через `window.opener`. |
      | `noreferrer`            | `boolean` | Не отправлять заголовок Referer, включает `noopener`. |

      Подробнее: [документация windowFeatures](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures).
