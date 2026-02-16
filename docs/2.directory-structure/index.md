---
title: 'Структура директорий Nuxt'
description: 'Узнайте о структуре директорий приложения Nuxt и о том, как её использовать.'
navigation: false
---

У приложений Nuxt есть определённая структура директорий, которая используется для организации кода. Эта структура сделана понятной и единообразной.

## Корневая директория

Корневая директория приложения Nuxt — это директория, в которой находится файл `nuxt.config.ts`. Этот файл служит для настройки приложения Nuxt.

## Директория app

Директория `app/` — основная директория приложения Nuxt. В ней находятся поддиректории:
- [`assets/`](/docs/4.x/directory-structure/app/assets): ресурсы сайта, которые обрабатывает сборщик (Vite или webpack)
- [`components/`](/docs/4.x/directory-structure/app/components): Vue-компоненты приложения
- [`composables/`](/docs/4.x/directory-structure/app/composables): ваши Vue-композаблы
- [`layouts/`](/docs/4.x/directory-structure/app/layouts): Vue-компоненты-обёртки для страниц, избегают повторного рендеринга между страницами
- [`middleware/`](/docs/4.x/directory-structure/app/middleware): выполнение кода перед переходом на маршрут
- [`pages/`](/docs/4.x/directory-structure/app/pages): файловая маршрутизация для создания маршрутов в приложении
- [`plugins/`](/docs/4.x/directory-structure/app/plugins): Vue-плагины и другое при создании приложения Nuxt
- [`utils/`](/docs/4.x/directory-structure/app/utils): функции, доступные в компонентах, композаблах и страницах

В этой директории также есть отдельные файлы:
- [`app.config.ts`](/docs/4.x/directory-structure/app/app-config): реактивная конфигурация приложения
- [`app.vue`](/docs/4.x/directory-structure/app/app): корневой компонент приложения Nuxt
- [`error.vue`](/docs/4.x/directory-structure/app/error): страница ошибки приложения Nuxt

## Директория public

Директория [`public/`](/docs/4.x/directory-structure/public) содержит публичные файлы приложения Nuxt. Файлы из неё отдаются по корневому пути и не обрабатываются сборкой.

Подходит для файлов, которым нужно сохранить имя (например, `robots.txt`) _или_ которые редко меняются (например, `favicon.ico`).

## Директория server

Директория [`server/`](/docs/4.x/directory-structure/server) содержит серверный код приложения Nuxt. В ней находятся поддиректории:
- [`api/`](/docs/4.x/directory-structure/server#server-routes): API-маршруты приложения
- [`routes/`](/docs/4.x/directory-structure/server#server-routes): серверные маршруты (например, динамический `/sitemap.xml`)
- [`middleware/`](/docs/4.x/directory-structure/server#server-middleware): код, выполняемый до обработки серверного маршрута
- [`plugins/`](/docs/4.x/directory-structure/server#server-plugins): плагины и другое при создании сервера Nuxt
- [`utils/`](/docs/4.x/directory-structure/server#server-utilities): функции для использования в серверном коде

## Директория shared

Директория [`shared/`](/docs/4.x/directory-structure/shared) содержит общий код для приложения Nuxt и сервера Nitro. Этот код можно использовать и во Vue-приложении, и на сервере Nitro.

## Директория content

Директория [`content/`](/docs/4.x/directory-structure/content) подключается модулем [Nuxt Content](https://content.nuxt.com). Используется для файлового CMS на основе Markdown.

## Директория modules

Директория [`modules/`](/docs/4.x/directory-structure/modules) содержит локальные модули приложения Nuxt. Модули расширяют функциональность приложения.

## Директория layers

Директория [`layers/`](/docs/4.x/directory-structure/layers) позволяет организовывать и переиспользовать код, компоненты, композаблы и конфигурации. Слои из этой директории автоматически подключаются в проекте.

## Файлы Nuxt

- Файл [`nuxt.config.ts`](/docs/4.x/directory-structure/nuxt-config) — основная конфигурация приложения Nuxt
- Файл [`.nuxtrc`](/docs/4.x/directory-structure/nuxtrc) — альтернативный синтаксис конфигурации (удобен для глобальных настроек)
- Файл [`.nuxtignore`](/docs/4.x/directory-structure/nuxtignore) — исключение файлов из корня на этапе сборки
