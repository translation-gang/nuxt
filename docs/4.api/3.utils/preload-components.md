---
title: 'preloadComponents'
description: Nuxt предоставляет утилиты, которые позволяют вам управлять предварительной загрузкой компонентов.
links:
  - label: Исходники
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---

Предварительная загрузка компонентов загружает компоненты, которые вашей странице понадобятся очень скоро, и вы хотите начать загрузку раньше в цикле рендеринга. Это гарантирует, что они будут доступны раньше и менее вероятно, что они заблокируют рендеринг страницы, улучшая производительность.

Используйте `preloadComponents`, чтобы вручную предварительно загрузить отдельные компоненты, которые были зарегистрированы глобально в вашем приложении Nuxt. По умолчанию Nuxt регистрирует их как асинхронные компоненты. Вы должны использовать версию имени компонента в PascalCase.

```js
await preloadComponents('MyGlobalComponent')

await preloadComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
На сервере `preloadComponents` не будет иметь никакого эффекта.
::
