---
title: 'prefetchComponents'
description: "Утилиты для управления предзагрузкой компонентов."
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


Prefetch подгружает код компонента в фоне в расчёте на то, что он понадобится для рендера — тогда он загрузится мгновенно. Компонент скачивается и кэшируется без явного запроса пользователя.

`prefetchComponents` вручную подгружает отдельные глобально зарегистрированные компоненты. Nuxt по умолчанию регистрирует их как асинхронные. Используйте имя компонента в PascalCase.

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
Текущая реализация ведёт себя так же, как [`preloadComponents`](/docs/4.x/api/utils/preload-components) (полная предзагрузка, а не только prefetch); поведение планируется уточнить.
::

::note
На сервере `prefetchComponents` не имеет эффекта.
::
