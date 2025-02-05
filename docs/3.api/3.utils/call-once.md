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

Режим по умолчанию для `callOnce` - это выполнение кода только один раз. Например, если код выполняется на сервере, он не будет выполняться снова на клиенте. Он также не будет выполняться снова, если вы вызовете `callOnce` более одного раза на клиенте, например, при переходе обратно на эту страницу.

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Это будет выведено только один раз')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

Также возможно выполнение при каждой навигации, при этом избегая двойной загрузки на сервере/клиенте. Для этого можно использовать режим `navigation`:

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Это будет выведено один раз, а затем при каждой навигации на клиенте')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
Режим `navigation` доступен с [Nuxt v3.15](/blog/v3-15).
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
   * Режим выполнения для функции callOnce
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## Параметры

- `key`: Уникальный ключ, гарантирующий, что код выполняется один раз. Если вы не предоставите ключ, то будет сгенерирован ключ, уникальный для файла и номера строки экземпляра `callOnce`.
- `fn`: Функция, которую нужно выполнить один раз. Эта функция также может возвращать `Promise` и значение.
- `options`: Настройка режима, либо для повторного выполнения при навигации (`navigation`), либо только один раз за время жизни приложения (`render`). По умолчанию используется `render`.
  - `render`: Выполняется один раз во время первоначального рендеринга (SSR или CSR) - режим по умолчанию
  - `navigation`: Выполняется один раз во время первоначального рендеринга и один раз при каждой последующей навигации на клиенте.
