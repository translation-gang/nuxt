---
title: "callOnce"
description: "Однократный запуск функции или блока кода при SSR или CSR."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
Утилита доступна начиная с [Nuxt v3.9](/blog/v3-9).
::

## Назначение

`callOnce` выполняет переданную функцию или блок кода только один раз:
- при серверном рендеринге (но не при гидрации);
- при клиентской навигации.

Подходит для кода, который должен выполниться один раз: логирование, инициализация глобального состояния и т.п.

## Использование

По умолчанию код выполняется один раз: если он выполнился на сервере, на клиенте не повторится. Повторный вызов `callOnce` на клиенте (например, при возврате на страницу) тоже не запустит код снова.

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Выведется только один раз')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

Чтобы выполнять код при каждой навигации, но без двойного запуска при первом SSR/гидрации, используйте режим `navigation`:

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Один раз при загрузке и при каждой клиентской навигации')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
Режим `navigation` доступен с [Nuxt v3.15](/blog/v3-15).
::

::tip{to="/docs/4.x/getting-started/state-management#usage-with-pinia"}
`callOnce` удобен вместе с [модулем Pinia](/modules/pinia) для вызова экшенов стора.
::

:read-more{to="/docs/4.x/getting-started/state-management"}

::warning
`callOnce` ничего не возвращает. Для загрузки данных при SSR используйте [`useAsyncData`](/docs/4.x/api/composables/use-async-data) или [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

::note
`callOnce` нужно вызывать в setup, плагине или маршрутном middleware: он добавляет данные в payload Nuxt, чтобы не вызывать функцию повторно на клиенте при гидрации.
::

## Тип

```ts [Signature]
export function callOnce (key?: string, fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>
export function callOnce (fn?: (() => any | Promise<any>), options?: CallOnceOptions): Promise<void>

type CallOnceOptions = {
  /**
   * Execution mode for the callOnce function
   * @default 'render'
   */
  mode?: 'navigation' | 'render'
}
```

## Параметры

- `key`: уникальный ключ, чтобы код выполнился один раз. Если не задан, генерируется по файлу и строке вызова.
- `fn`: функция для однократного выполнения (может быть асинхронной).
- `options`: режим выполнения. По умолчанию `render`.
  - `render`: один раз при первом рендере (SSR или CSR).
  - `navigation`: один раз при первом рендере и при каждой последующей клиентской навигации.
