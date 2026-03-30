---
title: 'prefetchComponents'
description: Утилиты Nuxt для ручного управления префетчем компонентов.
links:
  - label: Исходный код
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/preload.ts
    size: xs
---


Префетч компонента загружает код в фоне в расчёте на скорое использование при рендере, чтобы при необходимости компонент подключился быстрее. Код скачивается и кэшируется без явного запроса пользователя.

`prefetchComponents` вручную префетчит отдельные компоненты, зарегистрированные глобально в приложении Nuxt. По умолчанию Nuxt регистрирует их как асинхронные. Имя компонента указывайте в PascalCase.

```ts
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])
```

::note
Текущая реализация ведёт себя так же, как [`preloadComponents`](/docs/4.x/api/utils/preload-components) — выполняется предзагрузка, а не только префетч; поведение планируется улучшить.
::

::note
На сервере `prefetchComponents` не действует.
::
