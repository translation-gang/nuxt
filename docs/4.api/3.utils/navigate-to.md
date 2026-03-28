---
title: "navigateTo"
description: Вспомогательная функция для программной навигации пользователя в приложении Nuxt.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/router.ts
    size: xs
---

## Использование

Функция `navigateTo` доступна как на сервере, так и на клиенте. Ее можно использовать внутри [Nuxt-контекста](/docs/3.x/guide/going-further/nuxt-app#the-nuxt-context) или напрямую для осуществления постраничной навигации.

::warning
Всегда используйте `await` или `return` с результатом вызова `navigateTo`.
::

::note
В маршрутах Nitro `navigateTo` использовать нельзя. Для серверного редиректа в Nitro используйте [`sendRedirect`](https://h3.dev/utils/response#sendredirectevent-location-code).
::

### Внутри компонента Vue

```vue
<script setup lang="ts">
// передаем 'to' в виде строки
await navigateTo('/search')

// ... или в виде объекта маршрута
await navigateTo({ path: '/search' })

// ... или как объект маршрута с параметрами запроса
await navigateTo({
  path: '/search',
  query: {
    page: 1,
    sort: 'asc'
  }
})
</script>
```

### Внутри middleware маршрута

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // код ответа 301 (постоянное перенаправление)
    return navigateTo('/search', { redirectCode: 301 })
  }
})
```

В middleware маршрута нужно **вернуть** результат `navigateTo`, иначе цепочка middleware отработает неверно.

Так **работать не будет**:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/search') {
    // ❌ так ожидаемого поведения не будет
    navigateTo('/search', { redirectCode: 301 })
    return
  }
})
```

Здесь `navigateTo` вызывается, но не возвращается — возможны сюрпризы в поведении.

:read-more{to="/docs/3.x/directory-structure/middleware"}

### Переход на внешний URL

Параметр `external` в `navigateTo` влияет на то, как будет осуществляться переход по URL:

- **Без параметра `external: true`**:
  - Внутренние URL переходят, как и ожидалось.
  - Внешние URL-адреса выдают ошибку.

- **С `external: true`**:
  - Внутренние URL переходят с полной перезагрузкой страницы.
  - Внешние URL переходят, как и ожидалось.

#### Пример

```vue
<script setup lang="ts">
// выкинет ошибку;
// переход на внешний URL по умолчанию запрещен
await navigateTo('https://nuxt.com')

// успешный переход на внешний URL при external: true
await navigateTo('https://nuxt.com', {
  external: true
})
</script>
```

### Открытие страницы в новой вкладке

```vue
<script setup lang="ts">
// откроет 'https://nuxt.com' в новой вкладке
await navigateTo('https://nuxt.com', {
  open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }
})
</script>
```

## Тип

```ts
function navigateTo(
  to: RouteLocationRaw | undefined | null,
  options?: NavigateToOptions
) => Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw 

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

**Тип**: [`RouteLocationRaw`](https://router.vuejs.org/api/interfaces/RouteLocationOptions.html#Interface-RouteLocationOptions) | `undefined` | `null`

**По умолчанию**: `'/'`

`to` может быть простой строкой или объектом маршрута, на который нужно перенаправить. Если передать `undefined` или `null`, то по умолчанию будет указано `'/'`.

#### Пример

```ts
// Передача URL строкой перенаправит на страницу '/blog'
await navigateTo('/blog')

// Объект маршрута перенаправит на маршрут с именем 'blog'
await navigateTo({ name: 'blog' })

// Перенаправление на маршрут 'product' с параметром id = 1 через объект маршрута
await navigateTo({ name: 'product', params: { id: 1 } })
```

### `options` (опционально)

**Тип**: `NavigateToOptions`

Объект, принимающий следующие свойства:

- `replace`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`
  - По умолчанию `navigateTo` пробрасывает заданный маршрут в экземпляр Vue Router на стороне клиента.

    Это поведение можно изменить, установив `replace` в `true`, чтобы указать, что данный маршрут должен быть заменен.

- `redirectCode`

  - **Тип**: `number`
  - **По умолчанию**: `302`

  - `navigateTo` перенаправляет на указанный путь и устанавливает код перенаправления на [`302 Found`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) по умолчанию, когда перенаправление происходит на стороне сервера.

  Это поведение по умолчанию можно изменить, указав другой `redirectCode`. Обычно для постоянных перенаправлений используется [`301 Moved Permanently`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301).

- `external`

  - **Тип**: `boolean`
  - **По умолчанию**: `false`

  - Позволяет переходить на внешний URL, если установлено значение `true`. В противном случае `navigateTo` выдаст ошибку, так как внешняя навигация по умолчанию запрещена.

- `open`

  - **Тип**: `OpenOptions`
  - Позволяет перейти к URL с помощью метода [open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) окна. Этот параметр применим только на стороне клиента и будет игнорироваться на стороне сервера.

  Объект, принимающий следующие свойства:

  - `target`

    - **Тип**: `string`
    - **По умолчанию**: `'_blank'`

    - Строка без пробелов: имя контекста просмотра, в который загружается ресурс.

  - `windowFeatures`

    - **Тип**: `OpenWindowFeatures`

    - Объект со следующими свойствами:

      | Свойство | Тип    | Описание |
      |----------|---------|--------------|
      | `popup`  | `boolean` | Запрашивает минимальное всплывающее окно вместо новой вкладки; набор элементов интерфейса решает браузер. |
      | `width` или `innerWidth`  | `number`  | Ширина области содержимого (не менее 100 пикселей), включая полосы прокрутки. |
      | `height` или `innerHeight` | `number`  | Высота области содержимого (не менее 100 пикселей), включая полосы прокрутки. |
      | `left` или `screenX`   | `number`  | Горизонтальная позиция нового окна относительно левого края экрана. |
      | `top` или `screenY`   | `number`  | Вертикальная позиция нового окна относительно верхнего края экрана. |
      | `noopener` | `boolean` | Запрещает новому окну доступ к исходному окну через `window.opener`. |
      | `noreferrer` | `boolean` | Не отправляет заголовок Referer и неявно включает `noopener`. |

      Подробнее о свойствах **windowFeatures** см. [документацию](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#windowfeatures).
