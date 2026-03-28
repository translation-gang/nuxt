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

Поведение по умолчанию: код выполняется один раз. Если он уже выполнился на сервере, на клиенте не повторится. Повторный вызов `callOnce` на клиенте (например, при возврате на страницу) тоже не запустит код снова.

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Это будет выведено только один раз')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

Можно выполнять код при каждой навигации, избегая двойного запуска при первой загрузке сервер+клиент — для этого режим `navigation`:

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Один раз при первой загрузке и при каждой клиентской навигации')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
Режим `navigation` доступен с [Nuxt v3.15](/blog/v3-15).
::

::tip{to="/docs/3.x/getting-started/state-management#usage-with-pinia"}
`callOnce` полезен в сочетании с [модулем Pinia](/modules/pinia) для вызова действий хранилища.
::

:read-more{to="/docs/3.x/getting-started/state-management"}

::warning
Обратите внимание, что `callOnce` ничего не возвращает. Если вы хотите выполнять получение данных во время SSR, вы должны использовать [`useAsyncData`](/docs/3.x/api/composables/use-async-data) или [`useFetch`](/docs/3.x/api/composables/use-fetch).
::

::note
`callOnce` — композабл, предназначенный для непосредственного вызова в функции setup, плагине или middleware маршрута, поскольку ему необходимо добавить данные в полезную нагрузку Nuxt, чтобы избежать повторного вызова функции на клиенте при гидратации страницы.
::

## Тип

```ts
callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
callOnce(fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * Режим выполнения для callOnce
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## Параметры

- `key`: уникальный ключ, гарантирующий однократный запуск. Если не указать, сгенерируется ключ по файлу и номеру строки вызова `callOnce`.
- `fn`: функция, которую нужно выполнить один раз; может быть асинхронной.
- `options`: режим — повтор при навигации (`navigation`) или один раз за жизнь приложения (`render`). По умолчанию `render`.
  - `render`: один раз при первом рендере (SSR или CSR) — режим по умолчанию
  - `navigation`: один раз при первом рендере и по разу при каждой последующей клиентской навигации
