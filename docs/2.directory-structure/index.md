---
title: 'Структура каталогов Nuxt'
description: 'Узнайте о структуре каталогов приложения Nuxt и о том, как ею пользоваться.'
navigation: false
---

У приложений Nuxt есть определённая структура каталогов для организации кода. Она рассчитана на простоту понимания и единообразное использование.

## Корневой каталог

Корневой каталог приложения Nuxt — это каталог, в котором лежит файл `nuxt.config.ts`. Он задаёт конфигурацию приложения Nuxt.

## Каталог app

Каталог `app/` — основной каталог приложения Nuxt. В нём находятся следующие подкаталоги:
- [`assets/`](/docs/4.x/directory-structure/app/assets): ресурсы сайта, которые обработает сборщик (Vite или webpack)
- [`components/`](/docs/4.x/directory-structure/app/components): Vue-компоненты приложения
- [`composables/`](/docs/4.x/directory-structure/app/composables): ваши Vue composables
- [`layouts/`](/docs/4.x/directory-structure/app/layouts): Vue-компоненты-обёртки для страниц без лишнего перерендера при смене страницы
- [`middleware/`](/docs/4.x/directory-structure/app/middleware): код до перехода на конкретный маршрут
- [`pages/`](/docs/4.x/directory-structure/app/pages): файловая маршрутизация для маршрутов веб-приложения
- [`plugins/`](/docs/4.x/directory-structure/app/plugins): плагины Vue и другое при создании приложения Nuxt
- [`utils/`](/docs/4.x/directory-structure/app/utils): функции для компонентов, composables и страниц.

В этом каталоге также есть отдельные файлы:
- [`app.config.ts`](/docs/4.x/directory-structure/app/app-config): реактивная конфигурация внутри приложения
- [`app.vue`](/docs/4.x/directory-structure/app/app): корневой компонент приложения Nuxt
- [`error.vue`](/docs/4.x/directory-structure/app/error): страница ошибки приложения Nuxt

## Каталог public

Каталог [`public/`](/docs/4.x/directory-structure/public) содержит публичные файлы приложения Nuxt. Они отдаются с корня и не изменяются процессом сборки.

Подходит для файлов, которым важны имена (например, `robots.txt`) _или_ которые редко меняются (например, `favicon.ico`).

## Каталог server

Каталог [`server/`](/docs/4.x/directory-structure/server) содержит серверный код приложения Nuxt. В нём такие подкаталоги:
- [`api/`](/docs/4.x/directory-structure/server#server-routes): маршруты API приложения.
- [`routes/`](/docs/4.x/directory-structure/server#server-routes): серверные маршруты (например, динамический `/sitemap.xml`).
- [`middleware/`](/docs/4.x/directory-structure/server#server-middleware): код до обработки серверного маршрута
- [`plugins/`](/docs/4.x/directory-structure/server#server-plugins): плагины и другое при создании сервера Nuxt
- [`utils/`](/docs/4.x/directory-structure/server#server-utilities): функции для серверного кода.

## Каталог shared

Каталог [`shared/`](/docs/4.x/directory-structure/shared) содержит общий код приложения Nuxt и сервера. Его можно использовать и во Vue-приложении, и на сервере Nitro.

## Каталог content

Каталог [`content/`](/docs/4.x/directory-structure/content) подключается модулем [Nuxt Content](https://content.nuxt.com). С его помощью на основе Markdown-файлов строится файловая CMS для приложения.

## Каталог modules

Каталог [`modules/`](/docs/4.x/directory-structure/modules) содержит локальные модули приложения Nuxt. Модули расширяют возможности Nuxt.

## Каталог layers

Каталог [`layers/`](/docs/4.x/directory-structure/layers) помогает организовать и переиспользовать код, компоненты, composables и конфигурации. Слои в этом каталоге автоматически регистрируются в проекте.

## Файлы Nuxt

- [`nuxt.config.ts`](/docs/4.x/directory-structure/nuxt-config) — основной файл конфигурации приложения Nuxt.
- [`.nuxtrc`](/docs/4.x/directory-structure/nuxtrc) — альтернативный плоский синтаксис конфигурации (удобно для глобальных настроек).
- [`.nuxtignore`](/docs/4.x/directory-structure/nuxtignore) — игнорирование файлов в корне на этапе сборки.
