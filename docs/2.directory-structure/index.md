---
title: 'Структура каталогов Nuxt'
description: 'Как устроены папки Nuxt-приложения и как ими пользоваться.'
navigation: false
---

У Nuxt есть соглашённая структура каталогов: так проще ориентироваться и держать проект единообразным.

## Корень проекта

Корень — это каталог с файлом `nuxt.config.ts`. В нём задаётся конфигурация приложения.

## Каталог приложения

Связано с универсальным (клиент+сервер) приложением:

- [`assets/`](/docs/3.x/directory-structure/assets): ресурсы, которые обрабатывает сборщик (Vite или webpack)
- [`components/`](/docs/3.x/directory-structure/components): Vue-компоненты
- [`composables/`](/docs/3.x/directory-structure/composables): композаблы Vue
- [`layouts/`](/docs/3.x/directory-structure/layouts): обёртки страниц без лишнего перемонтирования при навигации
- [`middleware/`](/docs/3.x/directory-structure/middleware): код до перехода на маршрут
- [`pages/`](/docs/3.x/directory-structure/pages): файловая маршрутизация
- [`plugins/`](/docs/3.x/directory-structure/plugins): плагины Vue и другое при старте приложения
- [`utils/`](/docs/3.x/directory-structure/utils): утилиты для компонентов, композаблов и страниц

Отдельные файлы:

- [`app.config.ts`](/docs/3.x/directory-structure/app-config): реактивная конфигурация приложения
- [`app.vue`](/docs/3.x/directory-structure/app): корневой компонент
- [`error.vue`](/docs/3.x/directory-structure/error): страница ошибок

## `public/`

[`public/`](/docs/3.x/directory-structure/public) — статика без обработки сборщиком: отдаётся с корня сайта. Подходит для `robots.txt`, `favicon.ico` и других файлов с фиксированными именами.

## `server/`

[`server/`](/docs/3.x/directory-structure/server) — серверный код:

- [`api/`](/docs/3.x/directory-structure/server#server-routes): API-маршруты
- [`routes/`](/docs/3.x/directory-structure/server#server-routes): серверные маршруты (например динамический `/sitemap.xml`)
- [`middleware/`](/docs/3.x/directory-structure/server#server-middleware): до обработки серверного маршрута
- [`plugins/`](/docs/3.x/directory-structure/server#server-plugins): при старте Nitro-сервера
- [`utils/`](/docs/3.x/directory-structure/server#server-utilities): утилиты для серверного кода

## `shared/`

[`shared/`](/docs/3.x/directory-structure/shared) — код, общий для Vue-приложения и сервера Nitro.

## `content/`

[`content/`](/docs/3.x/directory-structure/content) используется вместе с модулем [Nuxt Content](https://content.nuxt.com) — файловым CMS на Markdown.

## `modules/`

[`modules/`](/docs/3.x/directory-structure/modules) — локальные модули, расширяющие Nuxt.

## `layers/`

[`layers/`](/docs/3.x/directory-structure/layers) — переиспользуемые слои: код, компоненты, композаблы и конфигурация; слои из этой папки подключаются автоматически.

## Файлы Nuxt

- [`nuxt.config.ts`](/docs/3.x/directory-structure/nuxt-config) — основная конфигурация
- [`package.json`](/docs/3.x/directory-structure/package) — зависимости и скрипты
- [`tsconfig.json`](/docs/3.x/directory-structure/tsconfig) — настройки TypeScript (часто расширяет сгенерированный `.nuxt/tsconfig.json`)
- [`.nuxtrc`](/docs/3.x/directory-structure/nuxtrc) — альтернативный формат (удобно для глобальных настроек)
- [`.nuxtignore`](/docs/3.x/directory-structure/nuxtignore) — исключения в корне на этапе сборки
