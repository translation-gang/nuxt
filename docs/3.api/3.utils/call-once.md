---
title: "callOnce"
description: "Запустите заданную функцию или блок кода один раз во время SSR или CSR."
navigation:
  badge: Новое
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
Эта утилита доступна с [Nuxt v3.9](/blog/v3-9).
::

## Назначение

Функция `callOnce` предназначена для выполнения заданной функции или блока кода только один раз во время:

- серверного рендеринга, но не гидратации,
- навигации на клиенте.

Это полезно для кода, который должен выполняться только один раз, например, для регистрации события или настройки глобального состояния.

## Использование

The default mode of `callOnce` is to run code only once. For example, if the code runs on the server it won't run again on the client. It also won't run again if you `callOnce` more than once on the client, for example by navigating back to this page.

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Это будет выведено только один раз')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

It is also possible to run on every navigation while still avoiding the initial server/client double load. For this, it is possible to use the `navigation` mode:

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once and then on every client side navigation')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
`navigation` mode is available since [Nuxt v3.15](/blog/v3-15).
::

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` полезен в сочетании с [модулем Pinia](/modules/pinia) для вызова действий хранилища.
::

:read-more{to="/docs/getting-started/state-management"}

::warning
Обратите внимание, что `callOnce` ничего не возвращает. Если вы хотите выполнять получение данных во время SSR, вы должны использовать [`useAsyncData`](/docs/api/composables/use-async-data) или [`useFetch`](/docs/api/composables/use-fetch).
::

::note
`callOnce` это композабл, предназначенный для непосредственного вызова в функции setup, плагине или middleware роута, поскольку ему необходимо добавить данные в полезную нагрузку Nuxt, чтобы избежать повторного вызова функции на клиенте при гидратации страницы.
::

## Тип

```ts
callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
callOnce(fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * Execution mode for the callOnce function
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## Parameters

- `key`: Уникальный ключ, гарантирующий, что код выполняется один раз. Если вы не предоставите ключ, то будет сгенерирован ключ, уникальный для файла и номера строки экземпляра `callOnce`.
- `fn`: Функция, которую нужно выполнить один раз. Эта функция также может возвращать `Promise` и значение.
- `options`: Setup the mode, either to re-execute on navigation (`navigation`) or just once for the lifetime of the app (`render`). Defaults to `render`.
  - `render`: Executes once during initial render (either SSR or CSR) - Default mode
  - `navigation`: Executes once during initial render and once per subsequent client-side navigation
