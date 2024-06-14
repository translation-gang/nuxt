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

```vue [app.vue]
<script setup lang="ts">
const websiteConfig = useState('config')

await callOnce(async () => {
  console.log('Это будет выведено только один раз')
  websiteConfig.value = await $fetch('https://my-cms.com/api/website-config')
})
</script>
```

::tip{to="/docs/getting-started/state-management#usage-with-pinia"}
`callOnce` полезен в сочетании с [модулем Pinia](/modules/pinia) для вызова действий хранилища.
::

:read-more{to="/docs/getting-started/state-management"}

::warning
Обратите внимание, что `callOnce` ничего не возвращает. Если вы хотите выполнять получение данных во время SSR, вы должны использовать [`useAsyncData`](/docs/api/composables/use-async-data) или [`useFetch`](/docs/api/composables/use-fetch).
::

::note
`callOnce` это композабл, предназначенный для непосредственного вызова в функции setup, плагине или middleware роута, потому что она должна добавлять данные в полезную нагрузку Nuxt, чтобы избежать повторного вызова функции на стороне клиента при гидратации страницы.
::

## Тип

```ts
callOnce(fn?: () => any | Promise<any>): Promise<void>
callOnce(key: string, fn?: () => any | Promise<any>): Promise<void>
```

- `key`: Уникальный ключ, гарантирующий, что код выполняется один раз. Если вы не предоставите ключ, то будет сгенерирован ключ, уникальный для файла и номера строки экземпляра `callOnce`.
- `fn`: Функция, которую нужно выполнить один раз. Эта функция также может возвращать `Promise` и значение.
