---
title: "callOnce"
description: "Выполнить заданную функцию или блок кода один раз при SSR или CSR."
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/once.ts
    size: xs
---

::important
Эта утилита доступна с [Nuxt v3.9](/blog/v3-9).
::

## Назначение

Функция `callOnce` выполняет переданную функцию или блок кода только один раз:
- при серверном рендеринге, но не при гидратации
- при клиентской навигации

Это удобно для кода, который должен выполниться один раз: логирование события, инициализация глобального состояния и т. п.

## Использование

Режим по умолчанию у `callOnce` — выполнить код один раз. Например, если код выполнился на сервере, он не повторится на клиенте. Повторного выполнения не будет и при нескольких вызовах `callOnce` на клиенте, например при возврате на страницу.

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

Можно выполнять код при каждой навигации, избегая при этом двойной загрузки при первом рендере сервер/клиент. Для этого используйте режим `navigation`:

```vue [app/app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('This will only be logged once and then on every client side navigation')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
}, { mode: 'navigation' })
</script>
```

::important
Режим `navigation` доступен с [Nuxt v3.15](/blog/v3-15).
::

::tip{to="/docs/4.x/getting-started/state-management#usage-with-pinia"}
`callOnce` удобно сочетать с [модулем Pinia](/modules/pinia) для вызова экшенов стора.
::

:read-more{to="/docs/4.x/getting-started/state-management"}

::warning
`callOnce` ничего не возвращает. Для загрузки данных при SSR используйте [`useAsyncData`](/docs/4.x/api/composables/use-async-data) или [`useFetch`](/docs/4.x/api/composables/use-fetch).
::

::note
`callOnce` — composable, который нужно вызывать прямо в `setup`, плагине или route middleware: ему нужно добавить данные в payload Nuxt, чтобы при гидратации на клиенте функция не вызывалась снова.
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

- `key`: Уникальный ключ, гарантирующий однократный запуск. Если ключ не задан, для экземпляра `callOnce` сгенерируется ключ по файлу и номеру строки.
- `fn`: Функция, выполняемая один раз. Может быть асинхронной.
- `options`: Режим выполнения — повтор при навигации (`navigation`) или один раз за жизнь приложения (`render`). По умолчанию `render`.
  - `render`: один раз при начальном рендере (SSR или CSR) — режим по умолчанию
  - `navigation`: один раз при начальном рендере и один раз при каждой последующей клиентской навигации
